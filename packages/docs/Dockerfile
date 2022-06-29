# Docs require puppeteer / chromium to generate OpenGraph images.
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-on-alpine

FROM node:14-alpine AS build

WORKDIR /var/www

# Installs latest Chromium (92) package.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Install pnpm
RUN npm install -g pnpm

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY . ./

# Build packages (needed to generate API reference)
RUN pnpm install \
    && pnpm build

# Build documentation
RUN cd packages/docs \
    && pnpm build

FROM nginx

COPY --from=build /var/www/packages/docs/.vuepress/dist /usr/share/nginx/html/v2
