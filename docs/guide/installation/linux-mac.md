# Installing on Linux/MacOS

The steps below are tested on MacOS and Linux environments. If you're on Windows please check [Windows Installation Tutorial](windows.md).

Let's go!

## Requirements

- Docker (with [docker-compose](https://docs.docker.com/compose/install/) installed).

  Already included in `vue-storefront` and `vue-storefront-api` Docker images (required locally, if you do not use containerization):

- Node.js [Active LTS](https://nodejs.org/en/) (>=10.x)
- [Yarn](https://yarnpkg.com/en/docs/install) (>=1.0.0)
- [ImageMagick](https://www.imagemagick.org/script/index.php) (to fit, resize and crop images)

## User-friendly installation

If you're MacOS or Linux user now you're able to install with pretty nice CLI installer :)

```bash
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
yarn
yarn installer
```

It will take some time for installation and during the last step you will be asked some questions. First one is

```
Would you like to use https://demo.vuestorefront.io as the backend?
```

If you answer `Yes`, you will have remote backend at `https://demo.vuestorefront.io`. Otherwise, you will need to install `vue-storefront-api`.

### Using Vue Storefront demo as a backend

In this case you don't need to run Docker and you will be asked one additional question:

```
? Please provide path for images endpoint (https://demo.vuestorefront.io/img/)
```

You can simply proceed and as a result you will have a `vue-storefront` folder inside your project root and Storefront application running on `http://localhost:3000`. All images will be also hosted at `https://demo.vuestorefront.io/img/`.

### Theme

You will get question about official theme installation and its version.
```
? Select theme for Vue Storefront (Use arrow keys)
❯ Capybara - based on Storefront UI 
  Default
```
```
? Select theme version (Use arrow keys)
❯ Stable version (recommended for production) 
  In development branch (could be unstable!) 
```

### Installing the vue-storefront-api locally

If you answer `No` on the previous question, please be sure the Docker is running, otherwise you might get an error. You will be asked some more questions immediately:

```
? Would you like to use https://demo.vuestorefront.io as the backend? No
? Please provide Git path (if it's not globally installed) git
? Please provide path for installing backend locally ../vue-storefront-api
? Choose path for images endpoint http://localhost:8080/img/
```

As for images endpoint: you can choose between `https://demo.vuestorefront.io/img/` again or host your images on localhost.

After you answered all the questions, the installation process will start (it might take some time to install all dependencies). When it's finished, you will get the following message:

```
┌────────────────────────────────────────────────────────────────┐
│ Congratulations!                                               │
│                                                                │
│ You've just successfully installed vue-storefront.             │
│ All required servers are running in background                 │
│                                                                │
│ Storefront: http://localhost:3000                              │
│ Backend: http://localhost:8080                                 │
│                                                                │
│ Logs: /Users/natalia/Desktop/work/test/vue-storefront/var/log/ │
│                                                                │
│ Good Luck!                                                     │
└────────────────────────────────────────────────────────────────┘
```

Your project should contain 2 folders at this moment: `vue-storefront` and `vue-storefront-api`. Vue Storefront should be running on `http://localhost:3000`:

![Storefront screenshot](../images/storefront.png)

## Manual installation

### Install the vue-storefront-api

You need to use [https://github.com/DivanteLtd/vue-storefront-api](https://github.com/DivanteLtd/vue-storefront-api). It's the ultimate API backend for this application.

```bash
git clone https://github.com/DivanteLtd/vue-storefront-api.git vue-storefront-api
cd vue-storefront-api
```

You can choose between two modes of running the application:

1. The **legacy** mode - starting just Elastic and Redis containers:

   ```bash
   docker-compose up -d
   ```

2. The **standard** mode - starting Elastic, Redis and Vue Storefront API containers:

   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.nodejs.yml up -d
   ```

If you choose to use **legacy** mode, you must manually install the Yarn dependencies for the project:

```bash
yarn install
```

As a result, all necessary services will be launched:

- Vue Storefront API runtime environment (Node.js with dependencies from `package.json`)
- [ElasticSearch](https://www.elastic.co/products/elasticsearch)
- [Redis](https://redis.io/)
- Kibana (optional)

To test out the application you'll need some test data. In `vue-storefront-api/var/catalog.json` you have data dump for ElasticSearch with default Magento2 products database. We're using for development purposes.

First step is to configure the application:

```bash
cp config/default.json config/local.json
nano config/local.json
```

The config file is quite simple, but here you have some comments: [Config file for vue-storefront](https://github.com/DivanteLtd/vue-storefront/wiki/Config-file-format-for-vue-storefront).

:::tip NOTE
We're using the powerful node.js library for config files, check the docs to learn more on it: [https://github.com/lorenwest/node-config](https://github.com/lorenwest/node-config).
:::

To import these products we'll use `elasticdump` - which is provided by default with `package.json` dependencies and yarn command. Then, we need to update the structures in the database to the latest version (data migrations).

Depending on the selected mode, execute the following commands:

- **legacy** mode:
  ```bash
  yarn restore
  yarn migrate
  ```
- **standard** mode:
  ```bash
  docker exec -it vue-storefront-api_app_1 yarn restore
  docker exec -it vue-storefront-api_app_1 yarn migrate
  ```

Clone the image files for default product database (we're using [Magento2 example products dataset](https://github.com/magento/magento2-sample-data). Please execute the following command in **the root folder of vue-storefront-api project**:

```bash
git clone https://github.com/magento/magento2-sample-data.git var/magento2-sample-data
```

If you choose to use **standard** mode, the application is already running in the background. However, if you decided to stay with the **legacy** mode, you must start the application manually using the following command (development mode with dynamic file reloads when changed):

```bash
yarn dev
```

After all these steps you should be able to use the API application!

You can check if everything works just fine by executing the following command:

```bash
curl -i http://localhost:8080/api/catalog/vue_storefront_catalog/product/_search?q=bag&size=50&from=0
```

Now, it's the time to install the frontend itself.

### Install the vue-storefront

First step is to clone [vue-storefront](https://github.com/DivanteLtd/vue-storefront)

```bash
git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront
cd vue-storefront
```

Next, you have to prepare the config

```bash
cp config/default.json config/local.json
nano config/local.json
```

The default config file should work perfectly fine for default purposes.

Next [install theme](theme.md)

Finally, you have to choose between two modes of running the application (similarly as in the case of vue-storefront-api).

:::warning
If you choose the **legacy** mode, be sure to run `yarn install` first!
:::

1. The **legacy** mode:

   ```bash
   yarn build
   yarn dev
   ```

2. The **standard** mode (whole runtime environment inside the container):
   ```bash
   docker-compose up
   ```

That's all - your frontend application is now up and running! You can check it on `localhost:3000`
