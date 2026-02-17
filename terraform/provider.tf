terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.27"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "google" {
#   credentials = file("readfyi-com.service-account.json")
  project = local.host_key
  region  = var.region
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}