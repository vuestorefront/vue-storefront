#!/bin/sh
set -e

yarn install || exit $?

yarn generate-files && yarn build:client && yarn build:server && yarn build:sw || exit $?

if [ "$VS_ENV" = 'dev' ]; then
  yarn dev
else
  yarn start
fi
