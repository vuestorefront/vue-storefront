FROM node:24.14.1-alpine

ARG YARN_VERSION=1.22.22

ENV VS_ENV prod

WORKDIR /var/www

RUN apk add --no-cache gettext git grep

RUN corepack prepare "yarn@${YARN_VERSION}" --activate \
  && test "$(yarn --version)" = "${YARN_VERSION}"

COPY docker/vue-storefront/vue-storefront.sh /usr/local/bin/

COPY config /var/www/config

CMD ["vue-storefront.sh"]
