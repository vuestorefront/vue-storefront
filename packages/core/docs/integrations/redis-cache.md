# Redis cache

## Introduction

This package provides integration with [Redis](https://redis.io/). For more information about this topic, please refer to [SSR Cache](../performance/ssr-cache.md) page.

## Installation

Install required packages:

```sh
yarn add @vue-storefront/cache
yarn add @vue-storefront/redis-cache
```

Register `@vue-storefront/cache` module with following configuration:

```javascript
// nuxt.config.js

export default {
  modules: [
    ['@vue-storefront/cache/nuxt', {
      invalidation: {
        // Invalidation options
      },
      driver: [
        '@vue-storefront/redis-cache',
        {
          version: "1.0.0", // Your versionning strategy
          defaultTimeout: 86400,
          redis: {
            host: 'localhost',
            port: 6379,
            password: 'password'
          }
        }
      ]
    }]
  ]
};
```

We can break down package configuration into two pieces:

* `invalidation` - please refer to [SSR Cache configuration](../performance/ssr-cache.md) page.
* `driver` - object containing:
  * `version` - Providing a version will permit to share to cache betweent all instance of NodeJS across your architecture.
  * `defaultTimeout` - number of seconds until records expire, even if not invalidated;
  * `redis` - object directly passed to [ioredis](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options);

:::warning if `version` is not provided a fallback version will be generated on *each* instance of NodeJS.
:::
