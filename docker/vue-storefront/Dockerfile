FROM node:10-alpine

ENV VS_ENV prod

WORKDIR /var/www

#COPY package.json ./
#COPY yarn.lock ./

RUN apk add --no-cache --virtual .build-deps ca-certificates wget python make g++ \
  && apk add --no-cache git \
  && apk del .build-deps

RUN apk add --update libintl && apk add --virtual build_deps gettext

RUN apk add --no-cache --upgrade grep

COPY docker/vue-storefront/vue-storefront.sh /usr/local/bin/

COPY config /var/www/config

CMD ["vue-storefront.sh"]
