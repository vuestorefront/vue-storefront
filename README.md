# vue-storefront
Vue.js storefront for Magento2 (and not only)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/

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
docker-compose-up
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
