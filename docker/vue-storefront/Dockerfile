FROM node:10-alpine

ENV VS_ENV production
ENV NODE_ENV production

WORKDIR /var/www

COPY package.json ./
COPY yarn.lock ./

RUN apk update
RUN apk add --virtual .build-deps ca-certificates wget git \
  && yarn install \
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
RUN chmod 774 ./config_repo/production.json
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
