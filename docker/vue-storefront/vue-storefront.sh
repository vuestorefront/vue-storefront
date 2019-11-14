#!/bin/sh
set -e

#copy repo_configs to PersistentDisk
cp -a /config/. /config2/

yarn install || exit $?

yarn build:client && yarn build:server && yarn build:sw || exit $?

if [ "$VS_ENV" = 'dev' ]; then
  yarn dev
else
  yarn start
fi
