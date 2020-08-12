FROM node:10

# ENV NODE_CONFIG_ENV=docker PM2_ARGS=--no-daemon BIND_HOST=0.0.0.0 VS_ENV=prod

ARG COMMIT
ENV LAST_COMMIT=${COMMIT}

WORKDIR /var/www

COPY . .

RUN yarn install && yarn build:ct && yarn cache clean --all

COPY dev/docker/vue-storefront.sh /usr/local/bin/

ENTRYPOINT ["vue-storefront.sh"]

