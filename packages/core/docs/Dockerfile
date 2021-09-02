FROM node:12 AS build

WORKDIR /var/www

COPY . .

RUN yarn install \
    && yarn build:ct:tools

RUN cd packages/core/docs \
    && yarn install \
    && yarn build

FROM nginx

COPY --from=build /var/www/packages/core/docs/.vuepress/dist /usr/share/nginx/html/v2