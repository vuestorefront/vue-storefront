#!/bin/sh

cd /var/www
#copy local.config to Container
rm -f /var/config_repo/production.json
cp -a -r -f /var/config_repo/. config

cp -a -f config_bin/local_docker.json config/local.json

yarn install

pm2-runtime start 'yarn dev'
