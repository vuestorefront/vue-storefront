#!/bin/sh
set -e

yarn install || exit $?

yarn build:client && yarn build:server && yarn build:sw || exit $?

if [ "$VS_ENV" = 'dev' ]; then
  yarn dev
else
  yarn start
fi
