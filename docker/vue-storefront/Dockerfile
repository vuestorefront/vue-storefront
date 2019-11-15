FROM node:10-alpine

ENV VS_ENV prod

WORKDIR /var/www

COPY package.json ./
COPY yarn.lock ./

RUN apk add --no-cache --virtual .build-deps ca-certificates wget python make g++ \
  && apk add --no-cache git \
  && yarn install --no-cache \
  && apk del .build-deps

COPY shims.d.ts ./
COPY tsconfig-build.json ./
COPY tsconfig.json ./
COPY lerna.json ./
COPY cypress.json ./
COPY .postcssrc ./
COPY .env ./
COPY .travis.yml ./
COPY .eslintrc.js ./
COPY .eslintignore ./
COPY ecosystem.json ./
COPY babel.config.js ./

COPY ./config ./config_repo
COPY ./core ./core
COPY ./src ./src
COPY ./test ./test
COPY ./packages ./packages
COPY ./docker ./docker
COPY ./kubernetes ./kubernetes

EXPOSE 3000

COPY docker/vue-storefront/vue-storefront.sh /usr/local/bin/
RUN chmod 774 /usr/local/bin/vue-storefront.sh

CMD ["vue-storefront.sh"]
