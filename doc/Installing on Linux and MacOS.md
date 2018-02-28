# Installation

To make vue-storefront up and runing you need to have the latest version of node (v8.3.0 used for development). You'll also need docker - or ElasticSearch + Redis installed on localhost instead. The steps below are tested on MacOS and Linux environments.

If you're on Windows please check [Windows Installation Tutorial](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Windows.md)

Let's go:

## User-friendly installation

If you're MacOS or Linux user now you're able to install with pretty nice CLI installer :)

### Requirements
1. Docker
2. Node.js > 8.x (with npm package)

### Installing
You need to use https://github.com/DivanteLtd/vue-storefront.

```
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
npm install
npm run installer
```

After answering some questions precess would start automatically. Enjoy :)


## Manual installation

### Install the vue-storefront-api
You need to use https://github.com/DivanteLtd/vue-storefront-api.
It's the ultimate API backend for this application

```
git clone https://github.com/DivanteLtd/vue-storefront-api.git vue-storefront-api
cd vue-storefront-api
npm install
docker-compose up
```
To test out the application you'll need some test data. In vue-storefront-api/var/catalog.json you have data dump for ElasticSearch with default Magento2 products database. We're using for development purposes.

First step is to configure the application:

```
cp config/default.json config/local.json
nano config/local.json
```
The config file is quite simple, but here you have some comments: [Config file for vue-storefront](https://github.com/DivanteLtd/vue-storefront/wiki/Config-file-format-for-vue-storefront).
We re using powerfull node.js library for config files, check the docs to learn more on it: https://github.com/lorenwest/node-config.

To import these products we'll use 'elasticdump' - which is provided by default with package.json dependencies and npm command:

```
npm run restore
npm run migrate
```

Clone the image files for default product database (we're using Magento2 example products dataset: https://github.com/magento/magento2-sample-data). Please execute the following command in **the root folder of vue-storefront-api project**:

```
git clone https://github.com/magento/magento2-sample-data.git var/magento2-sample-data
```

After all these steps you should be able to run the application using following command (development mode with dynamic file reloads when changed):

```
npm run dev
```

You can check if everything works just fine by executing the following command:
```
curl -i https://demo.vuestorefront.io/api/catalog/vue_storefront_catalog/product/_search?q=bag&size=50&from=0
```

### Install the vue-storefront
You need to use https://github.com/DivanteLtd/vue-storefront.
Now, it's the time to install the frontend itself:

```
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
npm install
```

You have to prepare the config:
(we re using powerfull node.js library for config files, check the docs to learn more on it: https://github.com/lorenwest/node-config)

```
cp config/default.json config/local.json
nano config/local.json
```

And then you can build app and run dev server:
```
npm run build
npm run dev
```

The default config file should work perfectly fine for default purposes.
