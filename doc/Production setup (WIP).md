## Introduction

If you like to start developing sites using Vue Storefront, probably You need to start with the [Installation guide](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Linux%20and%20MacOS.md). For the development purposes You'll probably be using `yarn install` / `npm run installer` sequence which will setup Vue Storefront locally using the automated installer and prepared Docker images for having Elastic Search and Redis support.

Development mode means You're using node.js based server as HTTP service and running the app on the `3000` TCP port. As it's great for local testing it's **not recommended** to use installer and direct user access to node.js in production configurations.

## Production setup - bare VPS

To run Vue Storefront in the production mode without Docker/Kubernetes You'll need the Virtual Private Server with `root` access (for the setup purposes). We'll assume that You're using `Debian GNU Linux` in the following steps.

Assumptions for the rest of this tutorial:
- You're having root access to Debian Linux machine
- We'll be using the default local ports `3000` for [`vue-storefront`](https://github.com/DivanteLtd/vue-storefront) and `8080` for [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api); the ports **should not be exposed** as they will be hidden behind **nginx proxy**
- We're using **prod.vuestorefront.io** as a domain name - please replace it with Your host URL address.
- We assume that You have SSL certificate for **prod.vuestorefront.io** (or Your domain of course). SSL encryption is required for PWA + service workers
- That's all ;)

General Solution Architecture:
USER -> nginx proxy -> vue-storefront / vue-storefront-api

We'll be hiding the `vue-storefront` and `vue-storefront-api` services behind nginx proxy. You can use nginx for caching proxy, but in our case it will be just forwarding the requests without cache (as VS is pretty fast and caching is not required). The key features we're using are: SSL encryption, gzip-encoding, url routing (to merge `vue-storefront` and `vue-storefront-api` services under one domain)

### Prerequisites

Vue Storefront requires **Elastic Search** and the **Redis server** installed. By default, in the development mode, both dependencies are provided with the `docker-compose.yml` Docker images. However, for the production purposes we recommend to install the servers natively.

For the purposes of this tutorial we'll be using default packages distributed along with the Debian operating systems, without any security hardening, config hardening operations.

**Please make sure** that Your security/devops team have taken a look at the configs You're using and do harden the server configuration before launching Your app publicly!


First, let's create the user (as root user):
```bash
mkdir /home/www
useradd -m -d /home/www/vuestorefront vuestorefront
```

Then install the Elasticsearch and Redis (as root user):
```bash
apt-get update
apt-get install curl
apt-get install git

curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
npm install -g yarn

apt-get install redis-server


apt-get install openjdk-8-jre
curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.9.deb
dpkg -i elasticsearch-5.6.9.deb
/etc/init.d/elasticsearch start


apt-get install imagemagick
apt-get install nginx
```

### Nginx

We decided to use **nginx** as a HTTP proxy - exposed in front of the users, handling the network traffic and dealing with the `vue-storefront` and the `vue-storefront-api` apps as backend.

This is a general rule of setting up production node.js app which gives You lot of flexibility regarding the SSL, gzip compression, URL routing and other techniques to be configured without additional hassle. You can use any other proxy server for this purpose - such as Varnish or Apache2 + mod_proxy.

