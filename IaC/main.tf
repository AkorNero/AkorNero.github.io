terraform {
  required_version = ">= 1.10.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # MANUAL: bucket must already exist, and its name/region must match your state bucket.
  # Backend blocks cannot use variables.
  backend "s3" {
    bucket       = ""
    key          = "portfolio/terraform.tfstate"
    region       = "eu-west-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.aws_region
}

# CloudFront only accepts ACM certificates from us-east-1, whatever your main region is.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

locals {
  # PREFERENCE: add "www.${var.domain_name}" here to serve www too.
  # The certificate, CloudFront aliases and DNS records all follow this list.
  # With a subdomain like portfolio.aravind.click, www.portfolio.aravind.click is rarely wanted,
  # so only the single hostname is served by default.
  site_domains = [var.domain_name]
}

# ---------------------------------------------------------------------------
# S3: private bucket holding the site files
# ---------------------------------------------------------------------------

resource "aws_s3_bucket" "site" {
  bucket = "${var.site_bucket_name}-${data.aws_account.current.account_id}-${var.aws_region}"

  # PREFERENCE: set to true if you want `terraform destroy` to delete a non-empty bucket.
  force_destroy = false
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site_bucket.json

  depends_on = [aws_s3_bucket_public_access_block.site]
}

# ---------------------------------------------------------------------------
# ACM: certificate (us-east-1) validated through Route53
# ---------------------------------------------------------------------------

resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = local.site_domains[0]
  subject_alternative_names = slice(local.site_domains, 1, length(local.site_domains))
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id         = data.aws_route53_zone.site.zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

# ---------------------------------------------------------------------------
# CloudFront: CDN in front of the bucket
# ---------------------------------------------------------------------------

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.site_bucket_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"
  aliases             = local.site_domains

  # PREFERENCE: PriceClass_100 (US/EU, cheapest), PriceClass_200, or PriceClass_All (global).
  price_class = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-site"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-site"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    # Managed policy: CachingOptimized
    cache_policy_id = data.aws_cloudfront_cache_policy.caching_optimized.id
  }

  # PREFERENCE: this suits a single-page app (routes fall back to index.html).
  # For a plain multi-page static site, point 404 at a real /404.html and keep response_code = 404.
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/403.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/404.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

# ---------------------------------------------------------------------------
# Route53: alias records pointing the domain(s) at CloudFront
# ---------------------------------------------------------------------------

resource "aws_route53_record" "site_a" {
  for_each = toset(local.site_domains)

  zone_id = data.aws_route53_zone.site.zone_id
  name    = each.value
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

# Remove this resource if you set is_ipv6_enabled = false above.
# resource "aws_route53_record" "site_aaaa" {
#   for_each = toset(local.site_domains)

#   zone_id = data.aws_route53_zone.site.zone_id
#   name    = each.value
#   type    = "AAAA"

#   alias {
#     name                   = aws_cloudfront_distribution.site.domain_name
#     zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
#     evaluate_target_health = false
#   }
# }
