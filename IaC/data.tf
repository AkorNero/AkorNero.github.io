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
}

data "aws_account" "current" {}