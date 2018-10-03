# Installing Vue Storefront on Linux and Mac OS

<br><br>

## Preparing the environment

The steps below are tested on MacOS and Linux environments. If you're on Windows please check [Windows Installation Tutorial](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Windows.md).

<br>
<br>

**If you don't have it installed yet, do yourself a favour and install Homebrew - the ultimate package installer for Mac OS**

- https://brew.sh/

<br>

Done? Ok! Let's proceed!

<br>

**Make sure you have all of the required software installed locally on your computer:**

- **Node.js + NPM**
  <br> 
  `$ brew install node`
  
  
- **Yarn**
  <br> 
  `$ brew install yarn`

- **Docker + Docker Compose**
  <br>
  Regular Installaton: https://docs.docker.com/docker-for-mac/install/ + https://docs.docker.com/compose/install/
  <br>
  Using Homebrew `$ brew install docker docker-compose docker-machine xhyve docker-machine-driver-xhyve`

- **ImageMagick**
  <br> 
  `$ brew install imagemagick`
  
<br>

To test if the software is installed, run these commands in Terminal:

- **for Node.js:** `node -v`
- **for NPM:** `npm -v`
- **for Docker:** `docker version` or simply Check your `/Applications/` directory and look for the `Docker.app` and `Docker Quickstart Terminal.app`
- **for ImageMagick**: ` convert -version`

<br>

### TROUBLESHOOTING REQUIRED SOFTWARE INSTALLATION

<br>

  - **Node** https://changelog.com/posts/install-node-js-with-homebrew-on-os-x

  - **Docker** https://docs.docker.com/docker-for-mac/install/

  - **Docker Compose** https://docs.docker.com/compose/install/

  - **ImageMagick** http://www.besavvy.com/documentation/4-5/Editor/031350_installimgk.htm

<br>
<br>

## Installing with Vue Storefront CLI Installer

<br>
<br>

### 1. Create a folder for a whole project in your preferred location.

<br>

We'll call it `[project-folder]` in this tutorial. Basically it is a folder where you keep all repositories you need for the development.

<br>

### 2. Open Terminal and run commands:

<br>

* First go to `[project-folder]`

  `$ cd /path/to/[project-folder]`

<br>

* Then clone the Vue Storefront repository from GitHub

  `$ git clone https://github.com/DivanteLtd/vue-storefront.git`

<br>


* Go to the cloned repository

  `$ cd vue-storefront`

<br>


* Install and lock the dependencies

  `$ yarn install`

<br>


* Run the CLI Installer provided by Vue Storefront

  `$ yarn installer`

<br>

  ```
  yarn run v1.6.0
  $ node ./core/scripts/installer
  ┌─────────────────────────────────────────────────┐
  │ Hi, welcome to the vue-storefront installation. │
  │ Let's configure it together :)                  │
  └─────────────────────────────────────────────────┘
  ? Would you like to use https://demo.vuestorefront.io as the backend? No
  
  ? Please provide Git path (if it's not globally installed) git
  
  ? Please provide path for installing backend locally ../vue-storefront-api
  
  ? Choose path for images endpoint http://localhost:8080/img/
  
   Trying to create log files... 
   Cloning backend into '../vue-storefront-api'... 
   Trying change directory to '../vue-storefront-api'... 
   Working in directory '/Users/aleksandergrygier/git/fcgroup/flyn-vue-storefront/vue-storefront-api'... 
   Installing backend npm... 
   Creating backend config 'config/local.json'... 
   Starting docker in background... 
   Restoring data for ElasticSearch... 
   Migrating data into ElasticSearch... 
   Cloning Magento 2 Sample Data into 'var/magento2-sample-data'... 
   Starting backend server... 
   Trying change directory to '/Users/aleksandergrygier/git/fcgroup/flyn-vue-storefront/vue-storefront'... 
   Working in directory '/Users/aleksandergrygier/git/fcgroup/flyn-vue-storefront/vue-storefront'... 
   Creating storefront config 'config/local.json'... 
   Build storefront npm... 
   Starting storefront server... 
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ Congratulations!                                                                       │
  │                                                                                        │
  │ You've just successfully installed vue-storefront.                                     │
  │ All required servers are running in background                                         │
  │                                                                                        │
  │ Storefront: http://localhost:3000                                                      │
  │ Backend: http://localhost:8080                                                         │
  │                                                                                        │
  │ Logs: /Users/aleksandergrygier/git/fcgroup/flyn-vue-storefront/vue-storefront/var/log/ │
  │                                                                                        │
  │ Good Luck!                                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────┘
  ```
<br>

* To be sure that everything is ready for next steps, **kill all node processes**

  `$ killall node`

<br>

* Then go up to `[project-folder]`

  `$ cd ..`


<br>

