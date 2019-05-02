# Introduction to Vue Storefront

Vue Storefront is a rather complex solution with a lot of possibilities. Learning all of them can take some time. In this introduction, we will learn all of its crucial concepts in a few minutes, which is enough to start playing with [Vue Storefront](https://www.vuestorefront.io/).


## What is Vue Storefront
![Vue Storefront](https://cdn-images-1.medium.com/max/1600/0*X7cXhVkWidbWFrbM)

Vue Storefront is a headless and backend-agnostic eCommerce [Progressive Web App (PWA)](https://developers.google.com/web/progressive-web-apps/) written in Vue.js. The fact that it's using headless architecture allows Vue Storefront to connect with any eCommerce platform so it can be a frontend PWA for Magento, Shopify, BigCommerce, WooCommerce and etc.

 It's a very popular [Open Source project](https://github.com/DivanteLtd/vue-storefront) with a strong and growing community.
 
**Key features of Vue Storefront:**
- Platform-agnostic
- Focus on performance
- Mobile-first approach
- Cutting-edge tech
- No limitations in theming and customization
- Open Source with MIT license
- Exciting developer experience
- Out-of-the-box Server Side Rendering (for SEO)
- Offline mode


## How does it connect with backend platforms?
Vue Storefront manages to be platform-agnostic thanks to the [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront-api) and [dedicated API connectors](https://github.com/DivanteLtd/vue-storefront#integrations) for eCommerce backend platforms. The data format in vue-storefront-api is always the same for any platform, which means no matter what eCommerce backend you use, your frontend remains the same without any change.

It's a great strategy for migrations since you can easily migrate from one platform to another (or one version to another, e.g. Magento 1 to 2) without touching your frontend.


![Architecture diagram](https://raw.githubusercontent.com/DivanteLtd/vue-storefront/master/docs/.vuepress/public/GitHub-Architecture-VS.png)

The API connector works in two phases:
- **data pump** ([mage2nosql](https://github.com/DivanteLtd/mage2vuestorefront) in the image)  is pulling static data (catalog, orders, etc.) from your eCommerce platform to Vue Storefront Elasticsearch and changes its format to the one consumed by vue-storefront-api. Once finished pulling the data, you can display the product catalog in Vue Storefront. After pumping the data into Elasticsearch is done, it will stay in sync with changes made on the backend platform and update its content accordingly.

- **worker pool** is a synchronization process of so-called dynamic calls (user sessions, cart rules, etc.) that couldn't be stored in the database and need to be called by vue-storefront-api directly from the backend platform.

VueStorefront works seamlessly with your backend platform while two integration phases are managed as above.

Some of the most popular backend platforms already have their integrations ([Magento 2](https://github.com/DivanteLtd/mage2vuestorefront), [Magento 1](https://github.com/DivanteLtd/magento1-vsbridge), [CoreShop](https://github.com/DivanteLtd/coreshop-vsbridge), [BigCommerce](https://github.com/DivanteLtd/bigcommerce2vuestorefront), [WooCommerce](https://github.com/DivanteLtd/woocommerce2vuestorefront)), but you can easily make your own with the [integration boilerplate](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate).

The blue parts on the diagram are responsible for offline cache and will be explained later in the article.

## How does it work?

There are 3 concepts you need to be familiar with while working with Vue Storefront.

- **Vue Storefront Core** ( `core` folder) is the glue for all the features that allow Vue Storefront to work. It contains all the entry points, SSR behavior, build process, in-app libs and helpers. You shouldn't touch this folder directly when building your own implementations in order to stay up-to-date with its features and security.

- **Vue Storefront Modules** ( `core/modules` and `src/modules` ) are the eCommerce features. Each module is one encapsulated feature (like cart, wishlist, catalog, and some third-party integrations). You can add/remove/edit these modules as you wish and compose your Vue Storefront shop only with features that you need. They are also used for third-party extensions.

- **Vue Storefront Themes** ( `src/themes` ) are the actual shop implementations. In themes, you can use and extend all the logic from registered modules / core and add your HTML markup and styles. Vue Storefront provides a fully customizable default theme.

To summarize: Your shop is basically a Vue Storefront theme that uses features provided by modules. Vue Storefront Core glues it all together.

Knowing these three concepts allows you to confidently work with Vue Storefront and make your own shops.

Useful materials: [Vue Storefront project structure](https://docs.vuestorefront.io/guide/basics/project-structure.html)

## Installing Vue Storefront
When you want to play with Vue Storefront, there are three options:
- You can set up the frontend connected to our demo backend platform (best for trying out Vue Storefront).
- You can set up frontend with your own `vue-storefront-api` and database dumped from the demo.
- You can set up frontend with `vue-storefront-api` connected to your eCommerce backend.

To do any of this, simply type `yarn installer` in the root of the project and answer the questions in the console. Once the installation is done, type yarn dev to run your project (by default of port 3000). No matter what option you choose, you can change the settings in the config file later.

## Vue Storefront config file

Most of the Vue Storefront configuration (like active theme, backend API addresses, multistore setup, etc.) is done through its config file that can be found under the `config` folder. The `default.json` file contains contains the default setup.

For your own implementation you should create a `local.json` file in the same directory and include fields from `default.json` that you want to override. These two files will be merged in favor of `local.json` during a build process. If you use installer to set up your Vue Storefront instance, it'll generate proper config files.

## Building themes in Vue Storefront

While making themes in Vue Storefront, in most cases, all you need to do is create your own HTML and CSS markup. All required business logic is exposed by Core with its core modules and can be easily injected into any of the theme components. The mechanism of injecting core business logic into themes is very simple. We are using Vue.js mixins to keep upgradable business logic in the core.

Business logic from the core component can be easily injected into any theme component as a Vue.js mixin. We can inject it into any of our theme components just by importing and adding it as a mixin ( eg `mixins: [Microcart]` is what you need to use core Microcart logic). This is all you need to make use of core business logic inside your theme. With this approach, we can easily ship updates to all core components without breaking your shop.

The easiest way to create your own theme is to create a copy of the default one, change its name in its `package.json` file, change the active theme in `config/local.jso`n and run `yarn` to make lerna linking (which we are using for monorepos).

## Offline mode and cache
Vue Storefront is still working even while the user is offline.

We managed to do this by making heavy use of the browser cache. 
For the static assets (only prod) we are using the sw-precache plugin (config can be found in `core/build/webpack.prod.sw.config.js` ). They are cached in Service Worker and can be inspected under `Application/Cache Storage` tab of your Developer Tools.

:::warning
Please keep in mind that Service Worker is working only on production mode.
:::

For the catalog and store-data cache, we are using IndexedDB and Local Storage. We are also prefetching products from visited categories so once you enter one, all of its products are available offline. The mechanism of offline storage is located under core/lin./storage.

We are using some of the cached data even while the user is online to display the content instantly. This is why Vue Storefront is so fast.

