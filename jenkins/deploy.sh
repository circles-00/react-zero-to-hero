#!/usr/bin/env bash

echo "Saving Docker Container Logs..."
docker compose logs -t >& "$WORKSPACE/logs-$(docker inspect --format=‘{{.Config.Image}}’ $(docker compose ps -q react-zero-to-hero)).txt"

echo "Stoping Docker Container..."
docker compose down

echo "Running Docker Container..."
docker compose up -d
