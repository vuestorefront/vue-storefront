#!/bin/sh
set -e

envsubst < /tmp/config/local.json.${STORE}.example > config/local.json
envsubst < tsconfig.json.example > tsconfig.json

yarn install || exit $?

if [ "$VS_ENV" = 'dev' ]; then
  yarn dev
else
  yarn build || exit $?
  yarn start
fi
