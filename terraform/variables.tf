variable "region" {
  description = "The GCP region for Cloud Run"
  type = string
  default = "europe-west4"
}

variable "api_image_tag" {
  description = "The tag of the api Docker image to deploy (e.g., 'latest' or '1.0.0')"
  type = string
  default = "latest"
}

variable "db_name" {
  type    = string
  default = "fyi"
}

variable "db_user" {
  type    = string
  default = "fyi_user"
}

variable "db_password" {
  type      = string
}

variable "db_instance_tier" {
  type    = string
  default = "db-f1-micro"
}

variable "cloudflare_email" {
  description = "Email for Cloudflare"
  type = string
  default = "halil@readfyi.com"
}

variable "cloudflare_account_id" {
	description = "Account id for Cloudflare"
	type = string
	default = "c465fd6d26c813ffaf46232a9d5a1be0"
}

variable "cloudflare_api_token" {
  description = "API token for Cloudflare"
  type = string
}

# variable "autotelex_client_id" {
# 	description = "Autotelex client ID"
# 	type = string
# 	default = "RegalMotors"
# }

# variable "autotelex_client_secret" {
# 	description = "Autotelex client secret"
# 	type = string
# }

# variable "autotelex_api_key" {
# 	description = "Autotelex API key"
# 	type = string
# }

variable "zepto_api_key" {
	description = "Zepto API key"
	type = string
}

# variable "meta_pixel_id" {
# 	description = "Meta pixel ID"
# 	type = string
# }

variable "meta_capi_access_token" {
	description = "Meta CAPI access token"
	type = string
}

locals {
	env = terraform.workspace

	hosts = {
		# qa = "qa.verkoop24.nu"
		production = "readfyi.com"
	}

	env_vars_map = {
		# qa = {
		# 	common = {
		# 		ENV = "qa"
		# 		# META_PIXEL_ID = "772377015663230"
		# 	}
		# 	api = {
		# 		# GDRIVE_FUNNELS_DIRECTORY_ID = "1i5_CGOd6_GyS6K9JmAj2rou4u92wh3uw"
		# 	}
		# }
		production = {
			common = {
				ENV = "production"
				META_PIXEL_ID = "1199552608319196"
				WWW_HOST = "https://readfyi.com"
				API_HOST = "https://api.readfyi.com"
			}
			api = {
				# GDRIVE_FUNNELS_DIRECTORY_ID = "1LD3HZTnIjl8AsyLwcnDuqQVIqnFs6AQo"
			}
		}
	}

	env_vars = lookup(local.env_vars_map, local.env, {})

	zone_id = "0c6248f15fa2de652ad1fc23d04cff65"

	is_prod = local.env == "production"
	is_prod_like = local.env == "production" || local.env == "qa"

	host = lookup(local.hosts, local.env, "")
	host_key = replace(local.host, ".", "-")

	www_host = "www.${local.host}"
	www_host_key = "www-${local.host_key}"

	# app_host = "app.${local.host}"
	# app_host_key = "app-${local.host_key}"

	api_host = "api.${local.host}"
	api_host_key = "api-${local.host_key}"

	# funnels_cloudflare_zone_id = local.env == "production" ? "bba06e7303e410e3f8b0eed81747ceea" : "239347b59a6e0db4f9c14290397c433c"
	# funnels_host = local.env == "production" ? "meetgen-funnels.com" : "qa-meetgen-funnels.com"
	# funnels_host_key = replace(local.funnels_host, ".", "-")

}
