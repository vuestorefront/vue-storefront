# vue-storefront - PWA eCommerce app for Vue.js
Vue.js storefront for Magento2 (and not only). [![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()


Imagine the eCommerce that:

* can be deployed to any existing eCommerce platform (Magento2, Magento1, Shopware ...) - so you can avoid all the integration you already have; focusing on the value for clients,
* compliant with Progressive Web Apps standard,
* renders the catalog of products within milliseconds,
* queues orders if the server is unavailable,
* works 100% offline without Internet access,
* therefore is almost impossible to be crushed with huge traffic peaks/loads - it's basically not using server resources to work.

This is the result of such aspirations :) The Discovery project to build PoC of Vue.js storefront, backed by NoSQL database, 100% avaiable offline with Progressive Web Apps support.

More about the goals: https://www.linkedin.com/pulse/magento2-nosql-database-pwa-support-piotr-karwatka

**We're searching for active contributors, eCommerce agencies to work with us on this OSS project**

## Installation

To make vue-storefront up and runing you need to have the latest version of node (v8.3.0 used for development). You'll also need docker - or ElasticSearch + Redis installed on localhost instead. Let's go:

### Install the vue-storefront-api (https://github.com/DivanteLtd/vue-storefront-api)
It's the ultimate API backend for this application

```
mkdir vue-storefront
mkdir vue-storefront-api
git clone https://github.com/DivanteLtd/vue-storefront-api.git vue-storefront-api
cd vue-storefront-api
npm install
docker-compose up
```
To test out the application you'll need some test data. In vue-storefront-api/var/catalog.json you have data dump for ElasticSearch with default Magento2 products database. We're using for development purposes.

To import these products we'll use 'elasticdump' - which is provided by default with package.json dependencies and npm command:

```
npm run restore
```

Last step is to configure the application:

```
mv src/config.example.json config.json
nano config.json
```
The config file is quite simple, but here you have some comments: [Config file for vue-storefront](https://github.com/DivanteLtd/vue-storefront/wiki/Config-file-format-for-vue-storefront).

After all these steps you should be able to run the application using following command (development mode with dynamic file reloads when changed):

```
npm run dev
```

You can check if everything works just fine by executing the following command:
```
curl -i http://vue-storefront.divante.pl/api/catalog/vue_storefront_catalog/product/_search?q=bag&size=50&from=0
```

### Install the vue-storefront (https://github.com/DivanteLtd/vue-storefront)
Now, it's the time to install the frontend itself:

```
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
npm install
```

You have to prepare the config:

```
mv src/config.example.js config.js
nano config.js
```

The default config file should work perfectly fine for default purposes.
