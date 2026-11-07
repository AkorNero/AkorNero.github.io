variable "aws_region" {
  description = "AWS region for the S3 bucket"
  type        = string
  default     = "eu-west-1" # PREFERENCE: any region; CloudFront and ACM are handled separately.
}

variable "domain_name" {
  description = "Full hostname the site is served on, e.g. portfolio.example.com"
  type        = string
  default     = "portfolio.aravind.click"
}

variable "hosted_zone_name" {
  description = "Route53 hosted zone that contains domain_name (the parent domain)"
  type        = string
  default     = "aravind.click"
}

variable "site_bucket_name" {
  description = "Globally unique name for the S3 bucket holding the site"
  type        = string
  default     = "portfolio-site" # MANUAL: must be globally unique across all of AWS.
}
