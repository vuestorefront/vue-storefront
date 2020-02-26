FROM node:10-alpine

RUN apk update && apk upgrade && apk add --no-cache --virtual .build-deps ca-certificates wget python make g++ \
  && apk add --no-cache git \
  && yarn install --no-cache \
  && apk del .build-deps
## Clean Up
RUN rm -rf /var/cache/apk/* && rm -rf /tmp/*

ENV TERM="xterm" \
  VS_ENV="production"

EXPOSE 3000

WORKDIR /var/www/

# Cache base package install
COPY package.json /var/www/package.json
COPY yarn.lock /var/www/yarn.lock
RUN yarn install

## Copy only needed files to folder
COPY babel.config.js ecosystem.json .eslintignore .eslintrc.js lerna.json tsconfig.json tsconfig-build.json shims.d.ts /var/www/
COPY core /var/www/core
COPY test /var/www/test
COPY packages /var/www/packages
COPY src /var/www/src

## Install modules from non-base
RUN yarn install

## Copy config in after code
COPY config /var/www/config

## Run Builds
RUN yarn build

## Copy over scripts
COPY docker/vue-storefront-alt/vue-storefront.sh /usr/local/bin/
COPY docker/vue-storefront-alt/healthcheck.js /usr/local/bin/

## Set Executable
RUN chmod +x /usr/local/bin/vue-storefront.sh

# HealthCheck
HEALTHCHECK --interval=20s --timeout=10s --retries=3 CMD node /usr/local/bin/healthcheck.js || exit 1

## set start up script
CMD ["vue-storefront.sh"]
