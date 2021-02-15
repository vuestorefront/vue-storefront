# Server Side Rendering Cache

## Introduction

Caching allows saving pages rendered on the server for later use, to avoid computationally expensive rendering from scratch. This is especially useful when the application has pages that require a lot of computation, many API calls, or change infrequently. It not only reduces the load on the server but also greatly improves performance.

Caching in Vue Storefront requires two packages:
* `@vue-storefront/cache` - Nuxt.js module, that does the heavy lifting. It registers required plugins, creates [invalidation endpoint](#invalidating-cache), and hooks into the render cycle. 
* **the driver** - thin layer on top of `@vue-storefront/cache` that integrates with caching solutions, such as [Redis](https://redis.io/) or [Memcached](https://memcached.org/).

Vue Storefront team provides [integration with Redis](../integrations/redis-cache.md).

If you'd like to know how to build your own driver, please [see this page](../integrate/cache-driver.md).

## Installation

### Dependencies

To enable caching in Vue Storefront you will need two packages - `@vue-storefront/cache` and driver package.

```sh
yarn add @vue-storefront/cache
yarn add <DRIVER-NAME> # eg. @vsf-enterprise/redis-cache
```

### Configuration

The next step is to register `@vue-storefront/cache` package as a module in `nuxt.config.js` with driver and invalidation configuration.

::: warning Be careful
Make sure this package is added to the `modules` array, not `buildModules`.
:::

```javascript
// nuxt.config.js

export default {
  modules: [
    ['@vue-storefront/cache/nuxt', {
      invalidation: {
        endpoint: '/cache-invalidate',
        key: 'CHANGE_THIS'
      },
      driver: [
        '<DRIVER NAME>',
        {
          driverConfig
        }
      ]
    }]
  ]
};
```

We can break down package configuration into two pieces:

* `invalidation` (optional object) - contains URL to invalidate cache and key used to prevent unauthorized access.
* `driver` (array or string) - contains the path to or name of the driver package and its configuration. If the driver doesn't require any configuration, you can pass a string instead of an array. Please refer to the documentation of the driver you are using for more information.

###  Tags

If you follow the above steps and run the application, you won't see any performance difference. This is because only pages with tags are cached.

Please refer to the [Using tags](#using-tags) section for more information.

## How it works?

When the page is requested, the cache driver checks if there is an already rendered page in the cache matching the current route. If there is, it will serve the cached version. Otherwise:

1. Current page will be rendered on the server.
2. If the page contains tags, the result will be saved in the cache.
3. Page is served to the user.

## Using tags

Tags are strings associated with the rendered page and represent elements of the page that are dynamic and can change in the future. They consist of prefix and unique ID associated with the dynamic element.
For example category with the ID of 1337 would create a tag `C1337`.

Typical category page would have tags for:
* current category,
* all visible subcategories,
* all visible products.

**But why do we need them?**

When at least one tag associated with the given page is [invalidated](#invalidating-cache), the whole page is removed from the cache. For example, if one of the products is modified or disabled, we should invalidate cache for pages where this product is visible:
* Product page for this particular product.
* Other product pages, where this product is listed (upsell or cross-sell).
* Homepage, if the product is displayed in the carousel or listed as a popular item.
* Category page, where this product is listed.
* Search page, where this product is part of the results.

Additionally, all modifiers changing what is displayed on the page, such as pagination, filtering, and sorting options should be added as URL queries (for example `?sort=price-up&size=36&page=3`). This will cause different modifier combinations to be treated as different routes, and thus, cached separately.

::: warning
Don't use tags on pages, components, or composables specific to the current user, such as user profile pages or cart components.
:::

### How to use tags?

Tags should be registered in Vue components or composables. During Server Side Rendering, tags registered in the current route are associated with the rendered page.

To add tags, use `useCache` composable from `@vue-storefront/cache` package.

```javascript
// pages/Category.vue
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';

export default {
  setup() {
    const { addTags } = useCache();

    addTags([
      { prefix: CacheTagPrefix.View, value: 'category' },
      { prefix: CacheTagPrefix.Category, value: id },
      // or
      { prefix: 'V', value: 'category' },
      { prefix: 'C', value: id },
    ]);
  }
};
```

## Invalidating cache

As mentioned in [Configuration](#configuration) section, `@vue-storefront/cache` module provides option to create invalidation endpoint.

```javascript
invalidation: {
  endpoint: '/cache-invalidate',
  key: 'myUniqueKey'
}
```

To invalidate the cache, visit an URL provided in the configuration with two query strings:

* `key` - specified in the configuration and used to prevent unauthorized users from clearing the application's cache. For this reason, you should use long and hard to guess keys.
* `tags` - comma (`,`) separated tags to be invalidated. Internally `prefix` and `value` provided to `addTags` method are combined into one string, so `{ prefix: 'V', value: 'category' }` becomes `Vcategory` and `{ prefix: 'C', value: 123 }` becomes `C123`.

Using settings above and default Vue Storefront configuration, invalidation URL should look like this:

```
http://localhost:3000/cache-invalidate?key=myUniqueKey&tags=Vcategory,C123
```
