# Introduction

Vue storefront is based on open source technologies which SHOULD (in theory ;)) works perfectly well on most of the leading operating systems. However, we're developing the project using MacOS and Linux machines.

## Prerequsites 
1. Please download [Docker for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows) and install it on your machine. [More Information](https://blog.jayway.com/2017/04/19/running-docker-on-bash-on-windows/)
2. Install [newest version of Node.js for Windows](https://nodejs.org/en/download/current/)
4. You can use any editor for development BUT we're using [Visual Studio Code](https://code.visualstudio.com/) which is cool, free and very JS friendly!
5. You can [download Github Desktop](https://desktop.github.com/) to get access not only for fancy UI but for git toolset itself.


## Installation of vue-storefront-api
1. Open your cmdline of choice with [Git](https://git-scm.com/download/win) access or use Github desktop
2. Clone the [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront-api) project: `git clone https://github.com/DivanteLtd/vue-storefront-api.git vue-storefront-api`
3. Go to vue-storefront-api in dir: `cd vue-storefront-api`
4. Install dependencies: `npm install`
5. Run Docker containers required by vue-storefront-api: `docker-compose up`. This can take a while ...
6. Restore products database `npm run restore`
7. Copy `src/config.example.json` to default config file `src/config.json`
8. Clone the image files for default product database (we're using Magento2 example products dataset: https://github.com/magento/magento2-sample-data). Please execute the following command in **the root folder of vue-storefront-api project**:

```
git clone https://github.com/magento/magento2-sample-data.git var/magento2-sample-data
```

9. Run API using `npm run dev` 


## Installation of vue-storefront
1. Open your cmdline of choice with [Git](https://git-scm.com/download/win) access or use Github desktop
2. Clone the [vue-storefront](https://github.com/DivanteLtd/vue-storefront) project: `git clone https://github.com/DivanteLtd/vue-storefront.git vue-storefront`
3. Go to vue-storefront-api in dir: `cd vue-storefront`
4. Install dependencies: `npm install`
5. Copy `src/config.example.json` to `src/config.json`
6. Run API using `npm run dev` 
