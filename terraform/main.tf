terraform {
  cloud {
    organization = "readfyi"

    workspaces {
      tags = ["workspace"]
    }
  }
}