Some additional materials:
- [How to setup production node.js app in the Digital Ocean environment (Ubuntu 16)](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
- [How to setup nginx reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

#### Nginx configuration

[Here is the complete `/etc/nginx/sites-enabled/prod.vuestorefront.io` file](https://github.com/DivanteLtd/vue-storefront/tree/develop/doc/production-setup/etc/nginx/sites-enabled).

Create nginx config file from the template (please run as a root user):
```bash
curl https://raw.githubusercontent.com/DivanteLtd/vue-storefront/develop/doc/production-setup/etc/nginx/sites-enabled/prod.vuestorefront.io > /etc/nginx/sites-available/prod.vuestorefront.io
ln -s /etc/nginx/sites-available/prod.vuestorefront.io /etc/nginx/sites-enabled/prod.vuestorefront.io
```

**Install the SSL certificate**

```bash
mkdir /etc/nginx/ssl
nano /etc/nginx/ssl/prod.vuestorefront.io.chained.crt
nano /etc/nginx/ssl/prod.vuestorefront.io.key
nano /etc/nginx/ssl/dhparam.pem
```

Now You can run the nginx:

```bash
/etc/init.d/nginx restart
```

Please find the full comments on the following sections of the file below:

```
server {
	listen 80;
	server_name prod.vuestorefront.io;
	return 301 https://prod.vuestorefront.io$request_uri;
}
```

This section runs the standard http://prod.vuestorefront.io and creates a wildcard redirect from http://prod.vuestorefront.io/* -> https://prod.vuestorefront.io/. SSL secured connection is a must for run PWA and use service-workers.

```
server {
	listen 443 ssl;
	server_name prod.vuestorefront.io http2;

	ssl on;
```

We're using `http2` but it's not required. This section is for setting up the SSL secured virtual host of Vue Storefront frontend.

```

	ssl_certificate /etc/nginx/ssl/prod.vuestorefront.io.chained.crt;
	ssl_certificate_key /etc/nginx/ssl/prod.vuestorefront.io.key;

```

We assume that the certificate related files are stored in the `/etc/nginx/ssl/`. Please point it to Your certificate files.

```

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
	ssl_prefer_server_ciphers on;
	ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:DHE-RSA-AES256-SHA;
	ssl_ecdh_curve secp384r1;
	ssl_session_timeout 10m;
	ssl_session_cache shared:SSL:10m;
	ssl_session_tickets off;
	ssl_stapling on;
	ssl_stapling_verify on;
	resolver 8.8.8.8 8.8.4.4 valid=300s;
	resolver_timeout 5s;

	ssl_dhparam /etc/nginx/ssl/dhparam.pem;

	add_header Strict-Transport-Security "max-age=31536000" always;
	add_header X-Frame-Options DENY;
	add_header X-Content-Type-Options nosniff;
	add_header X-XSS-Protection "1; mode=block";
	add_header X-Robots-Tag none;
```

Here we go with the SSL settings - based on our best experiences from the past ;) Please read details in the [nginx documentation if You like](http://nginx.org/en/docs/http/configuring_https_servers.html) ;)

```
	gzip on;
	gzip_proxied any;
	gzip_types
		text/css
		text/javascript
		text/xml
		application/javascript
		application/json
		text/json
		text/html;
	}
```

Vue Storefront SSR responses contain the full markup + JSON objects included for speed-up the first page view. Unfortunatelly - among with the significant JS bundle sizes - it can generate significat network load. We're optimizing it with using gzip compression server side.

```

	location / {
		proxy_pass http://localhost:3000/;
	}
```

We're using [`proxy_pass`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html) from the `ngx_http_proxy_module` to pull the content from the Vue Storefront nodejs server. Site will be available under https://prod.vuestorefront.io/

```
	location /assets/ {
		proxy_pass http://localhost:3000/assets/;
	}
```
The same module is used for providing user with the static assets. Assets will be available under: https://prod.vuestorefront.io/assets

```
	location /api/ {
		proxy_pass http://localhost:8080/api/;
	}
```

The next proxy section is used for serving the API. It's a proxy to [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api) app. running on `8080` port (default config). API will be available under: https://prod.vuestorefront.io/api

If Your `vue-storefront` app is configured to use `config.server.api=graphql` then You also need to configure proper graphql endpoint:

```
	location /graphql {
		proxy_pass http://localhost:8080/graphql/;
	}
```

**Note:** Please remember to set `config.server.protocol=https` in order to use graphQL as the graphQL endpoint URL is constructed like this:
```js
  const httpLink = new HttpLink({
    uri: store.state.config.server.protocol + '://' + store.state.config.graphql.host + ':' + store.state.config.graphql.port + '/graphql'
  })
```

```
	location /img/ {
		proxy_pass http://localhost:8080/img/;
	}
}

```
The last proxy  is used for serving the product images. It's a proxy to [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api) app. running on `8080` port (default config). The `/img` endpoint. Images will be available under: https://prod.vuestorefront.io/img

#### Apache2 configuration
In case you are already using the apache2 web-server in your environmen as well and can't  (or don'T want) to use nginx, you can also set up apache2 as an reverse proxy instead of nginx. This is done by adding this block to your apache2 vitual host.
```
ProxyRequests off

ProxyPass /api/ http://localhost:8080/api/ 
ProxyPassReverse /api http://localhost:8080/api/

ProxyPass /graphql http://localhost:8080/graphql
ProxyPassReverse /graphql http://localhost:8080/graphql

ProxyPass /img/ http://localhost:8080/img/
ProxyPassReverse /img http://localhost:8080/img/

ProxyPass /assets/ http://localhost:3000/assets/ 
ProxyPassReverse /assets http://localhost:3000/assets/

ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/


```
You also need to  enable [mod_proxy](https://httpd.apache.org/docs/current/mod/mod_proxy.html) for this.

### Vue Storefront and Vue Storefront API

After You have the nginx set up, You should get ... a 502 error when accesing the https://prod.vuestorefront.io. This is totally fine! We've just missed the most important step which is running the backend services that will power up our installation. Now nginx is trying to connect to `localhost:3000` for `vue-storefront` and `localhost:8080` for `vue-storefront-api` without any success!

We created a Linux user called `vuestorefront` and go to `/home/www/vuestorefront` which is our home directory.

You need to clone the `vue-storefront` and the `vue-storefront-api` repos accordingly with the following commands:

```bash
su vuestorefront
cd /home/www/vuestorefront
git clone https://github.com/DivanteLtd/vue-storefront.git
git clone https://github.com/DivanteLtd/vue-storefront-api.git
```

Then You need to install the required node packages:

```bash
cd /home/www/vuestorefront/vue-storefront-api
yarn install
```

... and ...

```
cd /home/www/vuestorefront/vue-storefront
yarn install
```

It may take few minutes. Once the modules are installed we can set the configuration files for both services.

#### Vue Storefront configuration

The full configuration files are available here to download: [vue-storefront](https://github.com/DivanteLtd/vue-storefront/tree/develop/doc/production-setup/vue-storefront/config) and [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront/tree/develop/doc/production-setup/vue-storefront-api/config).

Please create the `vue-storefront-api/config/local.json` and `vue-storefront/config/local.json` files accordingly.

```bash
curl https://raw.githubusercontent.com/DivanteLtd/vue-storefront/develop/doc/production-setup/vue-storefront-api/config/local.json > /home/www/vuestorefront/vue-storefront-api/config/local.json
```
... and ...

```bash
curl https://raw.githubusercontent.com/DivanteLtd/vue-storefront/develop/doc/production-setup/vue-storefront/config/local.json > /home/www/vuestorefront/vue-storefront/config/local.json
```


Please find the key sections of the `vue-storefront/config/local.json` file described in below:

```json
    "server" : {
       "protocol": "https"
    },
    "elasticsearch": {
        "httpAuth": "",
        "host": "https://prod.vuestorefront.io/api/catalog",
        "index": "vue_storefront_catalog"
    },
    "graphql": {
        "host": "prod.vuestorefront.io",
        "port": 80
    },    
    "storeViews": {
        "mapStoreUrlsFor": [
            "de",
            "it"
        ],
        "multistore": true,
        "de": {
            "disabled": false,
            "elasticsearch": {
                "httpAuth": "",
                "host": "https://prod.vuestorefront.io/api/catalog",
                "index": "vue_storefront_catalog_de"
            }
        },
        "it": {
            "disabled": false,
            "elasticsearch": {
                "httpAuth": "",
                "host": "https://prod.vuestorefront.io/api/catalog",
                "index": "vue_storefront_catalog_it"
            }
        }
    },
```

We're seting up the product's endpoint to https://prod.vuestorefront.io/api/catalog (please use Your domain accordingly of course). As You may noticed the `/api` url is proxied by the nginx to `localhost:8080` - our `vue-storefront-api` instance.

```json
 "cart": {
        "synchronize": true,
        "synchronize_totals": true,
        "create_endpoint": "https://prod.vuestorefront.io/api/cart/create?token={{token}}",
        "updateitem_endpoint": "https://prod.vuestorefront.io/api/cart/update?token={{token}}&cartId={{cartId}}",
        "deleteitem_endpoint": "https://prod.vuestorefront.io/api/cart/delete?token={{token}}&cartId={{cartId}}",
        "pull_endpoint": "https://prod.vuestorefront.io/api/cart/pull?token={{token}}&cartId={{cartId}}",
        "totals_endpoint": "https://prod.vuestorefront.io/api/cart/totals?token={{token}}&cartId={{cartId}}",
        "paymentmethods_endpoint": "https://prod.vuestorefront.io/api/cart/payment-methods?token={{token}}&cartId={{cartId}}",
        "shippingmethods_endpoint": "https://prod.vuestorefront.io/api/cart/shipping-methods?token={{token}}&cartId={{cartId}}",
        "shippinginfo_endpoint": "https://prod.vuestorefront.io/api/cart/shipping-information?token={{token}}&cartId={{cartId}}",
        "collecttotals_endpoint": "https://prod.vuestorefront.io/api/cart/collect-totals?token={{token}}&cartId={{cartId}}",
        "deletecoupon_endpoint": "https://prod.vuestorefront.io/api/cart/delete-coupon?token={{token}}&cartId={{cartId}}",
        "applycoupon_endpoint": "https://prod.vuestorefront.io/api/cart/apply-coupon?token={{token}}&cartId={{cartId}}&coupon={{coupon}}"
    },
```

There are ... 27 more instances of `prod.vuestorefront.io` to be replaced with Your production URL address in this file - please just do so :)


#### Vue Storefront API configuration

The [provided vue-storefront-api configuration](https://github.com/DivanteLtd/vue-storefront/tree/develop/doc/production-setup/vue-storefront-api/config) requires almost no changes.

The only lines You need to alter are:

```json
    "imageable": {
        "namespace": "",
        "maxListeners": 512,
        "imageSizeLimit": 1024,
        "timeouts": {
            "convert": 5000,
            "identify": 100,
            "download": 1000
        },
        "whitelist": {
            "allowedHosts": [
                ".*divante.pl",
                ".*vuestorefront.io"
            ],
            "trustedHosts": [
                ".*divante.pl",
                ".*vuestorefront.io"
            ]
        },
        "keepDownloads": true,
        "maxDownloadCacheSize": 1000,
        "tmpPathRoot": "/tmp"
    },
    "elasticsearch": {
        "host": "localhost",
        "port": "9200",
        "indices": [
            "vue_storefront_catalog",
            "vue_storefront_catalog_it",
            "vue_storefront_catalog_de"
        ]
```
You should put here the `allowedHosts` and `trustedHosts` for the Imageable - to download the product images. The domain names points to the **Magento2** instance where images are sourced. In this example Magento2 is running under **http://demo-magento2.vuestorefront.io**.


#### Build VS

Before we can run Vue Storefront and Vue Storefront API we should build it in the production mode. To do so please just execute the following commands:

```bash
cd /home/www/vuestorefront/vue-storefront/
yarn build
```

```bash
cd /home/www/vuestorefront/vue-storefront-api/
yarn build
```

#### Data import

Vue Storefront need to have some data in the ElasticSearch to properly display products and categories. Of course You can install [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) and configure the data pump to synchronize and update the ElasticSearch index whenever data is being changed in Magento. For purposes of this tutorial we'll just restore the data from the JSON file.

You can easily dump Your current VS index using the following command (Your local instalation):

```bash
cd vue-storefront-api
rm var/catalog.json
npm run dump
```

Now in the `var/catalog.json` You have Your current database dump. Please transfer this file to the server for example using the following ssh command:

```bash
ssh vuestorefront@prod.vuestorefront.io rm ~/vue-storefront-api/var/catalog.json
scp vue-storefront-api/var/catalog.json vuestorefront@prod.vuestorefront.io:~/vue-storefront-api/var/catalog.json
```

Then, after logging in to your `prod.vuestorefront.io` server as a `vuestorefront` You can run the following command to import the data:

```bash
cd vue-storefront-api
npm run db new
npm run restore2main
npm run db rebuild
```

#### Running the Vue Storefront and Vue Storefront API

After everything set, You can just start the `vue-storefront` and `vue-storefront-api`:

```bash
cd vue-storefront-api
yarn start
cd vue-storefront
yarn start
```

Both applications are using [`PM2` process manager](https://pm2.io/runtime) in the production mode (`start` commands) to manage and respawn the nodejs processess when neede.

## Production setup - using Docker / Kubernetes

To be prepared.
