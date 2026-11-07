output "bucket_name" {
  description = "S3 bucket to upload the site files to"
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "Needed for cache invalidations after deploys"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "Default CloudFront URL"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "site_url" {
  description = "Public URL of the site"
  value       = "https://${var.domain_name}"
}
