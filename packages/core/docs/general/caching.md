# Caching

Overview here


## How it works?

## Invalidators

```ts
const commercetoolsProductInvalidator = (response) => {
  return response.products.map(p => p.id)
}

const commercetoolsCategoryInvalidator = (response) => {
  return response.categories.map(p => c.id)
}
```

## The driver


```ts
const CacheDriver = (options, invalidators) => {
  const exampleCache = new Redis(options);

  return {
    invoke: async ({ getTags, render }) => {
      if (exampleCache.hasCache()) {
        return exampleCache.getCache()
      }

      const content = await render();
      exampleCache.storeCache(getTags(), content)
      return content;
    },
    invalidate: ({ req, res }) => {
      invalidators.forEach(invalidator => invalidator(req))
    }
  };
};
```

## Core mechanism


```ts
import { cache } from '@vue-storefront/core';
import redisDriver from '@vue-storefront/cache-redis'

cache.registerCacheDriver(redisDriver(options, invalidators))

cache.addTags([{ prefix: 'P', value: '123' }]) // adds tags
cache.setTags((currentTags) => [...currentTags, { prefix: 'P', value: '123' }]) // adds tags, also you can skip previous one
cache.getCacheDriver(); // returns current cache driver
cache.getTags(); // returns current tags
```

## Nuxt compatibility

```js
['@vue-storefront/nuxt', {
  cache: {
    server: {
      invalidateEndpoint: '/cache-invalidate',
      invalidators: ['./invalidator'],
      driver: ['./exampleCache', { test: 1 }]
    }
  }
}]
```

## Tagging from integration composables

```ts
const factoryParams = {
  getCacheTags: (response): CacheTags[] => {
    return [
      prefix: 'P', value: '123' },
      prefix: 'P', value: '456' },
      prefix: 'P', value: '789' }
    ]
  }
}
```

## Tagging in the components

```ts
import { cache } from '@vue-storefront/core';

setup () {
  cache.addTags([{ prefix: 'P', value: '123' }])
}
```
