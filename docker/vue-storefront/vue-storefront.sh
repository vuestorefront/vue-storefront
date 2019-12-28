#!/bin/sh
set -e

#copy repo_configs to PersistentDisk
rm -f ./config_repo/production.json
cp -a -r -f config_repo/. config

yarn install || exit $?

#// Added by Dan to fix issue where not finding cross-env
alias cross-env='./node_modules/.bin/cross-env'
alias webpack='./node_modules/webpack/bin/webpack.js'

yarn build:client && yarn build:server && yarn build:sw || exit $?


if [ "$VS_ENV" = 'dev' ]; then
  yarn dev
else
  yarn start
fi
