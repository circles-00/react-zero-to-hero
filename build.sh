#!/usr/bin/env bash

npm i -g yarn
yarn && cd client && yarn && cd ..

# Load env vars
. load_env_vars.sh

yarn dev
