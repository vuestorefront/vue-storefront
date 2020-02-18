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

WORKDIR /var/www/vue-storefront

# Cache base package install
COPY package.json /var/www/vue-storefront/package.json
COPY yarn.lock /var/www/vue-storefront/yarn.lock
RUN yarn install

## Copy only needed files to vue-storefront folder
COPY babel.config.js ecosystem.json .eslintignore .eslintrc.js lerna.json tsconfig.json tsconfig-build.json shims.d.ts /var/www/vue-storefront/
COPY core /var/www/vue-storefront/core
COPY test /var/www/vue-storefront/test
COPY packages /var/www/vue-storefront/packages
COPY src /var/www/vue-storefront/src

## Install modules from non-base
RUN yarn install

## Copy config in after code
COPY config /var/www/vue-storefront/config

## Run Builds
RUN yarn build:client
RUN yarn build:server
RUN yarn build:sw

## Copy over scripts
COPY docker/vue-storefront/vue-storefront.sh /usr/local/bin/
COPY docker/vue-storefront/healthcheck.js /usr/local/bin/

## Set Executable
RUN chmod +x /usr/local/bin/vue-storefront.sh

# HealthCheck
HEALTHCHECK --interval=20s --timeout=10s --retries=3 CMD node /usr/local/bin/healthcheck.js || exit 1

## set start up script
CMD ["vue-storefront.sh"]
