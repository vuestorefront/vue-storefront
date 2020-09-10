# Production setup

If you’d like to start developing sites using Vue Storefront, you should start with the [Installation guide](linux-mac.md). For development purposes, you'll likely use the `yarn install` sequence, which will set up Vue Storefront locally using the automated installer and prepared Docker images for having Elasticsearch and Redis support.

Development mode means you're using a node.js-based server as HTTP service and running the app on the `3000` TCP port. As it's great for local testing, it's not recommended to use the installer and direct-user access to node.js in production configurations.

## Production setup: Bare VPS

To run Vue Storefront in production mode without Docker/Kubernetes, you'll need the Virtual Private Server with `root` access (for setup purposes). We assume that you're using `Debian GNU Linux` in the following steps.

Assumptions for the rest of this tutorial:

- You have root access to a Debian Linux machine.
- We'll be using the default local ports `3000` for [`vue-storefront`](https://github.com/DivanteLtd/vue-storefront) and `8080` for [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api); the ports **should not be exposed**, as they will be hidden behind **NGINX proxy**.
- We're using **prod.vuestorefront.io** as a domain name. Please replace it with your host URL address.
- We assume that you have an SSL certificate for **prod.vuestorefront.io** (or your domain, of course). SSL encryption is required for PWA and Service Workers.

General Solution Architecture:
_USER -> NGINX proxy -> vue-storefront / vue-storefront-api_

We'll be hiding the `vue-storefront` and `vue-storefront-api` services behind the NGINX proxy. You can use NGINX for caching proxy, but in our case, it will just forward the requests without cache (as VS is pretty fast and caching is not required). The key features we're using are: SSL encryption, gzip-encoding, and URL routing (to merge `vue-storefront` and `vue-storefront-api` services under one domain).

### Prerequisites

:::tip NOTE
This guide is tested on _Ubuntu 18.04_ and other major distros. The list will be updated continuously.
:::

Vue Storefront requires **Elasticsearch** and the **Redis server** to be installed. By default, in the development mode, both dependencies are provided with the `docker-compose.yml` Docker images. However, for production purposes, we recommend installing the servers natively.

For the purpose of this tutorial, we will use default packages distributed along with Debian operating systems, without any security hardening, config hardening operations.

**Please make sure** that your security/devops team has taken a look at the configs you're using and do harden the server configuration before launching your app publicly!

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

curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs
npm install -g yarn

apt-get install redis-server

apt-get install openjdk-8-jre
curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.16.deb
dpkg -i elasticsearch-5.6.16.deb
/etc/init.d/elasticsearch start

apt-get install imagemagick
apt-get install nginx
```

### Nginx

We decided to use **NGINX** as an HTTP proxy, exposed in front of the users, handling the network traffic, and dealing with the `vue-storefront` and the `vue-storefront-api` apps as a backend.

This is a general rule of setting up a production node.js app, which gives you a lot of flexibility regarding the SSL, gzip compression, URL routing, and other techniques to be configured without additional hassle. You can use any other proxy server for this purpose, such as Varnish or Apache2 + mod_proxy.

Some additional materials:

- [How to setup production Node.js app in the Digital Ocean environment (Ubuntu 16)](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
- [How to setup NGINX reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

#### NGINX configuration

:::warning OPTIONAL
In case you have already set up SSL on your own domain, please skip to [the next step](#now-you-can-run-the-nginx-with-ssl-applied).
:::

Create NGINX config file from the template (please run as a root user):

```bash
curl https://raw.githubusercontent.com/DivanteLtd/vue-storefront/develop/docs/guide/installation/prod.vuestorefront.io > /etc/nginx/sites-available/prod.vuestorefront.io
ln -s /etc/nginx/sites-available/prod.vuestorefront.io /etc/nginx/sites-enabled/prod.vuestorefront.io
```

You need to replace two lines of the configuration you just downloaded with the actual path to your certificate files with its key.

**Install the SSL certificate**

SSL secured connection is a ___must-have requisite___ for PWA and service-workers by its spec.

In this guide, we will use free ___Let's Enrypt___ service to get the SSL certificate for the sake of simplicity.
In order to use ___Let's Encrypt___, you need to install `certbot`, the guide is [here](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx).

:::tip NOTE
As sure as it gets, you can use any other SSL service provider of your choice which best suits your need. It's not free most of time though.
:::

Once `certbot` installation is done, run the following command to get the certificate information.
```bash
certbot certificates
```

The result would be like as follows :
```bash
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: prod.vuestorefront.io
    Domains: prod.vuestorefront.io
    Expiry Date: 2020-04-19 22:47:19+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/prod.vuestorefront.io/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/prod.vuestorefront.io/privkey.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

