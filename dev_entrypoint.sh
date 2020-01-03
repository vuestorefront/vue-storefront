#!/bin/sh
cd /var/www
npm install pm2 -g
pm2 start 'yarn dev'