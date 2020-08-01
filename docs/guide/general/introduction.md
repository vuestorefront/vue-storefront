# Introduction
_Vue Storefront Next_ is a headless e-commerce frontend framework that may work with __any__ backend that you are already using via its API regardless of the platform, be it e-commerce, CMS, ERP, PIM, or anything else. 


![f_b](../images/f_b.png)


_Vue Storefront Next_ is the fruit of multiple years of innovation and the furnace of feedbacks from the  battle frontline in which you strive to give best online shopping experience to potential customers who are curious, rich, and impatient. PWA as a foundation technology for _Vue Storefront Next_ was excellent choice because PWA is designed to give best performance even on laggy mobile devices with native-like features from the beginning. 

Now we came back with even more for _Vue Storefront Next_. We heard a lot of struggles especially from developers that how painful it was to upgrade or migrate from one version to another. Another notorious hassle was you had to meticulously fix all the use cases in a theme for changes made to its implementation as updates took place. So, in order to enhance the maintainability, we divided the system into the smallest chunks until it's not meaningful to do so. One notable change is, that all parts are now wrapped in as individual `npm` packages so switching from one version to another should be as easy as any `npm` command. It also means you can swap a part in the system with other equivalent app or service with a simple command. (or with a few changes in configuration)

[[toc]]

## In a nutshell
_Vue Storefront Next_ is a frontend framework with the modular approach to its core and parts in the first place. Essentially the framework itself is a set of independent `npm` packages taking various roles of the platform. It's really up to you _how much_ of the platform you will use in your project. You can cherry-pick any combination to your advantage. 

![vsfn_module](../images/vsfn.png)

As of beta version, _Vue Storefront Next_ consists of modules above. The majority of modules is integration module with 3rd party backend models. 

The core part of _Vue Storefront Next_ is `core` and `nuxt-theme`. They contain basic structures and business logics implemented within the theme. We will further investigate how they are structured inside and intertwined (and how not) with each other in [Architecture for dummies](architecture). 

_Vue Storefront Next_ packages are standalone which allows you to use them in __any__ Vue.js enviroment so it's not a must to use Nuxt. You can use _Vue Storefront Next_ packages with Vue CLI or even within your custom Vue.js codebase. All you need is know how to communicate with _Vue Storefront Next_, which is done via interfaces over API.


## Benefits
- Blazing fast (90+ Lighthouse score for every page)
- Works with any backend, CMS, ERP, PIM, and anything else that has API
- Server Side Rendered
- Progressive Web App
- Huge flexibility in changing third-party services

## Tech stack
- [Vue.js](https://vuejs.org/v2/guide/)
- [Nuxt.js](https://nuxtjs.org/guide)
- CSS
- [Storefront UI](https://www.storefrontui.io/) (optional)
- [TypeScript](https://www.typescriptlang.org/docs/home) (optional)