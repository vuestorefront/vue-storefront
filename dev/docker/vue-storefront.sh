#!/bin/sh
set -e

if [ "$VS_ENV" = 'dev' ]; then
  yarn start:ct
else
  yarn start:ct
fi
