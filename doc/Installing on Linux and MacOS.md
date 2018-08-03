# Installation

The steps below are tested on MacOS and Linux environments. If you're on Windows please check [Windows Installation Tutorial](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Windows.md).

Let's go!

## Requirements
- Docker (with ['docker-compose'](https://docs.docker.com/compose/install/) installed)

Already included in `vue-storefront` and `vue-storefront-api` Docker images (required locally, if you do not use containerization):
- Node.js [Active LTS](https://github.com/nodejs/Release) (>=8.0.0)
- [Yarn](https://yarnpkg.com/en/docs/install) (>=1.0.0)
- [ImageMagick](https://www.imagemagick.org/script/index.php) (to fit, resize and crop images)

## User-friendly installation

If you're MacOS or Linux user now you're able to install with pretty nice CLI installer :)

You need to use https://github.com/DivanteLtd/vue-storefront.

```
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
yarn
yarn installer
```

After answering some questions precess would start automatically. Enjoy :)

## Manual installation

### Install the vue-storefront-api

You need to use https://github.com/DivanteLtd/vue-storefront-api. It's the ultimate API backend for this application.

```
git clone https://github.com/DivanteLtd/vue-storefront-api.git vue-storefront-api
cd vue-storefront-api
```

You can choose between two modes of running the application:

1. The **legacy** mode - starting just Elastic and Redis containers:
   ```
   docker-compose up -d
   ```

2. The **standard** mode - starting Elastic, Redis and Vue Storefront API containers:
   ```
   docker-compose -f docker-compose.yml -f docker-compose.nodejs.yml up -d
   ```

If you choose to use **legacy** mode, you must manually install the Yarn dependencies for the project:

```
yarn install
```

As a result, all necessary services will be launched:
- Vue Storefront API runtime environment (Node.js with dependencies from `package.json`)
- [ElasticSearch](https://www.elastic.co/products/elasticsearch)
- [Redis](https://redis.io/)
- Kibana (optional)

To test out the application you'll need some test data. In `vue-storefront-api/var/catalog.json` you have data dump for ElasticSearch with default Magento2 products database. We're using for development purposes.

First step is to configure the application:

```
cp config/default.json config/local.json
nano config/local.json
```

The config file is quite simple, but here you have some comments: [Config file for vue-storefront](https://github.com/DivanteLtd/vue-storefront/wiki/Config-file-format-for-vue-storefront).
We re using powerfull node.js library for config files, check the docs to learn more on it: https://github.com/lorenwest/node-config.

To import these products we'll use 'elasticdump' - which is provided by default with package.json dependencies and yarn command. Then, we need to update the structures in the database to the latest version (data migrations).

Depending on the selected mode, execute the following commands:
- **legacy** mode:
  ```
  yarn restore
  yarn migrate
  ```
- **standard** mode:
  ```
  docker exec -it vuestorefrontapi_app_1 yarn restore
  docker exec -it vuestorefrontapi_app_1 yarn migrate
  ```

Clone the image files for default product database (we're using Magento2 example products dataset: https://github.com/magento/magento2-sample-data). Please execute the following command in **the root folder of vue-storefront-api project**:

```
git clone https://github.com/magento/magento2-sample-data.git var/magento2-sample-data
```

If you choose to use **standard** mode, the application is already running in the background. However, if you decided to stay with the **legacy** mode, you must start the application manually using following command (development mode with dynamic file reloads when changed):

```
yarn dev
```

After all these steps you should be able to use the API application!

You can check if everything works just fine by executing the following command:
```
curl -i http://localhost:8080/catalog/vue_storefront_catalog/product/_search?q=bag&size=50&from=0
```

Now, it's the time to install the frontend itself.

### Install the vue-storefront
You need to use https://github.com/DivanteLtd/vue-storefront.

```
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
```

Next, you have to prepare the config:
_(we re using powerfull node.js library for config files, check the docs to learn more on it: https://github.com/lorenwest/node-config)_

```
cp config/default.json config/local.json
nano config/local.json
```

The default config file should work perfectly fine for default purposes.

Finally, you have to choose between two modes of running the application (similarly as in the case of vue-storefront-api):

1. The **legacy** mode:
   ```
   yarn build
   yarn dev
   ```

2. The **standard** mode (whole runtime environment inside the container):
   ```
   docker-compose up
   ```

That's all - your frontend application is now up and running!
