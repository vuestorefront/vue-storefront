FROM node:12 AS build

WORKDIR /var/www

COPY . .

RUN npm install \
   && npm run docs:build

FROM nginx

COPY --from=build /var/www/.vuepress/dist /usr/share/nginx/html/v1