#!/usr/bin/env bash

set -euo pipefail

APP_ROOT="${APP_ROOT:-/opt/webeng}"
COMPOSE_FILE="${COMPOSE_FILE:-server/docker-compose.webeng.yml}"

cd "$APP_ROOT"

docker compose -f "$COMPOSE_FILE" pull
docker compose -f "$COMPOSE_FILE" up -d
docker image prune -f
