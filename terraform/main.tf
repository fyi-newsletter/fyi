terraform {
  cloud {
    organization = "fyi"

    workspaces {
      tags = ["workspace"]
    }
  }
}