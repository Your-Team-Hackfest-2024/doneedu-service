#!/usr/bin/env bash

API_KEY_NAME="$1"

[[ -z "$API_KEY_NAME" ]] && echo "error: require api key name" && exit 1

SECRET=$(openssl rand -base64 32)

echo -n "$SECRET" | gcloud secrets create $API_KEY_NAME \
--replication-policy="automatic" \
--data-file=-