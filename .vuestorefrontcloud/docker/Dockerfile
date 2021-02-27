FROM node:12

ARG COMMIT
ARG NPM_USER
ARG NPM_PASS
ARG NPM_EMAIL
ARG NPM_REGISTRY

ENV LAST_COMMIT=${COMMIT}

RUN npm install -g npm-cli-login \
  && npm-cli-login

WORKDIR /var/www

COPY . .

RUN yarn install --network-concurrency 1 && yarn build && yarn cache clean --all

COPY .vuestorefrontcloud/docker/vue-storefront.sh /usr/local/bin/

ENTRYPOINT ["vue-storefront.sh"]

