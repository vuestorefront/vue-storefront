#!/bin/sh
set -e

NODE_ENV production

#copy repo_configs to PersistentDisk
rm -f ./config_repo/production.json
cp -a -r -f config_repo/. config

yarn install || exit $?

yarn build:client && yarn build:server && yarn build:sw || exit $?

if [ "$VS_ENV" = 'development' ]; then
  yarn dev
else
  yarn start
fi
