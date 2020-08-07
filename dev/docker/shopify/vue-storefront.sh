#!/bin/sh
set -e

if [ "$VS_ENV" = 'dev' ]; then
  yarn start:sp
else
  yarn start:sp
fi
