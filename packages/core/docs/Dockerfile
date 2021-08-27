FROM node:12 AS build

WORKDIR /var/www

COPY . .

RUN yarn install \
    && yarn build:core \
    && yarn build:ct:api-client

RUN cd packages/core/docs \
    && yarn install \
    && yarn build

FROM nginx

COPY --from=build /var/www/packages/core/docs/.vuepress/dist /usr/share/nginx/html/v2