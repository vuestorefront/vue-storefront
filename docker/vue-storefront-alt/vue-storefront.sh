#!/bin/sh
set -e

if [ "$VS_ENV" = 'dev' ]; then
  yarn install
  yarn build
  yarn dev
else
  yarn cross-env NODE_ENV=production TS_NODE_PROJECT=\"tsconfig-build.json\" ts-node ./core/scripts/server.ts --no-daemon
fi
