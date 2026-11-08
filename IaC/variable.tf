variable "aws_region" {
  description = "AWS region for the S3 bucket"
  type        = string
  default     = "eu-west-1" # PREFERENCE: any region; CloudFront and ACM are handled separately.
}

variable "access_key" {
  description = "AWS access key"
  type        = string
  sensitive   = true
}

variable "secret_key" {
  description = "AWS secret key"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Full hostname the site is served on, e.g. portfolio.example.com"
  type        = string
}

variable "hosted_zone_name" {
  description = "Route53 hosted zone that contains domain_name (the parent domain)"
  type        = string
}

variable "site_bucket_name" {
  description = "Globally unique name for the S3 bucket holding the site"
  type        = string
  default     = "portfolio-site" # MANUAL: must be globally unique across all of AWS.
}

variable "github_repository" {
  description = "GitHub repository allowed to deploy, as GitHub writes it in the OIDC subject: owner@owner_id/name@repo_id"
  type        = string
}
