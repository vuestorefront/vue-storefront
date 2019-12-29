# Chef's secret note: Hardcore training for serious business
<style>
h4 {
    font-weight: 500;
}
</style>
:::tip GUIDE
This cookbook doesn't have recipes but provide you with a checklist before launching your _VSF_ on production. You can tick the list off one by one having your instance compared with, so that making your _restaurant_ ready for _Michelin Inspection_.
:::

In this chapter, we will cover : 

[[toc]]

## 0. Introduction

_VueStorefront_ is getting tremendous attention from the market and gain traction from developers with more than 20 sites running on production. In the mean time, _VueStorefront_ framework evolves with each new release and the docs can hardly catch up with it! 

These training materials are a set of chief-recipes, experiences learned from the trenches. I’m trying to answer how to run _VueStorefront_ on production, troubleshoot most of the common problems and explain all the hidden features of _VueStorefront_ that can help you scale the application and solve most common issues.

Some topics here were taken from [frequently asked questions in our Forum](https://forum.vuestorefront.io/c/help). Some [came from Slack](http://slack.vuestorefront.io). Some came from core-consulting and our own works. One thing in common; each and every recipe is super-crucial for stable _VueStorefront_ run on production and they all cause some serious results when executed carelessly. 

## 1. Memory leaks
_VueStorefront_ consists of two Node.js applications:
- `vue-storefront` - which is the frontend app, with the entry point of [`core/scripts/server.js`](https://github.com/DivanteLtd/vue-storefront/blob/4ed26d7f1978a9e798edcddf1cf2f970c3e64e4f/core/scripts/server.js#L269)
- `vue-storefornt-api` - which is backend/api app.

If you're familiar with PHP web application and running PHP on production, be it fastCGI or FPM, _Node.js_ works totally different way. It's not executing `node` process per each request but rather running an internal http server which serves all the subsequent requests. It's single threaded, long running task. That's why it's fairly easy to get into memory leaks problems; especially with the `vue-storefront` app which is far more complex than the API.

### Protip

#### 1. First thing first, monitor memory leaks
How do you know you have memory leaks undercover? 

Start with `yarn pm2 status` or `yarn pm2 monit` for details from _VueStorefront_ root directory. 

The `pm2` [memory usage](http://pm2.keymetrics.io/docs/usage/monitoring/) is growing with each page refresh.

_PM2_ restarts the process after [1GB of RAM (by default)](https://github.com/DivanteLtd/vue-storefront/blob/master/ecosystem.json#L5) is in use; This can be adjusted and together with multiple node `instances` set in `ecosystem.json`, it's pretty good work-around for memory leaks.

Additionally, there are many ways to trace memory leaks, however we're using the browser tools (Memory profile) most of the time. [Here you have it explained in details](https://marmelab.com/blog/2018/04/03/how-to-track-and-fix-memory-leak-with-nodejs.html). Another useful tools are [New Relic APM](http://newrelic.com) and [Google Trace](https://cloud.google.com/trace/docs/setup/nodejs)


#### 2. How to use Vue plugins

One thing you must avoid is using `Vue.use` multiple times and you can make it sure by calling it always inside `once`. In the _VueStorefront_ code you can pretty often find a snippet like this:

```js
import { once } from '@vue-storefront/core/helpers'
once('__VUE_EXTEND_RR__', () => {
  Vue.use(VueRouter)
})
```
This is a helper __helping__ you safely use plugins. Feel free to use it around with all your plugins and mixins instantiation. 

:::tip FURTHER STUDY
Vue.js docs has pretty good section on [how to avoid Vue.js memory leaks](https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html). 
:::

#### 3. Handling _Events_ in a proper way

Another thing is to properly handle the events. Each `EventBus.$on` must have its corresponding `EventBus.$off`. You should be carefully turn them on and off in its life cycle.

Secondly, please avoid the situation where **you bind the event in `created` hook**  whenever possible.
The `created` is called in the SSR mode or server side in plain English; But if you bind in `beforeMount` it will be executed only in the CSR (which stands for Client Side Rendering or simply client's browser) which is 99% desired behavior and you won't risk the memory leaks on events.

#### 4. Stateful Singleton

Make sure you have `runInNewContext` set to `true` (default value!) in [`core/scripts/utils/ssr-renderer.js`](https://github.com/DivanteLtd/vue-storefront/blob/master/core/scripts/utils/ssr-renderer.js#L16).

With setting it `false`, the [Stateful Singletons](https://github.com/DivanteLtd/vue-storefront/issues/2664) like `RouteManager` or `i18n` we're using will cause the memory leaks at huuuuuge scale.


#### 5. Static pages generator

We do have **Static Pages Generator** - currently experimental feature - that can generate the whole site into a set of static HTML files so they could be served even directly from cloud provider/CDN - no memory leaks possible; waht you need to take care of in this mode is cache invalidation (not currently supported but easy to add). [Read more on static page generator](https://github.com/DivanteLtd/vue-storefront/pull/3256).

#### 6. Learn from core team
In case you want to dig deeper any concern related to memory leaks, [find out how core teams have dealt with memory leaks](https://github.com/DivanteLtd/vue-storefront/pulls?utf8=%E2%9C%93&q=is%3Apr+memory+is%3Aclosed+leak) in _VueStorefront_ core - and check if any of those edge cases solved can be an inspiration for your project.


<br />
<br />

## 2. SSR Output cache
_VueStorefront_ supports [Server Side Rendering](https://vuejs.org/v2/guide/ssr.html). In this mode the same code which is executed in browser (CSR; Client Side Rendering), runs on the server in order to generate the HTML markup. The markup, then, gets transfered to the browser, rendered (extremly fast as the browsers have been all optimized to ... render html text in the last 20+ years) and [hydrated](https://ssr.vuejs.org/guide/hydration.html) from the [initial state](https://ssr.vuejs.org/guide/data.html#final-state-injection). During this whole procedure the client side or say browser scripts can use exactly the same code base universally. Another cool feature is that static HTML markup is well indexed by Search Engine crawlers which is extremely important for SEO.

Usually, _VueStorefront_ works pretty fast and all SSR requests are finished in between 100-300ms; However, if your database is huge or your server resources are low, or probably the traffic is extremely high you might want to enable the output cache. The other reason is that you might want to use SSR cache to prevent memory leaks or should I say, hide them ;)

### Protip

#### 1. SSR Cache docs

The SSR cache is [pretty well documented in our docs](/guide/basics/ssr-cache.html). What's important; It works for both: `vue-storefront` and `vue-storefront-api`.

[Read on all the caching mechanisms](https://medium.com/the-vue-storefront-journal/caching-on-production-10b00a5614f8) that Vue Storefront is using.

#### 2. Using Redis tagging

With the SSR Output cache mode enabled, the [`core/server.js`](https://github.com/DivanteLtd/vue-storefront/blob/e96bc3c0d1ef8239bc2e64c399f1fe924cebed36/core/scripts/server.js#L187) stores the rendered output pages along with http headers into Redis cache. If the page exists in Redis, then it gets served without even starting the Vue SSR Renderer.

Vue Storefront uses Redis in order to use the [`redis-tagging`](https://www.npmjs.com/package/redis-tagging) library. Naming and caching are two most ddifficult areas of software development. Cache tagging helps us to deal with cache invalidation.

Vue Storefront tags the output pages with [product](https://github.com/DivanteLtd/vue-storefront/blob/e96bc3c0d1ef8239bc2e64c399f1fe924cebed36/core/modules/catalog/helpers/search.ts#L69) and [category](https://github.com/DivanteLtd/vue-storefront/blob/e96bc3c0d1ef8239bc2e64c399f1fe924cebed36/core/modules/catalog/store/category/actions.ts#L121) tags. Then all the indexers including: `magento1-vsbridge-indexer`, `mage2vuestorefront` and `magento2-vsbridge-indexer` will invalidate the cache, by specific _product_ or _category_ _ID_. It means the [`invalidate`](https://github.com/DivanteLtd/vue-storefront/blob/e96bc3c0d1ef8239bc2e64c399f1fe924cebed36/core/scripts/server.js#L156) method will clear out the cache pages tagged with this specific _product id_. 

:::tip NOTE
 This URL requires you to pass the invalidation token set in the [config](https://github.com/DivanteLtd/vue-storefront/blob/e96bc3c0d1ef8239bc2e64c399f1fe924cebed36/config/default.json#L12).
:::

You can add any number of the specific cache tags - by just extending the [`availableCacheTags`](https://github.com/DivanteLtd/vue-storefront/blob/e96bc3c0d1ef8239bc2e64c399f1fe924cebed36/config/default.json#L11) and/or [pushing the tags to `ssrContext`](https://github.com/DivanteLtd/vue-storefront/blob/e96bc3c0d1ef8239bc2e64c399f1fe924cebed36/core/pages/Home.js#L19) so they can be used by `core/scripts/server`.

This `context` argument passed to `asyncData()` is actually the same context object used by [`core/scripts/server.js`](https://github.com/DivanteLtd/vue-storefront/blob/e96bc3c0d1ef8239bc2e64c399f1fe924cebed36/core/scripts/server.js#L168), so we're using it as transfer object for passing the tags back and forth between server and Vue.js application.

#### 3. Invalidating SSR cache

:::tip NOTE
With the SSR cache enabled (in the `vue-storefront-api` or `vue-storefront` app) please make sure, you're not using the cache on different layer (for example Varnish or nginx). Otherwise the cache invalidation mechanism won't work. 
:::

The dynamic tags config option: `useOutputCacheTagging` - if set to `true`, Vue Storefront generates the special HTTP Header `X-VS-Cache-Tags`

```js
res.setHeader('X-VS-Cache-Tags', cacheTags);
```

Cache tags are assigned regarding the products and categories that are used on the specific page. A typical `X-VS-Cache-Tags` tag looks like this:

```
X-VS-Cache-Tags: P1852 P198 C20
```

The tags can be used to invalidate the Varnish cache if you use it. [Read more on that](https://www.drupal.org/docs/8/api/cache-api/cache-tags-varnish).

:::tip NOTE
 All the official Vue Storefront data indexers including [magento1-vsbridge-indexer](https://github.com/DivanteLtd/magento1-vsbridge-indexer), [magento2-vsbridge-indexer](https://github.com/DivanteLtd/magento2-vsbridge-indexer) and [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) support the cache invalidation. 

 If the cache is enabled in both API and Vue Storefront frontend app, please make sure you properly use the `config.server.invalidateCacheForwardUrl` config variable as the indexers can send the cache invalidate request only to one URL (either frontend or backend) and it **should be forwarded** to the other. Please check the default forwarding URLs in the `default.json` and adjust the `key` parameter to the value of `server.invalidateCacheKey`.
:::
<br />
<br />


## 3. Avoiding prices desynchronization 

Vue Storefront indexers (`magento2-vsbridge-indexer`, `magento1-vsbridge-indexer`, `mage2vuestorefront`) all store the product price (before/after catalog rules applied) into the Elasticsearch. But Elasticsearch can be easily out of sync or the synchronization can be lagged. To avoid the risk of displaying an incorrect price to the customers, Vue Storefront has at least 3 mechanisms - with the `alwaysSyncPlatformPricesOver` on the top.

:::tip NOTE
If you're using the `mage2vuestorefront` for syncing the products please make sure you're syncing the prices **after catalog rules** applied. For this purpose we have special flags to be set on:

```bash
export PRODUCTS_SPECIAL_PRICES=true
export PRODUCTS_RENDER_PRICES=true
node --harmony cli.js products --removeNonExistent=true --partitions=1
```
:::

### Protip

#### 1. _alwaysSyncPlatformPricesOver_


<br />
<br />

## 4. Avoiding stock desynchronization


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 5. How Vue Storefront calculates prices and taxes


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 6. Limiting SSR HTML size a.k.a. INITIAL_STATE optimization


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 7. Url Dispatcher explained 


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 8. Multistore configuration explained


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 9. HTML minimization, compression, headers


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 10. Production catalog indexing + cache invalidation


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 11. Using Magento Checkout


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 12. ElasticSearch production setup


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 13. .htaccess, server side redirects, HTTP codes and headers, middlewares


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 14. Which fields of product, category and attribute are really being used by VSF


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 15. Unexpected features (explained by config file properties)


### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />