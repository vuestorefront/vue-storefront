FROM node:24.14.1-alpine

ARG YARN_VERSION=4.17.1

ENV VS_ENV prod
ENV COREPACK_HOME=/usr/local/share/corepack

WORKDIR /var/www

RUN apk add --no-cache gettext git grep

RUN mkdir -p "${COREPACK_HOME}" \
  && corepack enable \
  && corepack install --global "yarn@${YARN_VERSION}" \
  && test "$(yarn --version)" = "${YARN_VERSION}"

ENV HOME=/var/www/var/.yarn/home
ENV XDG_CACHE_HOME=/var/www/var/.yarn/home/.cache
ENV YARN_GLOBAL_FOLDER=/var/www/var/.yarn/berry
ENV PM2_HOME=/var/www/var/.yarn/pm2

COPY docker/vue-storefront/vue-storefront.sh /usr/local/bin/

COPY config /var/www/config

CMD ["vue-storefront.sh"]