* Now there are 2 folders (apps) in the `[project-folder]`:

      1. `[project-folder]/vue-storefront/`
      2. `[project-folder]/vue-storefront-api/`
      
 <br>

- **Right now, VERY IMPORTANT – Clone this repository to `[project-folder]`**

  `$ git clone https://github.com/magento/magento2-sample-data.git var/magento2-sample-data`

<br>

- **After cloning sample data repo, it’s time to clone the mage2vuestorefront app, which imports all the data from Magento 2**

  `$ git clone https://github.com/DivanteLtd/mage2vuestorefront.git`

  This creates [project-folder]/mage2vuestorefront/

<br>

- Go to the `mage2vuestorefront` folder

  `$ cd mage2vuestorefront/src`

  and install and lock dependencies

  `$ yarn install`

<br>
<br>
<br>

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
We re using powerful node.js library for config files, check the docs to learn more on it: https://github.com/lorenwest/node-config.

To import these products we'll use 'elasticdump' - which is provided by default with package.json dependencies and yarn command. Then, we need to update the structures in the database to the latest version (data migrations).

Depending on the selected mode, execute the following commands:
- **legacy** mode:
  ```
  yarn restore
  yarn migrate
  ```
- **standard** mode:
  ```
  docker exec -it vue-storefront-api_app_1 yarn restore
  docker exec -it vue-storefront-api_app_1 yarn migrate
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
curl -i http://localhost:8080/api/catalog/vue_storefront_catalog/product/_search?q=bag&size=50&from=0
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


<br>
<br>
<br>

## Importing Products from Magento 2


### 1. Configure the API Credentials inside `[project-folder]/mage2vuestorefront/src/config.js`

```js
magento: {
    url: process.env.MAGENTO_URL || "http://your-magento-url.com/rest/",  - change to your Magento 2 URL
    consumerKey: process.env.MAGENTO_CONSUMER_KEY || "alva6h6hku9qxrpfe02c2jalopx7od1q",
    consumerSecret: process.env.MAGENTO_CONSUMER_SECRET || "9tgfpgoojlx9tfy21b8kw7ssfu2aynpm",
    accessToken: process.env.MAGENTO_ACCESS_TOKEN || "rw5w0si9imbu45h3m9hkyrfr4gjina8q",
    accessTokenSecret: process.env.MAGENTO_ACCESS_TOKEN_SECRET || "00y9dl4vpxgcef3gn5mntbxtylowjcc9",
    storeId: process.env.MAGENTO_STORE_ID || 1,
    currencyCode: process.env.MAGENTO_CURRENCY_CODE || 'USD'
  },
```
<br>

<br>

### 2. Configure the  API Credentials inside `[project-folder]/vue-storefront-api/config/local.json`

```js
"magento2": {
    "url": "http://your-magento-url.com",
    "imgUrl": "http://your-magento-url.com/media/catalog/product",
    "assetPath": "/../var/magento2-sample-data/pub/media",
    "api": {
      "url": "http://your-magento-url.com/rest/",
      "consumerKey": "alva6h6hku9qxrpfe02c2jalopx7od1q",
      "consumerSecret": "9tgfpgoojlx9tfy21b8kw7ssfu2aynpm",
      "accessToken": "rw5w0si9imbu45h3m9hkyrfr4gjina8q",
      "accessTokenSecret": "00y9dl4vpxgcef3gn5mntbxtylowjcc9"
    }
  },
```
<br>

also **remember to whitelist your Magento domain**

```js
"imageable": {
    "namespace": "",
    "maxListeners": 512,
    "imageSizeLimit": 1024,
    "timeouts": {
      "convert": 15000,
      "identify": 300,
      "download": 5000
    },
    "whitelist": {
      "allowedHosts": [
        ".*your-magento-url.com",
        ".*divante.pl",
        ".*vuestorefront.io",
        "localhost"
      ],
      "trustedHosts": [
        ".*your-magento-url.com",
        ".*divante.pl",
        ".*vuestorefront.io",
        "localhost"
      ]
    },
```
<br>

  SAVE THE CHANGES

<br>

### 3. **Open Docker** (just like an normal Mac OS App, for example Cmd + Space and type "Docker" in Spotlight Search)

<br>

### 4. **In Terminal in `[project-folder]/vue-storefront-api/` run:**

  `$ docker-compose up`

<br>

### 5. **In Terminal in `[project-folder]/mage2vuestorefront/src/` run:**

  `$ node --harmony cli.js fullreindex`

<br>

### 6. **In Terminal in `[project-folder]/vue-storefront-api/` run:**

  `$ yarn o2m`

<br>

### 7. **In Terminal in `[project-folder]/vue-storefront-api/` run:**

  `$ yarn dev`

<br>

### 8. In Terminal in [project-folder]/vue-storefront/ run

  `$ yarn dev`
