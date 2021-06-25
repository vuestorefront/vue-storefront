# Introduction

## What do Vue Storefront extensions look like?

Depending on your needs, Vue Storefront extensions can have two parts:
- **Client-side part,** which is just a [Vue Storefront module](https://github.com/vuestorefront/vue-storefront/blob/master/docs/guide/modules/introduction.md). It covers most of the use cases.

- **Server-side part** which is a [Vue Storefront API extension](https://github.com/vuestorefront/vue-storefront/blob/master/docs/guide/extensions/extending-api.md) and should be used if you want to add some endpoints to `vue-storefront-api` or interact with Elasticsearch.

## Where extensions are located
- On the client side, extension modules should be placed in `src/modules` folder of `vue-storefront` or installed via NPM cli and registered in `src/modules/index.ts`
- On the server side, extensions should be placed in `src/api/extensions` folder of `vue-storefront-api` and registered in config file

## Writing extensions
If you are writing a VS extension as an NPM module, start the package name with a `vsf-` prefix so it can be transpiled with other VS code and ship it as a raw es6/typescript module. If you don't use the prefix, you need to handle transpilation by yourself. We are currently building an extension boilerplate to make it easier to develop one.

Here, you can find two articles explaining how to create custom Vue Storefront extensions:
- [How to create an Instagram Feed module for Vue Storefront](https://itnext.io/how-to-create-an-instagram-feed-module-for-vue-storefront-eaa03019b288) by Javier Villanueva
- [Developing a Vue Storefront payment module](https://www.develodesign.co.uk/news/development-of-the-paypal-module-for-vue-storefront/#.XCoa2h2Mmmo.twitter) by Dmitry Schegolikhin from [Develo Design](https://www.develodesign.co.uk/)

**IMPORTANT** If you are an extension developer, please join `#extension-dev` channel on our Slack to receive information about important API updates and new features.

## Extensions list
You can find a curated list of VS extensions in [Awesome Vue Storefront](https://github.com/frqnck/awesome-vue-storefront) list.
