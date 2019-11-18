#!/bin/sh
set -e

NODE_ENV production

#copy repo_configs to PersistentDisk
rm config_repo/production.js
cp -a -r -f config_repo/. config

yarn install || exit $?

yarn build:client && yarn build:server && yarn build:sw || exit $?

if [ "$VS_ENV" = 'development' ]; then
  yarn dev
else
  yarn start
fi
