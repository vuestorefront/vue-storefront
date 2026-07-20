#!/bin/sh
set -e

envsubst < config/local.json.template > config/local.json
envsubst < ecosystem.json.template > ecosystem.json

yarn install --immutable

if [ "$VS_ENV" = 'dev' ]; then
  exec yarn dev
else
  yarn build
  exec ./node_modules/.bin/pm2-runtime start ecosystem.json
fi
