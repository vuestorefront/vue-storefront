FROM node:18-alpine
RUN apk add --no-cache python3 py3-pip make build-base
RUN pip3 install setuptools --break-system-packages
COPY . .
RUN yarn install
RUN cd packages/middleware && npm run build
# RUN yarn lerna run build --scope="@vue-storefront/middleware"
CMD ["node", "tilt_resources/middleware.js"]
