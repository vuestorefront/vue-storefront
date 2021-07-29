FROM node:12 AS build

WORKDIR /var/www

COPY . .

RUN yarn install --network-concurrency 1

RUN cd ./packages/core/docs \
    && yarn install \
    && yarn build

FROM nginx

COPY --from=build /var/www/.vuepress/dist /usr/share/nginx/html/v2