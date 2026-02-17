resource "google_cloud_run_v2_service" "api" {
	count      = local.is_prod_like ? 1 : 0
	name		= "api"
	location	= var.region

	template {
		volumes {
			name = "cloudsql"
			cloud_sql_instance {
				instances = [google_sql_database_instance.db.connection_name]
			}
		}
		
		containers {
			image 	= "gcr.io/${local.host_key}/api:${var.api_image_tag}"
			ports {
				container_port	= 3000
			}
			resources {
				cpu_idle = true
				limits	= {
					cpu		= "1"
					memory	= "512Mi"
				}
			}

			env {
				name  = "NODE_ENV"
				value = local.env_vars.common.ENV
			}

			env {
				name  = "WWW_HOST"
				value = local.env_vars.common.WWW_HOST
			}

			env {
				name  = "POSTGRES_HOST"
				value = "/cloudsql/${google_sql_database_instance.db.connection_name}"
			}

			env {
				name  = "POSTGRES_PORT"
				value = "5432"
			}

			env {
				name  = "POSTGRES_DB"
				value = var.db_name
			}

			env {
				name  = "POSTGRES_USER"
				value = var.db_user
			}

			env {
				name = "POSTGRES_PASSWORD"
				value = var.db_password
			}

			env {
				name = "ZEPTO_API_KEY"
				value = var.zepto_api_key
			}

			env {
				name = "META_PIXEL_ID"
				value = local.env_vars.common.META_PIXEL_ID
			}

			env {
				name = "META_CAPI_ACCESS_TOKEN"
				value = var.meta_capi_access_token
			}

			volume_mounts {
				name       = "cloudsql"
				mount_path = "/cloudsql"
			}

		}

		max_instance_request_concurrency = 100

		scaling {
			min_instance_count = local.is_prod ? 1 : 0
			max_instance_count = 1
		}
	}

	traffic {
		percent	= 100
		type 	= "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
	}
}

resource "google_cloud_run_v2_service_iam_member" "public_access" {
	count    = local.is_prod_like ? 1 : 0
	name     = google_cloud_run_v2_service.api[count.index].name
	location = google_cloud_run_v2_service.api[count.index].location
	project  = local.host_key
	role     = "roles/run.invoker"
	member   = "allUsers"
}

resource "google_cloud_run_domain_mapping" "api_domain_mapping" {
	count      = local.is_prod_like ? 1 : 0
	name = local.api_host
	location = var.region

	metadata {
		namespace = local.host_key
	}

	spec {
		route_name = google_cloud_run_v2_service.api[count.index].name
	}
}