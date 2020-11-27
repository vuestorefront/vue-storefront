# Caching

Overview here

## Installation
```sh
yarn add @vue-storefront/cache
```

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
import { useCache } from '@vue-storefront/cache';
import redisDriver from '@vue-storefront/cache-redis'

const cache = useCache(); // Inside setup
cache.addTags([{ prefix: 'P', value: '123' }]) // adds tags
cache.setTags((currentTags) => [...currentTags, { prefix: 'P', value: '123' }]) // adds tags, also you can skip previous one
cache.getTags(); // returns current tags
```

## Nuxt compatibility
Add it to **modules** not **buildModules** - it is very important.

```js
['@vue-storefront/cache/nuxt', {
  server: {
    invalidateEndpoint: '/cache-invalidate',
    invalidators: ['./invalidator'],
    driver: ['./exampleCache', { test: 1 }]
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
import { useCache } from '@vue-storefront/cache';

setup () {
  const cache = useCache();
  cache.addTags([{ prefix: 'P', value: '123' }]);
}
```
