# MANUAL: the hosted zone for var.domain_name must already exist in Route53
# (it exists automatically if you registered the domain through Route53).
# If you want Terraform to create it instead, replace this with an aws_route53_zone resource.
data "aws_route53_zone" "site" {
  name         = var.hosted_zone_name
  private_zone = false
}

# Managed policy: CachingOptimized
# PREFERENCE: use "CachingDisabled" while developing if you don't want to wait on cache invalidation.
data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

# Allows only this CloudFront distribution to read objects from the bucket.
# ListBucket lets S3 answer a missing file with 404 (otherwise it says 403); it lists
# nothing to visitors, because CloudFront only ever asks for single objects.
data "aws_iam_policy_document" "site_bucket" {
  statement {
    sid       = "AllowCloudFrontRead"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }

  statement {
    sid       = "AllowCloudFrontList"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.site.arn]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

# The account ID makes the site bucket name globally unique.
data "aws_caller_identity" "current" {}

# Managed policy: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy and X-XSS-Protection.
# It sets no Content-Security-Policy, so the page's inline scripts keep working.
data "aws_cloudfront_response_headers_policy" "security_headers" {
  name = "Managed-SecurityHeadersPolicy"
}