FROM node:12-alpine AS build

WORKDIR /var/www

# Installs latest Chromium (92) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

COPY . .

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn install \
    && yarn build:ct:tools

RUN cd packages/core/docs \
    && yarn install \
    && yarn build

FROM nginx

COPY --from=build /var/www/packages/core/docs/.vuepress/dist /usr/share/nginx/html/v2