# Installation

To make vue-storefront up and runing you need to have the latest version of node (v8.3.0 used for development). You'll also need docker - or ElasticSearch + Redis installed on localhost instead. The steps below are tested on MacOS and Linux environments.

If you're on Windows please check [Windows Installation Tutorial](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Windows.md)

**If You need a step by step installation** guide please go to <a href="#ultimate-guide">Ultimate Installation Guide on MacOS X</a>

Let's go:

## User-friendly installation

If you're MacOS or Linux user now you're able to install with pretty nice CLI installer :)

### Requirements
1. Docker (with ['docker-compose'](https://docs.docker.com/compose/install/) installed)
2. Node.js [Active LTS](https://github.com/nodejs/Release) (>=8.0.0)
3. [Yarn](https://yarnpkg.com/en/docs/install) (>=1.0.0)

### Installing
You need to use https://github.com/DivanteLtd/vue-storefront.

```
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
yarn
yarn installer
```

After answering some questions the process will start automatically. Enjoy :)


## Manual installation

### Install the vue-storefront-api
You need to use https://github.com/DivanteLtd/vue-storefront-api.
It's the ultimate API backend for this application

```
git clone https://github.com/DivanteLtd/vue-storefront-api.git vue-storefront-api
cd vue-storefront-api
yarn
docker-compose up
```
To test out the application you'll need some test data. In vue-storefront-api/var/catalog.json you have data dump for ElasticSearch with default Magento2 products database. We're using for development purposes.

First step is to configure the application:

```
cp config/default.json config/local.json
nano config/local.json
```
The config file is quite simple, but here you have some comments: [Config file for vue-storefront](https://github.com/DivanteLtd/vue-storefront/wiki/Config-file-format-for-vue-storefront).
We re using powerful node.js library for config files, check the docs to learn more on it: https://github.com/lorenwest/node-config.

To import these products we'll use 'elasticdump' - which is provided by default with package.json dependencies and yarn command:

```
yarn restore
yarn migrate
```

Clone the image files for default product database (we're using Magento2 example products dataset: https://github.com/magento/magento2-sample-data). Please execute the following command in **the root folder of vue-storefront-api project**:

```
git clone https://github.com/magento/magento2-sample-data.git var/magento2-sample-data
```

After all these steps you should be able to run the application using following command (development mode with dynamic file reloads when changed):

```
yarn dev
```

You can check if everything works just fine by executing the following command:
```
curl -i http://localhost:8080/api/catalog/vue_storefront_catalog/product/_search?q=bag&size=50&from=0
```

### Install the vue-storefront
You need to use https://github.com/DivanteLtd/vue-storefront.
Now, it's the time to install the frontend itself:

```
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
yarn
```

You have to prepare the config:
(we re using powerfull node.js library for config files, check the docs to learn more on it: https://github.com/lorenwest/node-config)

```
cp config/default.json config/local.json
nano config/local.json
```

And then you can build app and run dev server:
```
yarn build
yarn dev
```

The default config file should work perfectly fine for default purposes.



<a name="ultimate-guide"></a>
# The Ultimate Vue Storefront Developer Installation for Mac OS
<br>

**0. If you don't have it installed yet, do yourself a favour and install Homebrew - the ultimate package installer for Mac OS**

- https://brew.sh/

<br>

Done? Ok! Let's proceed!

<br>

**1. Make sure you have all of the required software installed locally on your computer:**

- **Node.js + NPM**
  <br> 
  `$ brew install node`

- **Docker + Docker Compose**
  <br>
  Regular Installaton: https://docs.docker.com/docker-for-mac/install/ + https://docs.docker.com/compose/install/
  <br>
  Using Homebrew `brew install docker docker-compose docker-machine xhyve docker-machine-driver-xhyve`

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

    TROUBLESHOOTING REQUIRED SOFTWARE INSTALLATION

  - **Node** https://changelog.com/posts/install-node-js-with-homebrew-on-os-x

  - **Docker** https://docs.docker.com/docker-for-mac/install/

  - **Docker Compose** https://docs.docker.com/compose/install/

  - **ImageMagick** http://www.besavvy.com/documentation/4-5/Editor/031350_installimgk.htm

<br>
<br>

**2. Create a folder for a whole project in your preferred location.**

<br>

I'll call it `[project-folder]` in this tutorial. Basically it is a folder in which you keep all packages you need for the development.

<br>

**3. Open Terminal and run commands:**

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

- **Right now, VERY IMPORTANT – Clone this repository to `[project-folder]` **

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

4. Configure the API Credentials inside `[project-folder]/mage2vuestorefront/src/config.js` **(change the bolded text)**

```json
  magento: {
  <br>
  url: process.env.MAGENTO_URL || **'http://magento2.demo-1.divante.pl/** rest/', -- your Magento 2 URL
  <br>
  consumerKey: process.env.MAGENTO_CONSUMER_KEY || '**alva6h6hku9qxrpfe02c2jalopx7od1q**',
  <br>
  consumerSecret: process.env.MAGENTO_CONSUMER_SECRET || '**9tgfpgoojlx9tfy21b8kw7ssfu2aynpm**',
  <br>
  accessToken: process.env.MAGENTO_ACCESS_TOKEN || '**rw5w0si9imbu45h3m9hkyrfr4gjina8q**',
  <br>
  accessTokenSecret: process.env.MAGENTO_ACCESS_TOKEN_SECRET || '**00y9dl4vpxgcef3gn5mntbxtylowjcc9**',
  <br>
  storeId: process.env.MAGENTO_STORE_ID || 1,
  <br>
  currencyCode: process.env.MAGENTO_CURRENCY_CODE || 'USD'\
  <br>
  },
```

<br>

5. Configure the  API Credentials inside `[project-folder]/vue-storefront-api/config/local.json` **(change the bolded text)**

```json
  "magento2": {
  <br>
  "url": "**http://magento2.demo-1.xyz.com**", -- your Magento 2 URL
  <br>
  "imgUrl": "**http://localhost:8080**/media/catalog/product", -- your Magento 2 URL
  <br>
  "assetPath": "/../var/magento2-sample-data/pub/media",
    <br>
    "api": {
      <br>
      "url": '**http://magento2.demo-1.divante.pl/** rest/', -- your Magento 2 URL
      <br>
      "consumerKey": "**alva6h6hku9qxrpfe02c2jalopx7od1q**",
      <br>
      "consumerSecret": "**9tgfpgoojlx9tfy21b8kw7ssfu2aynpm**",
      <br>
      "accessToken": "**rw5w0si9imbu45h3m9hkyrfr4gjina8q**",
      <br>
      "accessTokenSecret": "**00y9dl4vpxgcef3gn5mntbxtylowjcc9**"
    <br>
    }
  <br>
  },
```

<br>

6. **Open Docker** (just like an normal Mac OS App, for example Cmd + Space and type "Docker" in Spotlight Search)

<br>

7. **In Terminal in `[project-folder]/vue-storefront-api/` run:**

  `$ docker-compose up`

<br>

8. **In Terminal in `[project-folder]/mage2vuestorefront/src/` run:**

  `$ node —harmony cli.js fullreindex`

<br>

9. **In Terminal in `[project-folder]/vue-storefront-api/` run:**

  `$ yarn o2m`

<br>

9. **In Terminal in `[project-folder]/vue-storefront-api/` run:**

  `$ yarn dev`

<br>

10. In Terminal in [project-folder]/vue-storefront/ run

  `$ yarn dev`
