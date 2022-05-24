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
      enabled: true,
      invalidation: {
        // Invalidation options
      },
      driver: [
        '@vue-storefront/redis-cache',
        {
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

We can break down package configuration into three pieces:

* `enabled` (required boolean) - contains boolean value, that is responsible for the package's running status.
* `invalidation` - please refer to [SSR Cache configuration](../performance/ssr-cache.md) page.
* `driver` - object containing:
  * `defaultTimeout` - number of seconds until records expire, even if not invalidated;
  * `redis` - object directly passed to [ioredis](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options);


::: warning
If you are using VSF cloud, please make sure that the redis host is set to `redis`, otherwise, your VSF app will no connect to the Redis server!
:::
