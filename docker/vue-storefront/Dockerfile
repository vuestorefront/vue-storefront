FROM node:24.14.1-alpine

ARG YARN_VERSION=4.17.1

ENV VS_ENV prod
ENV COREPACK_HOME=/usr/local/share/corepack
ENV YARN_GLOBAL_FOLDER=/usr/local/share/.cache/yarn/berry

WORKDIR /var/www

RUN apk add --no-cache gettext git grep

RUN mkdir -p "${COREPACK_HOME}" \
  && corepack enable \
  && corepack install --global "yarn@${YARN_VERSION}" \
  && test "$(yarn --version)" = "${YARN_VERSION}"

COPY docker/vue-storefront/vue-storefront.sh /usr/local/bin/

COPY config /var/www/config

CMD ["vue-storefront.sh"]
