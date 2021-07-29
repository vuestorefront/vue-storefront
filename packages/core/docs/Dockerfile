FROM node:12 AS build

WORKDIR /var/www

COPY . .

RUN yarn install --network-concurrency 1
RUN cd packages/core/core && yarn build && yarn cache clean --all
RUN cd packages/core/middleware && yarn build && yarn cache clean --all
RUN cd packages/commercetools/api-client && yarn build && yarn cache clean --all
RUN cd packages/commercetools/composables && yarn build && yarn cache clean --all

RUN cd ./packages/core/docs \
    && npm install \
    && npm run build

FROM nginx

COPY --from=build /var/www/.vuepress/dist /usr/share/nginx/html/v2