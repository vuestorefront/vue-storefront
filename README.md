![Vue Storefront](https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067)
# Vue Storefront Next


[![Coverage Status](https://coveralls.io/repos/github/DivanteLtd/next/badge.svg?branch=master) ](https://coveralls.io/github/DivanteLtd/next?branch=master)<a href="https://slack.vuestorefront.io">![Branch Develop](https://img.shields.io/badge/community%20chat-slack-FF1493.svg)</a>

**Disclaimer:** This project is still in beta phase. It's not usable to full extend yet. Once its production ready this repo will be merged into the [main repo](https://github.com/DivanteLtd/vue-storefront/).

Vue Storefront is the most popular and most advanced PWA Headless frontend for eCommerce.
- [Documentation](https://vsf-next-docs.netlify.com) (WIP)
- [Demo](https://vsf-next-demo.storefrontcloud.io/) (WIP)

![Screenshots](https://blog.vuestorefront.io/wp-content/uploads/2020/03/3-views-Vue-Storefront-.png)
**Supported platforms**
- Magento 1.9/2
- Spryker
- Spree
- Sylius
- Shopware 6
- Commercetools [WIP]
- AboutYou Cloud [WIP]
- Salesforce Commerce Cloud [WIP]
- ...more coming!


## What you need
* [yarn](https://yarnpkg.com/getting-started) - Dependency manager
* [Lerna](https://github.com/lerna/lerna) - Monorepo manager
* [Typescript](https://www.typescriptlang.org/docs/home.html) - JavaScript superset

## Installation
**Installing dependencies:**
```sh
$ yarn install
```

**Verify by building packages:**
```sh
yarn build:core
yarn build:prismic
```

## Commercetools
```sh
yarn build:ct:tools
```

then run the app
```sh
yarn dev:ct
```
