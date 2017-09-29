# Vue Storefront - PWA for eCommerce
Vue Storefront is a standalone PWA storefront for your eCommerce, possible to connect with any eCommerce backend (eg. Magento, Prestashop or Shopware) through the API.

Vue Storefront is and always will be in the open source. Anyone can use and support the project, we want it to be a tool for the improvement of the shopping experience.
The project is still in the prove of concept phase. **We are looking for Contributors and Designer willing to help us the the solution development.**

## The business challenges
Vue Storefront was created to solve a set of key business challenges from the world of shopping experience. Our goal for the application is to provide the solution with:
* The ultrafast front-end for the store - with the PWA approach we can now render the catalog of products within milliseconds;
* The endurance for traffic overloads on the store;
* The off-line shopping capabilities;
* The smooth shopping experience close to the user experience from the native mobile applications;
* The all-in-one front-end for desktop and mobile screens with no necessity for maintaining 3 or more applications for different touchpoints (web browser, Android, iOS etc.).

## The technology
Vue Storefront was build as a all-in-one front-end for eCommerce. For providing the best performance we decided to use Vue.js as a front-end library, Node.js + Express (and maybe GraphQL support) as a server-API, Elastic Search as a database of products and full PWA/off-line support.
Here you can read more about the proof of concept for [Vue Storefront connected with Magento2](https://www.linkedin.com/pulse/magento2-nosql-database-pwa-support-piotr-karwatka).

Besides a big improvement for the shopping experience, we also want to create a great code base for every developer who needs to work on a front-end application for the eCommerce.

## The design
The application is prepared to be fully customized in design through theming system.
With the current version we work on raw, basic template of typical eCommerce for a fashion industry.
In the project we used [Material Icons](https://github.com/google/material-design-icons).

To make the prototype more realistic we used H&M brand and products in our concept design. The graphics and photos from the H&M concept visualisation are not included, they are the exclusive property of the [H&M fashion brand](http://www.hm.com/).

<img width="1440" alt="1" src="https://user-images.githubusercontent.com/18116406/31016336-89a075bc-a524-11e7-9855-f385bf140f55.png">

Here you can read more about the process of [designing PWA for eCommerce](https://www.linkedin.com/pulse/designing-pwa-ecommerce-karl-bzik/).

## The license
Vue Storefront source code is completely free and released under the [MIT License](https://github.com/DivanteLtd/vue-storefront/blob/master/LICENSE).

## Contributing
If you like the idea behind Vue Storefront and want to become a contributor - do not hesitate and check our [list of the active issues](https://github.com/DivanteLtd/vue-storefront/issues) or contact us directly via vuestorefront@divante.co.

## Installation

To make vue-storefront up and runing you need to have the latest version of node (v8.3.0 used for development). You'll also need docker - or ElasticSearch + Redis installed on localhost instead. Let's go:

### Install the vue-storefront-api
You need to use https://github.com/DivanteLtd/vue-storefront-api.
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

### Install the vue-storefront
You need to use https://github.com/DivanteLtd/vue-storefront.
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

## The screenshots

<img width="1440" alt="2" src="https://user-images.githubusercontent.com/18116406/31016666-eafb3fee-a525-11e7-9317-18ec3f91aaf1.png">

<img width="1440" alt="3" src="https://user-images.githubusercontent.com/18116406/31016669-ef97db8e-a525-11e7-858d-debe7c42d36e.png">

<img width="1440" alt="4" src="https://user-images.githubusercontent.com/18116406/31016670-f240aaa0-a525-11e7-97be-f5b931f42e4c.png">

