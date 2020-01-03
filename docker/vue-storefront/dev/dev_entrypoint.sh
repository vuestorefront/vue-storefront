#!/bin/sh
cd /var/www

#copy local.config to Container
rm -f ./config_repo/production.json
cp -a -r -f config_repo/. config
cp -a -f config_bin/local_docker.json config/local.json

yarn install

npm install pm2 -g
pm2 start 'yarn dev'
