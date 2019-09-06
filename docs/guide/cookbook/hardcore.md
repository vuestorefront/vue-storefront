# (Hard)Core Training

## Introduction

Vue Storefront is getting more and more popular with more than 20 sites running on production. By the same time, the VSF Framework evolves with each new release and the docs are hardly trying to follow! 

These training materials are a set of Chief-recipes, experiences learned from the trenches. I’m trying to answer how to run Vue Storefront on production, troubleshoot most of the common problems and explain all the hidden features of Vue Storefront that can help you scale the application and solve most common issues.

Some of the topics here were found as a [frequently asked questions from our Forum](https://forum.vuestorefront.io/c/help). Some [came from Slack](http://slack.vuestorefront.io). Some came from core-consulting and our own works. What's common: all are super-crucial for stable Vue Storefront run on production and all are resulting some (hard)core results when done wrong. 

### Table of content

1. Tip 1: Memory leaks
2. Tip 2: SSR Cache
3. Tip 3: Limiting SSR HTML size (a.k.a INITIAL_STATE optimization)
4. Tip 4: Multistore configuration explained
5. Tip 5: Url Dispatcher explained + troubledshooting
6. Tip 6: Avoiding prices desynchronization (`alwaysSyncPlatformPricesOver`)
7. Tip 7: Avoiding stock desynchronization (`filterOutUnavailableVariants`)
8. Tip 8: HTML minimization, compression, headers
9. Tip 9: Production catalog indexing + cache invalidation
10. Tip 10: ElasticSearch production setup
11. Tip 11: .htaccess, server side redirects, HTTP codes and headers, middlewares
12. Tip 12: Which fields of product, category and attribute are really being used by VSF
13. Tip 13: Tracing, monitoring, logging the application and Troubleshooting
 - Cloud trace
 - New Relic
 - PM2
 - Output logs explained
 - 
12. Unexpected features (explained by config file properties):
 - `dynamicConfigReload` - for easier deployments
 - `useExactUrlsNoProxy` - for not using our default image resizer
 - `sourcePriceIncludesTax` vs `finalPriceIncludesTax` - and how the prices work.


## Tip 1: Memory leaks
Vue Storefront consist of two NodeJS applications:
- `vue-storefront` - which is the frontend app, with the entry point of [`core/scripts/server.js`](https://github.com/DivanteLtd/vue-storefront/blob/4ed26d7f1978a9e798edcddf1cf2f970c3e64e4f/core/scripts/server.js#L269)
- `vue-storefornt-api` - which is backend/api app.

If you're familiar with PHP apps and running PHP on production (for example using fastCGI or FPM) - NodeJS works totally different way. It's not executing `node` process per each request but rather running an internal http server which serves all the subsequent requests. It's single threaded, long running task. Because of that specific it's fairly easy to get into memory leaks problems; especially with the `vue-storefront` app which is far more complex than the API.

How did you know you encounter the memory leaks? The `pm2` [memory ussage](http://pm2.keymetrics.io/docs/usage/monitoring/) (`yarn pm2 status` or `yarn pm2 monit` for details) is growing with each page refresh.

Vue.js docs has pretty good section on [how to avoid Vue.js memory leaks](https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html). 

One of the key points there is that you should avoid `Vue.use` and make sure it's called always just `once`. In the Vue Storefront code you can pretty often find a snippet like this:

```js
import { once } from '@vue-storefront/core/helpers'
once('__VUE_EXTEND_RR__', () => {
  Vue.use(VueRouter)
})
```
Feel free to use it around all your plugins and mixins instantiation. 

Another thing is to properly handle the events. Each `EventBus.$on` must have it's `EventBus.$off`. Please avoid the situation where **you bind the event in `created`  whenever possible**. The `created` is called in the SSR mode; if you bind in `beforeMount` it will be executed only in the CSR (client's browser) which is 99% desired behavior and you not risk the memory leaks on events.

### Quick wins

- PM2 is restarting the process after [1GB of RAM (by default)](https://github.com/DivanteLtd/vue-storefront/blob/4ed26d7f1978a9e798edcddf1cf2f970c3e64e4f/docs/guide/cookbook/hardcore.md#L49) - this can be adjusted and together with multiple node `instances` set in `ecosystem.json` it's pretty good work-around for memory leaks,
- We do have an **SSR Output Cache** in which rendered pages are stored in the Redis memory cache so no Vue SSR Renderer is being used; you just need to remember about the cache invalidation (there is a Tip for that in this doc). Output cache usually solves the memory leak issue the hard way - without eliminating the root cause. [Read more how to set it up](https://docs.vuestorefront.io/guide/basics/ssr-cache.html)
- Make sure you're having `runInNewContext` set to `true` (default value!) in [`core/scripts/server.js`](https://github.com/DivanteLtd/vue-storefront/blob/4ed26d7f1978a9e798edcddf1cf2f970c3e64e4f/docs/guide/cookbook/hardcore.md#L64); without it the [Stateful Singletons](https://github.com/DivanteLtd/vue-storefront/issues/2664) like `RouteManager` or `i18n` we're using will cause the memory leaks at huuge scale,
- We do have an **Static Pages Generator** - currently experimental feature - can generate the whole site into set of static HTML files so they could be served even directly from cloud provider/CDN - no memory leaks possible; waht you need to take care of in this mode is cache invalidation (not currently supported but easy to add). [Read more on static page generator](https://github.com/DivanteLtd/vue-storefront/pull/3256),
- In case of any concerns [find out how we dealt with memory leaks](https://github.com/DivanteLtd/vue-storefront/pulls?utf8=%E2%9C%93&q=is%3Apr+memory+is%3Aclosed+leak) in Vue Storefront core - and check if any of those edge cases can be a case for your project.

### Tracing memory leaks

There are many ways to trace the memory leaks, however we're using the browser tools (Memory profile) most of the times. [Here you have it explained in details](https://marmelab.com/blog/2018/04/03/how-to-track-and-fix-memory-leak-with-nodejs.html). Another usefull tools are [New Relic APM](http://newrelic.com) and [Google Trace](https://cloud.google.com/trace/docs/setup/nodejs)