Replace the paths for certificate and its key in the `/etc/nginx/sites-available/prod.vuestorefront.io` with the info above as follows :
```bash{5,6}
# ... abridged

  ssl on;

  ssl_certificate /etc/letsencrypt/live/prod.vuestorefront.io/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/prod.vuestorefront.io/privkey.pem;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

# abridged ...
```

:::tip NOTE
```bash
server {
  listen 80;
  server_name prod.vuestorefront.io;
  return 301 https://prod.vuestorefront.io$request_uri;
}
```

This section runs the standard `http://prod.vuestorefront.io` and creates a wildcard redirect from `http://prod.vuestorefront.io/*` -> `https://prod.vuestorefront.io/*`.
:::

#### Now you can run the NGINX with SSL applied :

```bash
/etc/init.d/nginx restart
```

:::tip TIP
After you're done with the installation, once again open `/etc/nginx/sites-available/prod.vuestorefront.io` and add `http2` after the `listen 443 ssl` (but before the semicolon!). It should look like this:
```
server {
    listen 443 ssl http2;
    server_name prod.vuestorefront.io;

	ssl on;
	(...the rest of the config...)
}
```

`http2` is not required, but can optimize the experience for browsers that support it. More details on http/2 can be found at [here](https://developers.google.com/web/fundamentals/performance/http2/)
:::

#### Some notes on the provided nginx config

Here we go with the SSL settings based on our best experiences from the past. Please read details in the
 [NGINX documentation](http://nginx.org/en/docs/http/configuring_https_servers.html) if you like ;)

```
  gzip on;
  gzip_proxied any;
  gzip_types
  text/css
  text/javascript
  text/xml
  application/javascript
  application/json
  text/json;
```

Vue Storefront SSR responses contain the full markup and JSON objects included for speeding up the first page view. Unfortunately, with significant JS bundle sizes, it can generate a significant network load. We're optimizing it by using gzip compression server-side.

```
location / {
  proxy_pass http://localhost:3000/;
}
```

We're using [`proxy_pass`](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass) from the `ngx_http_proxy_module` to pass content from the Vue Storefront node.js server. The content should be available under ___https://prod.vuestorefront.io/___ according to the configuration.

```
location /assets/ {
  proxy_pass http://localhost:3000/assets/;
}
```
It just works the same way with sub directories too.

```
location /api/ {
  proxy_pass http://localhost:8080/api/;
}
```

The next proxy section is used for serving the API. It's a proxy to [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api) app running on `8080` port (default config). API will be available under ___https://prod.vuestorefront.io/api___

```
location /img/ {
  proxy_pass http://localhost:8080/img/;
}
```

The last proxy is used for serving product images. It's a proxy to the [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api) app running on `8080` port (default config). Images will be available under ___https://prod.vuestorefront.io/img___

#### Apache2 configuration

In case you are already using the apache2 web server in your environment as well and can't (or don't want) to use NGINX, you can also set up apache2 as a reverse proxy instead of NGINX. This is done by adding this block to your apache2 virtual host.

```
ProxyRequests off

ProxyPass /api/ http://localhost:8080/api/
ProxyPassReverse /api http://localhost:8080/api/

ProxyPass /img/ http://localhost:8080/img/
ProxyPassReverse /img http://localhost:8080/img/

ProxyPass /assets/ http://localhost:3000/assets/
ProxyPassReverse /assets http://localhost:3000/assets/

ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/
```

You also need to enable [mod_proxy](https://httpd.apache.org/docs/current/mod/mod_proxy.html) for this.

### Vue Storefront and Vue Storefront API

After you have the NGINX set up, you should get a `502 error` when accessing the https://prod.vuestorefront.io. This is totally fine! We just missed the most important step, which is running backend services that will power up our installation. Now NGINX is trying to connect to `localhost:3000` for `vue-storefront` and `localhost:8080` for `vue-storefront-api` without any success.

We created a Linux user called `vuestorefront` and go to `/home/www/vuestorefront` which is our home directory.

You need to clone the `vue-storefront` and the `vue-storefront-api` repos accordingly with the following commands:

```bash
su vuestorefront
cd /home/www/vuestorefront
git clone https://github.com/DivanteLtd/vue-storefront.git
git clone https://github.com/DivanteLtd/vue-storefront-api.git
```

Then, you will need to install the required node packages:

```bash
cd /home/www/vuestorefront/vue-storefront-api
yarn install
```

... and ...

```bash
cd /home/www/vuestorefront/vue-storefront
yarn install
```

It may take a few minutes. The phantomjs dependency requires bzip2 to be installed. Once the modules are installed, we can set configuration files for both services.

#### Vue Storefront configuration

The full configuration files are available here to download: [vue-storefront](https://github.com/DivanteLtd/vue-storefront/blob/develop/docs/guide/installation/vue-storefront/config) and [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront/blob/develop/docs/guide/installation/vue-storefront-api/config).

Please create the `vue-storefront-api/config/local.json` and `vue-storefront/config/local.json` files accordingly by copying default.json into local.json by using `cp` command:
```bash
cp /home/www/vuestorefront/vue-storefront-api/config/default.json /home/www/vuestorefront/vue-storefront-api/config/local.json
```

...and ...
```bash
cp /home/www/vuestorefront/vue-storefront/config/default.json /home/www/vuestorefront/vue-storefront/config/local.json
```

Please find the key sections of the `vue-storefront/config/local.json` file described in below:

```json
"elasticsearch": {
    "httpAuth": "",
    "host": "https://prod.vuestorefront.io/api/catalog",
    "index": "vue_storefront_catalog"
},
"storeViews": {
    "mapStoreUrlsFor": [
        "de",
        "it"
    ],
    "multistore": true,
    "de": {
        "elasticsearch": {
            "httpAuth": "",
            "host": "https://prod.vuestorefront.io/api/catalog",
            "index": "vue_storefront_catalog_de"
        }
    },
    "it": {
        "elasticsearch": {
            "httpAuth": "",
            "host": "https://prod.vuestorefront.io/api/catalog",
            "index": "vue_storefront_catalog_it"
        }
    }
},
```

We're setting up the product's endpoint to https://prod.vuestorefront.io/api/catalog (please use your domain accordingly of course). As you may notice, the `/api` url is proxied by the NGINX to `localhost:8080` - our `vue-storefront-api` instance.

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

There are 27 more instances of `prod.vuestorefront.io` to be replaced with your production URL address in this file. Please just do so :)

If you want to see how the local.json should look like after your modifications, the configs we prepared for `prod.vuestorefront.io` are available under:

[vue-storefront local.json](https://raw.githubusercontent.com/DivanteLtd/vue-storefront/develop/docs/guide/installation/vue-storefront-api/config/local.json)

[vue-storefront-api local.json](https://raw.githubusercontent.com/DivanteLtd/vue-storefront/develop/docs/guide/installation/vue-storefront/config/local.json)

#### Vue Storefront API configuration

The [provided vue-storefront-api configuration](https://github.com/DivanteLtd/vue-storefront/blob/develop/docs/guide/installation/vue-storefront-api/config) requires almost no changes.

The only lines you need to alter are:

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
}
```

You should put here the `allowedHosts` for the _imageable_ node to download the product images. The domain name points to the Magento 2 instance where images are sourced. In this example, Magento 2 is running under **http://demo-magento2.vuestorefront.io**.

 #### Using your own Magento 2 instance

 In this case, you'll have to update `magento2` config node with the correct hostname in the vue-storefront-api config file. To get all necessary Magento 2 API data for the `api` node, navigate to SYSTEM -> Extensions -> Integrations in the Magento 2 Admin.
node, navigate to SYSTEM -> Extensions -> Integrations in the Magento 2 Admin.

- Click Add New Integration
- Check the necessary permissions (check Catalog, Sales, My Account, and Carts on the API Permissions tab )
- Click Activate
- Copy necessary keys, secrets, and tokens into the api section of vue-storefront-api config

#### Build VS

Before we can run Vue Storefront and Vue Storefront API, we should build it in production mode. To do so, please execute the following commands:

```bash
cd /home/www/vuestorefront/vue-storefront/
yarn build
```

```bash
cd /home/www/vuestorefront/vue-storefront-api/
yarn build
```

#### Data import

Vue Storefront needs to have some data in the Elasticsearch to properly display products and categories. Of course, you can install [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) and configure the data pump to synchronize and update the Elasticsearch index whenever data is being changed in Magento. For the purpose of this tutorial, we'll just restore the data from the JSON file.

You can easily dump your current VS index using the following command (your local installation):

```bash
cd vue-storefront-api
rm var/catalog.json
yarn dump
```

Now in the `var/catalog.json` you have your current database dump. Please transfer this file to the server—for example, using the following ssh command:

```bash
ssh vuestorefront@prod.vuestorefront.io rm ~/vue-storefront-api/var/catalog.json
scp vue-storefront-api/var/catalog.json vuestorefront@prod.vuestorefront.io:~/vue-storefront-api/var/catalog.json
```

Then, after logging in to your `prod.vuestorefront.io` server as a `vuestorefront`, you can run the following command to import the data:

```bash
cd vue-storefront-api
yarn db new
yarn restore2main
yarn db rebuild
```

#### Running the Vue Storefront and Vue Storefront API

After everything set, you can just start the `vue-storefront` and `vue-storefront-api`:

```bash
cd vue-storefront-api
yarn start
cd vue-storefront
yarn start
```

Both applications use [`PM2` process manager](https://pm2.keymetrics.io/docs/usage/process-management/) in production mode (`start` commands) to manage and respawn the node.js processes when needed.

## Cache Strategies

### Varnish cache for VSF
_Vue Storefront_ has multiple layers of cache, and the forefront cache is _Varnish_ which serves a request just as fast as a static HTML page once it's hit. You can install it from [here](https://github.com/new-fantastic/vsf-cache-varnish).

### Vue Storefront Proxy
_Vue Storefront_ can be set up with [OpenResty](http://openresty.org/en/) based reverse proxy serving cached pages from Redis without Vue StoreFront (VSF or VSF API) calls, using LUA. [Here](https://github.com/ClickAndMortar/docker/tree/master/vue-storefront/proxy) is the github repo.

## Production setup - using Docker / Kubernetes

The `/kubernetes/*.yaml` files in the project are only useful for local development and can't be used as templates for production because they assume that most of the folders exist on the host, which they probably won't in production.

We document here how they can be translated to production configs. We haven't given you actual configs because how you run your Kubernetes cluster is determined by your use-case and we don't think it would be healthy to provide a one-size-fits-all solution.

In our example we will assume that nothing needs to be persisted beyond the lifetime of the pod and therefore we assume that `dist` and `var` are emptyDir volumes and that we don't actually need any extra persistence volumes.

Finally in horizontal scaling, when running `yarn migrate` and `yarn dump`, you can `kubectl exec -it <podname> /bin/sh` to one pod - it is irrelevant that other pods exist because Elasticstore is the persistence and the json files in `var` are just ephemeral and therefore other pods & containers don't need to know about them...

Finally we recommend that you produce your own Dockerfile for each project image. You should base these on our existing Dockerfiles and use them to copy folders into the image. This will be cheaper to host than running read only volumes. We will document here how the Dockerfile should be written.

### New to Docker Containers
Here are a couple of places to learn about docker.
1. [Docker Official documentation](https://docs.docker.com/)
2. [Getting Started Guide](https://docker-curriculum.com/)

### New to Kubernetes?
Here are a few places to learn to get started with the general usage of kubernetes.
1. [Kubernetes Official Getting Started Guide](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
1. [kubernetes Official documentation](https://kubernetes.io/docs/home/)
2. [Digital Ocean Introduction](https://www.digitalocean.com/community/tutorials/an-introduction-to-kubernetes)
3. [Digital Ocean Tutorials](https://www.digitalocean.com/community/tutorials?q=kubernetes)

### Prerequisites
Vue Storefront requires Elasticsearch and the Redis server.

Often it is considered advisable to keep data out of Kubernetes. it is important to remember that pods (the database application containers) are transient and have to expect application restarts and failovers as the risk of these happening is higher. Also, how you perform backups, scaling, tuning, etc. is different because of the abstraction of containerization. You therefore may prefer to use managed solutions or to host Elasticsearch and/or Redis on bare metal or VM.

However it is perfectly possible to use Kubernetes without too much trouble - Redis is ephemeral data, and the Elasticsearch index can be easily rebuilt. So with that all having been said lets begin.

#### Elasticsearch
For our Elasticsearch cluster we will need to persist data, and in an ideal world we would have the `accessmode` set to `ReadWriteMany`. An NFS server at first glance seems a tempting solution for this use-case. However, the [official documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html#_use_faster_hardware) of elasticsearch says:

> Always use local storage, remote filesystems such as NFS or SMB should be avoided.

Another route would be to use `ReadWriteOnce` and `nodeaffinity` to keep each instance of the elasticsearch cluster on its own node and `Taints` to discourage other pods using the node and stealing resources.

Many cloud service providers back their ReadWriteOnce Persistent Storage with virtualized solutions.
However, this time the documentation tells us:

>  Also beware of virtualized storage such as Amazon’s Elastic Block Storage.

Therefore Elasticsearch seems to suggest that we don't naively store data into a persistent volume where we would be held hostage by latency.

We could instead snapshot our data into our persistent storage whilst allowing elastic search to use local storage for minute by minute working and we would be safe to do this because Elasticsearch isn't our source of truth, our backend application is.

But, the good news is that with the release of [Elastic Cloud on Kubernetes](https://www.elastic.co/cloud/?ultron=EL-B-Stack-Trials-EMEA-UK-Exact&gambit=Elasticsearch-Cloud&blade=adwords-s&thor=elastic%20cloud%20on%20kubernetes) our architecture has become much easier than it was previously. ECK is now Kubernetes aware which takes away most of the above problems.

ECK can be either run as SaaS or you can install in Kubernetes yourself as we do here.

#### Elastic Cloud on Kubernetes






### ReadWriteOnce

##### Configmap
##### Deployment
##### Service
---
#### Redis
##### Configmap
##### Deployment
##### Service
---

### Nginx Ingress
In Kubernetes, an Ingress is an object that allows access to your Kubernetes services from outside the Kubernetes cluster. You configure access by creating a collection of rules that define which inbound connections reach which services.

Again we decided to use NGINX because as we said before it gives you a lot of flexibility regarding the SSL, gzip compression, URL routing, and other techniques to be configured without additional hassle.

#### Configmap
#### Deployment
#### Service
---
### vue-storefront
#### Configmap
#### Deployment
#### Service
---
### vue-storefront-api
#### Configmap
#### Deployment
#### Service
---
### Api Connectors (bridges)
#### Configmap
#### Deployment
#### Service
---
#### Varnish cache for VSF
Vue Storefront has multiple layers of cache, and the forefront cache is Varnish which serves a request just as fast as a static HTML page once it's hit. You can install it from here.

##### Configmap
##### Deployment
##### Service
