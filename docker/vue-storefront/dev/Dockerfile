FROM node:10-alpine

ENV VS_ENV prod

WORKDIR /var/www

COPY package.json ./
COPY yarn.lock ./

RUN apk add --no-cache --virtual .build-deps ca-certificates wget python make g++ git \
  && yarn install --no-cache

COPY ./config ./config_repo
RUN chmod 774 ./config_repo/production.json

EXPOSE 3000

COPY docker/vue-storefront/dev/dev_entrypoint.sh /usr/local/bin/dev_entrypoint.sh
RUN chmod +x /usr/local/bin/dev_entrypoint.sh

RUN ["cat", "/usr/local/bin/dev_entrypoint.sh"]
ENTRYPOINT ["/usr/local/bin/dev_entrypoint.sh"]
