#!/usr/bin/env bash

# Load env vars
. load_env_vars.sh

if [ "$RUN_MIGRATIONS" ]; then
  echo "RUNNING MIGRATIONS";
  npm run typeorm:migration:run
fi

yarn dev
