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
The Vue Storefront application uses the node-config npm module to manage configuration files. Configuration is stored in the /config directory within two JSON files:

default.json is a configuration file provided along with the core Vue Storefront code and updated with any new release of Vue Storefront. It contains the default values only and therefore it shouldn't be modified within your specific Vue Storefront instance.

local.json is the second configuration file which is .gitignore'd from the repository. This is the place where you should store all instance-specific configuration variables.

:::tip NOTENOTE

Please not that the config is bundled into JavaScript files that are returned to the user's browser. Please NEVER PUT ANY SENSITIVE INFORMATION into the config file of vue-storefront. If your application requires some authorization / tokens /etc - please store them and access via dedicated vue-storefront-api or storefront-api extension that will prevent these sensitive information from being returned to the users.
:::

The structure of these files is exactly the same! Vue Storefront does kind of Object.assign(default, local) (but with the deep-merge). This means that the local.json overrides the default.json properties.

The configuration files we produce in this tutorial are available here to download: [vue-storefront](https://github.com/DivanteLtd/vue-storefront/blob/develop/docs/guide/installation/vue-storefront/config) and [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront/blob/develop/docs/guide/installation/vue-storefront-api/config).

Please create the `vue-storefront-api/config/local.json` and `vue-storefront/config/local.json` files accordingly by either adapting the `local.json` that you have used in development or by copying and editing default.json into local.json by using `cp` command. If you do copy in the default.json config I would suggest you delete sections that you haven't edited as this will make it clearer what has actually been changed.

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

For the remainder of this documentation we assume that are familiar with kubectl. That you have a Kubernetes cluster set up and that you know how to connect and authenticate yourself.

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

Whilst enabling TLS on the HTTP layer is not required, it would be mad not to. I have observed a ransomware attack on an unsecured Elasticsearch cluster within 1 month of it going up. It was a dev instance so not a problem but it demonstrates the dangers of not installing end-to-end security to protect the data, in particular to protect username/password information from being eavesdropped, and compromising the cluster.

But, the good news is that with the release of the [Elastic Cloud on Kubernetes](https://www.elastic.co/elastic-cloud-kubernetes) operator our architecture has become much easier than it was previously. ECK is now Kubernetes aware which takes away most of the above problems.

:::tip NOTE
[magento1-vsbridge](https://github.com/DivanteLtd/magento1-vsbridge) is not compatible with ElasticSearch 7 therefore you will need to tie yourself to 5.6. Because ECK is based on ElasticSearch 7, you would be better advised to run your ElasticSearch server on BareMetal or a VM, you could struggle to set up ES5.6 in Kubernetes yourself but "there be dragons there, beware!!"
:::

An Operator extends Kubernetes to automate the management of the entire life cycle of a particular application. They package for distributing applications on Kubernetes, and they monitor, maintain, recover, and upgrade the software they deploy.

ECK can be either [run as SaaS](https://www.elastic.co/cloud/?ultron=EL-B-Stack-Trials-EMEA-UK-Exact&gambit=Elasticsearch-Cloud&blade=adwords-s&thor=elastic%20cloud%20on%20kubernetes) or you can install in Kubernetes yourself as we do as according to the official [getting started](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-quickstart.html) guide.

#### Elastic Cloud on Kubernetes

Custom resources are extensions of the Kubernetes API that are not necessarily available in a default Kubernetes installation. They represents a customization of a particular Kubernetes installation.

First we install custom resource definitions and the operator with its RBAC rules (Role Based Access Control):

#### Deploy ECK in your Kubernetes cluster:
```
kubectl apply -f https://download.elastic.co/downloads/eck/1.2.1/all-in-one.yaml
```
Check it's health by looking at the Operator's logs:
```
kubectl -n elastic-system logs -f statefulset.apps/elastic-operator
```
#### Depoy an Elasticsearch Cluster
Read the quickstart instructions [found here](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-deploy-elasticsearch.html#k8s-deploy-elasticsearch).

When you understand what you are doing run:
```
cat <<EOF | kubectl apply -f -
apiVersion: elasticsearch.k8s.elastic.co/v1
kind: Elasticsearch
metadata:
  name: quickstart
spec:
  version: 7.9.1
  nodeSets:
  - name: default
    count: 1
    config:
      node.master: true
      node.data: true
      node.ingest: true
      node.store.allow_mmap: false
EOF
```
As per the guide run:
```
kubectl get elasticsearch
```
And wait for the `health` to be green and the `phase` to be ready.

A default user named elastic is automatically created with the password stored in a Kubernetes secret:

```
PASSWORD=$(kubectl get secret quickstart-es-elastic-user -o go-template='{{.data.elastic | base64decode}}')
```
From your local workstation, use the following command in a separate terminal:

```
kubectl port-forward service/quickstart-es-http 9200
```
Then from your original terminal
```
curl -u "elastic:$PASSWORD" -k "https://localhost:9200"curl -u "elastic:$PASSWORD" -k "https://localhost:9200"
```
You should see:
```
{
  "name" : "quickstart-es-default-0",
  "cluster_name" : "quickstart",
  "cluster_uuid" : "XqWg0xIiRmmEBg4NMhnYPg",
  "version" : {...},
  "tagline" : "You Know, for Search"
}
```
Note:
Disabling certificate verification using the -k flag is not recommended and should be used for testing purposes only. See: [Setup your own certificate](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-tls-certificates.html#k8s-setting-up-your-own-certificate)

Optionally you can deploy an kibana instance to interact with the cluster by following [these instructions.](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-deploy-kibana.html)

#### Installing a Certificate
By default ECK is installed with a self-signed certificate. However, to avoid the error `self signed certificate in certificate chain` you will need to install a trusted cert on the http layer. Instructions can be [found here](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-tls-certificates.html#k8s-setting-up-your-own-certificate). I've summarised below for your convenience.

#### Setup your own certificate
You can bring your own certificate to configure TLS to ensure that communication between HTTP clients and the cluster is encrypted.

Create a Kubernetes secret with:

* `ca.crt`: CA certificate (optional if tls.crt was issued by a well-known CA).
* `tls.crt`: the certificate.
* `tls.key`: the private key to the first certificate in the certificate chain.

```
ubectl create secret generic my-cert --from-file=ca.crt=tls.crt --from-file=tls.crt=tls.crt --from-file=tls.key=tls.key
```

Then you just have to reference the secret name in the http.tls.certificate section of the resource manifest.

```
spec:
  http:
    tls:
      certificate:
        secretName: my-cert
```

---
### Redis
With redis there are two possible patterns that we could employ.

1. The `sidecar` pattern to package and deploy each nodejs container alongside a redis container as a single unit inside a pod, enabling them to scale as a&nbsp;unit.
1. The Redis `Master/Slave` pattern where we horizontally and vertically scale the Redis architecture separately to the nodejs containers.


#### Sidecar
I am discounting the sidecar pattern as inappropriate for most VSF use-cases. My thinking is that a cache should be available to all containers not just the container that created&nbsp;it.

#### Redis Master and Slave

In the [Kubernetes documentation](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/) There is a useful example which includes the following components (alongside a PHP guestbook which we will ignore):

* A single-instance Redis master to store writes
* Multiple replicated Redis instances to serve reads

[application/guestbook/redis-master-deployment.yaml](application/guestbook/redis-master-deployment.yaml )

```
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: redis-master
  labels:
    app: redis
spec:
  selector:
    matchLabels:
      app: redis
      role: master
      tier: backend
  replicas: 1
  template:
    metadata:
      labels:
        app: redis
        role: master
        tier: backend
    spec:
      containers:
      - name: master
        image: k8s.gcr.io/redis:e2e  # or just image: redis
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        ports:
        - containerPort: 6379
```
To apply the above run:
```
kubectl apply -f https://k8s.io/examples/application/guestbook/redis-master-deployment.yaml
```
To check the health of the deployment run:
```
kubectl get pods
```
One of the pods should resemble:
```
NAME                            READY     STATUS    RESTARTS   AGE
...
redis-master-1068406935-3lswp   1/1       Running   0          28s
...
```
#### Creating the Redis Master Service
The application needs to communicate to the Redis master to write its data. You need to apply a Service to proxy the traffic to the Redis master Pod. A Service defines a policy to access the Pods.
```
apiVersion: v1
kind: Service
metadata:
  name: redis-master
  labels:
    app: redis
    role: master
    tier: backend
spec:
  ports:
  - port: 6379
    targetPort: 6379
  selector:
    app: redis
    role: master
    tier: backend
```
Apply the Redis Master Service from the following redis-master-service.yaml file:
```
kubectl apply -f https://k8s.io/examples/application/guestbook/redis-master-service.yaml
```
#### Start up the Redis Slaves
Although the Redis master is a single pod, you can make it highly available by adding a Redis slave.
Vue Storefront and Vue Storefront don't presently understand the concept of readonly slaves. So presently you can't horizontally
Scale Redis. The slave allows high availability because if the master fails then the slave will be promoted to master by re-election until the kubernetes has successfully brought the master back online. Personally I like to have 2 slaves for an extra layer of redundancy.

```
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: redis-slave
  labels:
    app: redis
spec:
  selector:
    matchLabels:
      app: redis
      role: slave
      tier: backend
  replicas: 2
  template:
    metadata:
      labels:
        app: redis
        role: slave
        tier: backend
    spec:
      containers:
      - name: slave
        image: gcr.io/google_samples/gb-redisslave:v3
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
        - name: GET_HOSTS_FROM
          value: dns
          # Using `GET_HOSTS_FROM=dns` requires your cluster to
          # provide a dns service. As of Kubernetes 1.3, DNS is a built-in
          # service launched automatically. However, if the cluster you are using
          # does not have a built-in DNS service, you can instead
          # access an environment variable to find the master
          # service's host. To do so, comment out the 'value: dns' line above, and
          # uncomment the line below:
          # value: env
        ports:
        - containerPort: 6379
```
Apply the Redis Slave Deployment from the redis-slave-deployment.yaml file:
```
kubectl apply -f https://k8s.io/examples/application/guestbook/redis-slave-deployment.yaml
```
Again check the pods' health:
```
kubectl get pods
```
The response should be similar to this:
```
NAME                            READY     STATUS              RESTARTS   AGE
...
redis-master-1068406935-3lswp   1/1       Running             0          1m
redis-slave-2005841000-fpvqc    0/1       ContainerCreating   0          6s
redis-slave-2005841000-phfv9    0/1       ContainerCreating   0          6s
...
```
#### Creating the Redis Slave Service
The application needs to communicate to Redis slaves to read data. To make the Redis slaves discoverable, you need to set up a Service. A Service provides transparent load balancing to a set of Pods.
```
apiVersion: v1
kind: Service
metadata:
  name: redis-slave
  labels:
    app: redis
    role: slave
    tier: backend
spec:
  ports:
  - port: 6379
  selector:
    app: redis
    role: slave
    tier: backend
```
Apply the Redis Slave Service from the following redis-slave-service.yaml file:

```
kubectl apply -f https://k8s.io/examples/application/guestbook/redis-slave-service.yaml
```
Query the list of Services to verify that the Redis slave service is running:

```
kubectl get services
```
The response should be similar to this:
```
NAME           TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
...
kubernetes     ClusterIP   10.0.0.1     <none>        443/TCP    2m
redis-master   ClusterIP   10.0.0.151   <none>        6379/TCP   1m
redis-slave    ClusterIP   10.0.0.223   <none>        6379/TCP   6s
...
```
### Kubernetes DNS for Services
Assume a Service named `foo` in the Kubernetes namespace `bar`. A Pod running in namespace bar can look up this service by simply doing a DNS query for `foo`. A Pod running in namespace `quux` can look up this service by doing a DNS query for `foo.bar`. For simplicity the examples below will assume you are in the default namespace and will just use the serviceName.

#### Vue Storefront configuration
The Vue Storefront application uses the node-config npm module to manage configuration files. Configuration is stored in the /config directory within two JSON files:

default.json is a configuration file provided along with the core Vue Storefront code and updated with any new release of Vue Storefront. It contains the default values only and therefore it shouldn't be modified within your specific Vue Storefront instance.

local.json is the second configuration file which is .gitignore'd from the repository. This is the place where you should store all instance-specific configuration variables.

:::tip NOTENOTE

Please not that the config is bundled into JavaScript files that are returned to the user's browser. Please NEVER PUT ANY SENSITIVE INFORMATION into the config file of vue-storefront. If your application requires some authorization / tokens /etc - please store them and access via dedicated vue-storefront-api or storefront-api extension that will prevent these sensitive information from being returned to the users.
:::

The structure of these files is exactly the same! Vue Storefront does kind of Object.assign(default, local) (but with the deep-merge). This means that the local.json overrides the default.json properties.

The configuration files we produce in this tutorial are available here to download: [vue-storefront](https://github.com/DivanteLtd/vue-storefront/blob/develop/docs/guide/installation/vue-storefront/config) and [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront/blob/develop/docs/guide/installation/vue-storefront-api/config).

Please create the `vue-storefront/docker/production/config/local.json` file by either adapting the `local.json` that you have used in development or by copying and editing default.json into local.json by using `cp` command. If you do copy in the default.json config I would suggest you delete sections that you haven't edited as this will make it clearer what has actually been changed.

```bash
cd vue-storefront
mkdir -p docker/production/configs
cp config/local.json docker/production/config/local.json
```

Please find the key sections of the `vue-storefront/config/local.json` file described in below:

There are 27 more instances of `prod.vuestorefront.io` to be replaced with your production endpoints addresses. These can be anything resolvable to an api instance i.e. external urls or even IP addresses. Allowing you to have different API instances responding to different endpoints. However, because we are letting the Nginx ingress handle the load-balancing we will use relative URLs. To do this we will need to let `vue-storefront` know our api URL. Edit the following to config.

```
"api": {
  "url": "http://yourproduction.url"
}
"elasticsearch": {
    "httpAuth": "",
    "host": "/api/catalog",
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
            "host": "/api/catalog",
            "index": "vue_storefront_catalog_de"
        }
    },
    "it": {
        "elasticsearch": {
            "httpAuth": "",
            "host": "/api/catalog",
            "index": "vue_storefront_catalog_it"
        }
    }
},
```

We're setting up the product's endpoint to https://yourproduction.url/api/catalog. As you may notice, the `/api` url is proxied by the NGINX to our `vue-storefront-api` instance.

```json
"cart": {
      "synchronize": true,
      "synchronize_totals": true,
      "create_endpoint": "/api/cart/create?token={{token}}",
      "updateitem_endpoint": "/api/cart/update?token={{token}}&cartId={{cartId}}",
      "deleteitem_endpoint": "/api/cart/delete?token={{token}}&cartId={{cartId}}",
      "pull_endpoint": "/api/cart/pull?token={{token}}&cartId={{cartId}}",
      "totals_endpoint": "/api/cart/totals?token={{token}}&cartId={{cartId}}",
      "paymentmethods_endpoint": "/api/cart/payment-methods?token={{token}}&cartId={{cartId}}",
      "shippingmethods_endpoint": "/api/cart/shipping-methods?token={{token}}&cartId={{cartId}}",
      "shippinginfo_endpoint": "/api/cart/shipping-information?token={{token}}&cartId={{cartId}}",
      "collecttotals_endpoint": "/api/cart/collect-totals?token={{token}}&cartId={{cartId}}",
      "deletecoupon_endpoint": "/api/cart/delete-coupon?token={{token}}&cartId={{cartId}}",
      "applycoupon_endpoint": "/api/cart/apply-coupon?token={{token}}&cartId={{cartId}}&coupon={{coupon}}"
  },
```
In the server section we bind the host to `0.0.0.0` and set the invalidateCacheForwardUrl to our production URL. `invalidateCacheKey` is another config value to pay attention to and you should, [read more here](https://docs.vuestorefront.io/guide/basics/ssr-cache.html#cli-cache-clear)
```
  "server": {
    "host": "0.0.0.0",
    "port": 3000,
    "protocol": "http",
    "api": "api",
    "useOutputCacheTagging": true,
    "useOutputCache": true,
    "outputCacheDefaultTtl": 86400,
    "invalidateCacheKey": "aeSu7aip",
    "invalidateCacheForwarding": false,
    "invalidateCacheForwardUrl": "http://yourproduction.url/invalidate?key=aeSu7aip&tag=",      
  },
  ```
  We set up a master and slaves, because, as previously mentioned, the slaves simply provide failover redundancy. Here we will point  at the master using its `serviceName` which will be resolved by Kubernetes' DNS.  (Remember to preface it with a namespace if you are resolving between namespaces).
  ```
  "redis": {
    "host": "redis-master",
    "port": 6379,
    "db": 0
  },
```

#### Using your own Magento 2 instance

 In this case, you'll have to update `magento2` config node with the correct hostname in the vue-storefront-api config file. To get all necessary Magento 2 API data for the `api` node, navigate to SYSTEM -> Extensions -> Integrations in the Magento 2 Admin.
node, navigate to SYSTEM -> Extensions -> Integrations in the Magento 2 Admin.

- Click Add New Integration
- Check the necessary permissions (check Catalog, Sales, My Account, and Carts on the API Permissions tab )
- Click Activate
- Copy necessary keys, secrets, and tokens into the api section of vue-storefront-api config

### vue-storefront Docker Image
As I mentioned earlier, we recommend that you base your own Dockerfile on ours in order to copy the relevant directories into kubernetes rather than mounting them as volumes.

Becuase of this I would avoid using a git clone that you have been using for development to build your image for production, afterall we don't want to accidentally include development tools. Instead clone to a fresh location then install and build with yarn.

```
git clone git@github.com:your-org/vue-storefront.git
cd vue-storefront
git submodule update --init --recursive
```
```
yarn install && yarn build
```
Now lets create the Dockerfile, first lets copy the existing one to a new location.

```
mkdir docker/production && cp docker/vue-storefront/* docker/production/
```

Edit the Dockerfile to copy the needed folders into the image.
```
FROM node:10

ENV NODE_CONFIG_ENV=docker PM2_ARGS=--no-daemon BIND_HOST=0.0.0.0 VS_ENV=prod

WORKDIR /var/www

COPY . .

RUN cp -f ./docker/production/ecosystem.json ./ecosystem.json
RUN cp -r ./docker/production/config/local.json ./config/local.json

# Should be yarn install --production
RUN apt update && apt install -y git \
  && yarn install \
  && yarn build

COPY dev/docker/vue-storefront.sh /usr/local/bin/
RUN chmod a+x /usr/local/bin/vue-storefront.sh

ENTRYPOINT ["vue-storefront.sh"]
```
#### Create a new ecosystem.json
You might have noticed that we are copying a new `./docker/production/ecosystem.json` into the image. Create that file now.
```
{
  "apps": [
    {
      "name": "server",
      "max_memory_restart": "1G",
      "instances": "4",
      "exec_mode": "cluster",
      "env": {
        "TS_NODE_PROJECT": "tsconfig-build.json",
        "NODE_ENV": "production"
      },
      "interpreter": "./node_modules/.bin/ts-node",
      "script": "./core/scripts/server.ts",
      "log_date_format": "YYYY-MM-DD HH:mm:ss",
      "ignore_watch": [
        "core/build/config.json",
        "node_modules"
      ]
    }
  ]
}
```

Notice that I haven't based the image on `divante/vue-storefront`. To guarantee a base image that will work with your project you should base your Dockerfile on the one source controlled within the project, not an image from hub that may be stale.

#### Building an image kubernetes can pull&nbsp;from.

You will need a repository to host your image.  [hub.docker.com](https://hub.docker.com) is perhaps the best known (documentation can be found [here](https://docs.docker.com/docker-hub/builds/)).

However, I would advise that the most convenient registry is [Github Packages](https://docs.github.com/en/packages). Therefore, I use it in the examples below.

#### Build and Push a Package to Github
This is a three stage process, build, authenticate push.
##### 1. Build the image
When you issue a docker build command, the current working directory is called the [build context](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#understand-build-context). By default, the Dockerfile is assumed to be located here, but you can specify a different location with the file flag (-f).

Regardless of where the Dockerfile actually lives, all recursive contents of files and directories in the current directory are sent to the Docker daemon as the build context.

Run the following command from the root directory of the vue-storefront project. The trailing dot in the command is referring to the present directory and thus the build context.

```
docker build -f docker/production/Dockerfile .
```
If the build is successful you will be presented with an __*image id*__.

```
...
Step 22/22 : CMD ["vue-storefront.sh"]
 ---> Running in cfec4ff702f1
Removing intermediate container cfec4ff702f1
 ---> 5e556dc7047c
Successfully built 5e556dc7047c
```
In the above example `5e556dc7047c` is your __*image id*__.

```
docker images | grep 5e556dc7047c
```
Will output details of that image, and we will use that ID to create a tag so that we can push to Packages.

##### 2. Tag the image

```
docker tag IMAGE_ID docker.pkg.github.com/OWNER/REPOSITORY/IMAGE_NAME:VERSION
```

For example:

```
docker tag 5e556dc7047c docker.pkg.github.com/<your-company>/vue-storefront/vue-storefront:0.0.1
```
Using the Docker image ID, tag the docker image, replacing OWNER with the name of the user or organisation account that owns the repository, REPOSITORY with the name of the repository containing your project, IMAGE_NAME with name of the package or image, and VERSION with package version at build time.

##### 3. Authenticating with a personal access token
<a name="personalAccess"></a>
You must use a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the appropriate scopes to publish and install packages in GitHub Packages.

You can authenticate to GitHub Packages with Docker using the docker login command.

To keep your credentials secure, we recommend you save your personal access token in a local file on your computer and use Docker's --password-stdin flag, which reads your token from a local file.

```
$ cat ~/TOKEN.txt | docker login https://docker.pkg.github.com -u USERNAME --password-stdin
```

##### 4. Push the image
```
docker push docker.pkg.github.com/<your-company>/vue-storefront/vue-storefront:0.0.1
```

### Configure, Build, Tag and Push vue-storefront-api

#### Vue Storefront API configuration

Please create the `vue-storefront-api/docker/production/config/local.json` file by either adapting the `local.json` that you have used in development or by copying and editing default.json into local.json by using `cp` command. If you do copy in the default.json config I would suggest you delete sections that you haven't edited as this will make it clearer what has actually been changed.


```bash
cd vue-storefront-api
mkdir -p docker/production/config
cp config/default.json docker/production/config/local.json
```

The vue-storefront-api configuration requires almost no changes.

The only lines that you **need** to alter are:

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
            ".*yourproduction.url",
            ".*vuestorefront.io"
        ]
    },
    "keepDownloads": true,
    "maxDownloadCacheSize": 1000,
    "tmpPathRoot": "/tmp"
},
```

You should put here the `allowedHosts` for the _imageable_ node to download the
product images. The domain name points to the instance where images are sourced.
In this example, Magento 2 is running under **http://demo-magento2.vuestorefront.io**.


###Elasticsearch
You point elasticsearch `host:` at the `ServiceName` of your elasticsearch instance. which will be resolved by Kubernetes' DNS.  (Remember to preface it with a namespace if you are resolving between namespaces).

Elasticsearch needs to be secured so we will need to pass the credentials to the API.
The username that ES is expecting is `elastic`. You can get the password for elasticsearch by running.

```
PASSWORD=$(kubectl get secret quickstart-es-elastic-user -o go-template='{{.data.elastic | base64decode}}')
```

:::tip NOTE
You should not naively include passwords in anything you are going to source control,
I suggest you create a environmental variable that you pass to docker and get Node to set later.
As this requires code changes I leave that to user, for simplicity we are setting the password in clear text.
***DON'T do this !!!***
:::

```
"elasticsearch": {
    "host": "quickstart-es-http",
    "port": "9200",
    "user": "elastic",
    "password": "PASSWORD"
    "indices": [
        "vue_storefront_catalog",
        "vue_storefront_catalog_it",
        "vue_storefront_catalog_de"
    ]
}
```

### Redis
We set up a master and slaves, because, as previously mentioned, the slaves simply provide failover redundancy. Here we will point  at the master using its `serviceName` which will be resolved by Kubernetes' DNS.  (Remember to preface it with a namespace if you are resolving between namespaces).
```
"redis": {
  "host": "redis-master",
  "port": 6379,
  "db": 0,
  "auth": false
},
```

#### Create a production dockerfile:
```
mkdir docker/production && cp docker/vue-storefront-api/* docker/production/
```
Edit the Dockerfile to:
1. copy the needed folders and config files into the image,
2. install imagemagick.
3. change the path at line 16 to copy in our version  of the entrypoint vue-storefront-api.sh at line 16.

```
FROM node:10-alpine

ENV VS_ENV prod

WORKDIR /var/www

RUN apk add --no-cache curl git

COPY package.json ./
COPY yarn.lock ./

RUN apk add --no-cache --virtual .build-deps ca-certificates wget python make g++ && \
    yarn install --no-cache && \
    apk del .build-deps

COPY docker/production/vue-storefront-api.sh /usr/local/bin/

RUN apk update && \
    apk add git && \
    apk add imagemagick && \
    rm -rf /var/cache/apk/*

COPY config /var/www/config
COPY docker/production/config/local.json /var/www/config/local.js
COPY migrations /var/www/migrations
COPY scripts /var/www/scripts
COPY src /var/www/src

COPY ecosystem.json /var/www/ecosystem.json
COPY package.json /var/www/package.json
COPY babel.config.js /var/www/babel.config.js
COPY tsconfig.json /var/www/tsconfig.json
COPY nodemon.json /var/www/nodemon.json

CMD ["vue-storefront-api.sh"]
```
#### Build the image
```
docker build -f docker/production/Dockerfile .
```
If the build is successful you will be presented with an __*image id*__.
##### 2. Tag the image

```
docker tag IMAGE_ID docker.pkg.github.com/OWNER/REPOSITORY/IMAGE_NAME:VERSION
```
##### 3. Authenticating with your personal access token
```
$ cat ~/TOKEN.txt | docker login https://docker.pkg.github.com -u USERNAME --password-stdin
```
[see above](#personalAccess) for fuller explanation.
##### 4. Push the image
```
docker push docker.pkg.github.com/<your-company>/vue-storefront-api/vue-storefront-api:0.0.1
```

#### Kubernetes Config for Vue-storefront
Now create a directory where you can store production Kubernetes config and copy in the existing kubernetes files.

```
mkdir -p kubernetes/production
```
Copy in the templates
```
cp kubernetes/vue* kubernetes/production/
```
#### ConfigMap
Edit `kubernetes/production/vue-storefront-configmap.yaml`
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: vue-storefront-config
data:
  NODE_CONFIG_ENV: docker
  BIND_HOST: 0.0.0.0
  PM2_ARGS: --no-daemon
  VS_ENV: prod
```
The only change we make here it to change `VS_ENV` to `prod`.

Now apply the file.
```
kubectl apply -f kubernetes/production/vue-storefront-configmap.yaml
```
Outputs:
```
configmap/vue-storefront-config created
```
#### Secrets
You will probably have set up you git repository as private so we will need to tell Kubernetes the credentials for pulling the images. To do this you need to create some imagePullSecrets.

Run the below replacing `yourusername`, `yourpersonalaccesstoken` & `your@email.com` with the appropriate values.

```
kubectl create secret docker-registry regcred --docker-server=docker.pkg.github.com --docker-username=yourusername --docker-password=yourpersonalaccesstoken --docker-email=your@email.com
```
Outputs:
```
secret/regcred created
```

#### Deployment
Edit `kubernetes/production/vue-storefront-deployment.yaml`
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vue-storefront
spec:
  replicas: 1
  selector:
    matchLabels:
      app: vue-storefront
  template:
    metadata:
      labels:
        app: vue-storefront
    spec:
      restartPolicy: Always
      containers:
      - name: vue-storefront
        image: docker.pkg.github.com/<your-company>/vue-storefront/vue-storefront:0.0.1
        envFrom:
        - configMapRef:
            name: vue-storefront-config
        ports:
        - containerPort: 3000
        volumeMounts:
        - mountPath: /var/www/var
          name: code
          subPath: var
        - mountPath: /var/www/dist
          name: dist
      volumes:
      - name: code
        emptyDir:
          medium: Memory
      - name: dist
        emptyDir:
          medium: Memory
      imagePullSecrets:
        - name: regcred
```
The most important change is on line 16 where you need to change the image to point at your own repo rather than that of Divante.

You should also notice that we have deleted most of the `volumeMounts` because they have been copied into your image already, and we've changed the `var` folder so that its mounted from memory.

Finally we've referenced the imagePullSecrets that we created earlier.

Now apply the file:
```
kubectl apply -f kubernetes/production/vue-storefront-deployment.yaml
```
Outputs:
```
deployment.apps/vue-storefront created
```
Now check the health of the deployment:
```
kubectl get deployments
```
Outputs:
```
NAME             READY   UP-TO-DATE   AVAILABLE   AGE
vue-storefront   1/1     1            1           96s
```
When ready is 1/1 your deployment is healthy.

#### Kubernetes Config for Vue-storefront-api
Change to the vue-storefront-api directory
```
cd ../vue-storefront-api
```
Now create a directory where you can store production Kubernetes config and copy in the existing kubernetes files.

```
mkdir -p kubernetes/production
```
Copy in the templates
```
cp kubernetes/vue* kubernetes/production/
```
Delete the volume claim as we won't be using it.
```
rm kubernetes/production/vue-storefront-api-persistent-volume-claim.yaml
```
#### ConfigMap
The Configmap `vue-storefront-api-configmap.yaml` presently contains the following code:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: vue-storefront-api-config
data:
  BIND_HOST: 0.0.0.0
  ELASTICSEARCH_HOST: elasticsearch
  ELASTICSEARCH_PORT: "9200"
  REDIS_HOST: redis
  REDIS_PORT: "6379"
  REDIS_DB: "0"
  VS_ENV: dev
```
We need change these values to point at the Elasticsearch & Redis services. We'll use kubectl to query the API service discovery to find the cluster IPs for the services we set up earlier.

To find elasticsearch run
```
$ kubectl get service quickstart-es-http
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
quickstart-es-http   ClusterIP   10.245.216.182   <none>        9200/TCP   13d
```
To find redis
```
$ kubectl get service redis-master
NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
redis-master   ClusterIP   10.245.176.214   <none>        6379/TCP   13d
```


finally we'll change `VS_ENV: dev` to `VS_ENV: prod` and set the `PM2_ARGS: --no-daemon` leaving us with the finished Configmap of:
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: vue-storefront-api-config
data:
  BIND_HOST: 0.0.0.0
  ELASTICSEARCH_HOST: 10.245.216.182
  ELASTICSEARCH_PORT: "9200"
  REDIS_HOST: 10.245.176.214
  REDIS_PORT: "6379"
  REDIS_DB: "0"
  VS_ENV: prod
  PM2_ARGS: --no-daemon
```
Apply the ConfigMap:
```
kubectl apply -f kubernetes/production/vue-storefront-api-configmap.yaml
```
Outputs:
```
configmap/vue-storefront-api-config created
```

#### Deployment
Edit `kubernetes/production/vue-storefront-api-deployment.yaml`
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vue-storefront-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: vue-storefront-api
  template:
    metadata:
      labels:
        app: vue-storefront-api
    spec:
      restartPolicy: Always
      containers:
      - name: vue-storefront-api
        image: docker.pkg.github.com/<your-company>/vue-storefront/vue-storefront:0.0.1
        envFrom:
        - configMapRef:
            name: vue-storefront-api-config
        ports:
        - containerPort: 8080
        volumeMounts:
        - mountPath: /var/www/var
          name: code
        - mountPath: /var/www/dist
          name: dist
      volumes:
      - name: code
        emptyDir:
          medium: Memory
      - name: dist
        emptyDir:
          medium: Memory
      imagePullSecrets:
        - name: regcred
```
The changes here are on line 16 which you should change to point at your repo rather than that of Divante, and add the `imagePullSecrets` to the end of the file.

Apply the file:
```
kubectl apply -f kubernetes/production/vue-storefront-api-deployment.yaml
```
Outputs:
```
deployment.apps/vue-storefront-api created
```
Check the health of the deployment:
```
kubectl get deployments
```
Outputs:
```
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
vue-storefront       0/1     1            0           12m
vue-storefront-api   0/1     1            0           2m19s
```
---
### Create the needed Services
Earlier we copied in the services configs into our production folder. And we don't
actually need to change them, so lets just apply them.

```
cd vue-storefront
kubectl apply -f kubernetes/production/vue-storefront-service.yaml
```
which give the output:
```
service/vue-storefront created
```
Now let's do the same for the api
```
kubectl apply -f kubernetes/production/vue-storefront-api-service.yaml
```
```
service/vue-storefront-api created
```
---
#### Data import

Vue Storefront needs to have some data in the Elasticsearch to properly display products and categories. Of course, you can install [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) and configure the data pump to synchronize and update the Elasticsearch index whenever data is being changed in Magento. For the purpose of this tutorial, we'll just kubernetes exec into an `vue-storefront-api` pod and restore the data from the JSON file.

You can easily dump your current VS index using the following command (your local installation):

```bash
cd vue-storefront-api
rm var/catalog.json
yarn dump
```

Now in the `var/catalog.json` you have your current database dump. Please transfer this file to the kubernetes pod for example, using the following ssh command:

```bash
kubectl cp cp vue-storefront-api/var/catalog.json vue-storefront-api-74f4766dd4-94rt4:~/vue-storefront-api/var/catalog.json
```

Then logging in to your pod, you can import the data:

```
kubectl exec -it vue-storefront-api-74f4766dd4-94rt4 -- sh
```

```bash
cd vue-storefront-api
yarn db new
yarn restore2main
yarn db rebuild
```

---

### Nginx Ingress
In Kubernetes, an Ingress is an object that allows access to your Kubernetes services from outside the Kubernetes cluster. You configure access by creating a collection of rules that define which inbound connections reach which services.

Again we decided to use NGINX as our ingress because as we said before it gives you a lot of flexibility regarding the SSL, gzip compression, URL routing, and other techniques to be configured without additional hassle.

We will set up the Kubernetes Nginx Ingress Controller using Helm and create an Ingress Resource to route traffic from your domains to the Vue StoreFront back-end services.

Once we’ve set up the Ingress, we’ll install Cert Manager to the cluster to be able to automatically provision Let’s Encrypt TLS certificates to secure the Ingresses.

Helm is a package manager for managing Kubernetes.

Helm documentation and installation instructions can be found [here](https://helm.sh/docs/intro/quickstart/).


To install the Nginx Ingress Controller to your cluster, run the following command:
```
helm install nginx-ingress stable/nginx-ingress --set controller.publishService.enabled=true
```
The output is similar to:
```
Output
NAME: nginx-ingress
LAST DEPLOYED: Fri Apr  3 17:39:05 2020
NAMESPACE: ingress-nginx
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
...
```
Make a note of the namespace, you'll need it later.

You can watch the Load Balancer become available by running:
```
$ kubectl get services -o wide -w nginx-ingress-controller
```

#### Exposing the App Using an Ingress
You’ll store the Ingress in a file named nginx-ingress.yaml.

```
touch kubernetes/production/nginx-ingress.yaml
```

To know what rules to write lets take a look inside `kubernetes/nginx-configmap.yaml`. On line 6 you will a configuration for nginx... however this is for a deployment running an nginx as a proxy. This though similar is not the method we are going to employ.

However, it can be used as a starting point for understanding what we need to do in our own ingress. All the configuration in `default.conf` have equivalents for an ingress and the documentation can be [read here](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/).

Lines 10 to 13 deal with security
```
10|    add_header X-Frame-Options DENY;
11|    add_header X-Content-Type-Options nosniff;
12|    add_header X-XSS-Protection "1; mode=block";
13|    add_header X-Robots-Tag none;
```
Because these are very use-case specific I will leave you to explore what each mean. (Please make sure you understand them or you could ban all traffic from your store, be especially careful with `add_header X-Robots-Tag none` which is the same as adding `noindex, nofollow` to your whole site). I won't be including any of the directives in our example.

lines 15 to 24 handle gzip compression:
```
15|    gzip on;
16|    gzip_proxied any;
17|    gzip_types
18|      text/css
19|      text/javascript
20|      text/xml
21|      application/javascript
22|      application/json
23|      text/json
24|      text/html;
```
and lines 26 to 40 deal with the routing.
```
26|    location / {
27|        proxy_pass http://vue-storefront:3000/;
28|    }
29|
30|    location /assets/ {
31|        proxy_pass http://vue-storefront:3000/assets/;
32|    }
33|
34|    location /api/ {
35|        proxy_pass http://vue-storefront-api:8080/api/;
36|    }
37|
38|    location /img/ {
39|        proxy_pass http://vue-storefront-api:8080/img/;
40|    }
```

OK lets deal with routing first edit you new file and add the following rules based on what we've found out.

```
nano kubernetes/production/nginx-ingress.yaml
```

```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: vue-storefront
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
      - host: www.yourdomain.com
      http:
        paths:
          - path: /
            backend:
              serviceName: vue-storefront
              servicePort: 3000
          - path /assets
            backend:
              serviceName: vue-storefront
              servicePort: 3000
          - path: /api
            backend:
              serviceName: vue-storefront-api
              servicePort: 8080
          - path /img
            backend:
              serviceName: vue-storefront-api
              servicePort: 8080
```
You can use Kubernetes annotations to attach arbitrary non-identifying metadata to objects. Clients such as tools and libraries can then retrieve this metadata.

Edit your Ingress file to add to the metadata.
```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: vue-storefront
  annotations:
    kubernetes.io/ingress.class: nginx
    ingress.kubernetes.io/configuration-snippet": |2
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
...
```
Notice the `|2` at the beginning of the data directly following the key. This specifies that we want a multiline string and that we want it to preserve indentation whitespace to 2 whitespaces.

#### Set up the SSL certificates
We’ll install cert-manager into our cluster. cert-manager is a Kubernetes add-on that provisions TLS certificates from Let’s Encrypt (and some other certificate authorities). Certificates can be requested and configured by annotating Ingress Resources, appending a tls section to the Ingress spec, and configuring an Issuers or ClusterIssuers to specify your certificate authority. [Click here](https://cert-manager.io/docs/configuration/) if you wish to read the offical documentation

Lets install:
```
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.16.1/cert-manager.yaml
```
You will see:
```
Output
customresourcedefinition.apiextensions.k8s.io/certificaterequests.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/certificates.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/challenges.acme.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/clusterissuers.cert-manager.io created
. . .
deployment.apps/cert-manager-webhook created
mutatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
validatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
```
To verify
```
kubectl get pods --namespace cert-manager
```
Outputs:
```
Output
NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-578cd6d964-hr5v2              1/1     Running   0          99s
cert-manager-cainjector-5ffff9dd7c-f46gf   1/1     Running   0          100s
cert-manager-webhook-556b9d7dfd-wd5l6      1/1     Running   0          99s
```
Now we need to create an Issuer, which specifies the certificate authority. So let's use the Let’s Encrypt certificate authority, which provides free TLS certificates and offers both a staging server and a production certificates.

A ClusterIssuer is not namespace-scoped and can be used by Certificate resources in any namespace. So let's create one.

Open a file named staging_issuer.yaml in your favorite text editor:
```
apiVersion: cert-manager.io/v1alpha2
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
  namespace: cert-manager
spec:
  acme:
    # The ACME server URL
    server: https://acme-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: your_email_address_here
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-prod
    # Enable the HTTP-01 challenge provider
    solvers:
    - http01:
        ingress:
          class: nginx
```
Roll out this Issuer using kubectl:
```
kubectl create -f prod_issuer.yaml
```
Output
```
clusterissuer.cert-manager.io/letsencrypt-prod created

```
Now that we’ve created our Let’s Encrypt staging and prod ClusterIssuers, we need to modify the Ingress Resource we created above and enable TLS encryption for the Vue-StoreFront and Vue-StoreFront-API paths.

#### Possible Gotcha
Before it provisions certificates from Let’s Encrypt, cert-manager first performs a self-check to ensure that Let’s Encrypt can reach the cert-manager Pod that validates your domain. For this check to pass on DigitalOcean Kubernetes, you need to enable Pod-Pod communication through the Nginx Ingress load balancer. [Click here](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes#step-5-%E2%80%94-enabling-pod-communication-through-the-load-balancer-optional) for futher information.

(Other providers may or may not pass this test, but if you are finding failures at self-check please refer to your providers documentation or get their help with with the needed configuration. Once you have it working feel free to open an issue and we'll happily append what you've found out to this guide.)

#### Issuing the certificate
Add the following to the Ingress resource manifest:

Add to annotations:
```
cert-manager.io/cluster-issuer: "letsencrypt-prod"
```
Add to spec:
```
  tls:
  - hosts:
    - vue-storefront.com
    - vue-storefront-api.com
    secretName: echo-tls
```
To leave you with the full config of:

```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: vue-storefront
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    ngress.kubernetes.io/configuration-snippet": |2
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
spec:
  tls:
  - hosts:
    - www.yourdomain.com
    secretName: echo-tls
  rules:
      - host: www.yourdomain.com
      http:
        paths:
          - path: /
            backend:
              serviceName: vue-storefront
              servicePort: 3000
          - path /assets
            backend:
              serviceName: vue-storefront
              servicePort: 3000
          - path: /api
            backend:
              serviceName: vue-storefront-api
              servicePort: 8080
          - path /img
            backend:
              serviceName: vue-storefront-api
              servicePort: 8080
```
Roll out the changes using kubectl apply
```
kubectl apply -f kubernetes/production/nginx-ingress.yaml
```
Output
```
ingress.networking.k8s.io/echo-ingress configured
```

## Cache Strategies

### Varnish cache for VSF
_Vue Storefront_ has multiple layers of cache, and the forefront cache is _Varnish_ which serves a request just as fast as a static HTML page once it's hit. You can install it from [here](https://github.com/new-fantastic/vsf-cache-varnish).

If you choose to use the project you will need to add a varnish controller to your cluster and there is an open source project for doing so, [Read More](https://github.com/mittwald/kube-httpcache) and a tutorial for using it [Read More](https://medium.com/@dealancer/creating-a-scalable-and-resilient-varnish-cluster-using-kubernetes-853f03ec9731).

### Further Suggestions
#### Using GitHub actions to Automatically Build and Push.
GitHub Actions makes it easy to automate your software workflow. You can Build, test and push the image to packages; finally deploying your docker image to Kubernetes right from GitHub.
