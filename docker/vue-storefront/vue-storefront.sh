#!/bin/sh
set -e

yarn install || exit $?

cd core && yarn link && cd ../ && yarn link @vue-storefront/core

cd packages/cli && yarn link @vue-storefront/core

yarn build:client && yarn build:server && yarn build:sw || exit $?

if [ "$VS_ENV" = 'dev' ]; then
  yarn dev
else
  yarn start
fi
