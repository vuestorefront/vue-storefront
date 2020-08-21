# Server-side rendering

Sometimes our composables needs to load some data and share that state between client and the server side.
We provide our custom mechanism to create server-side rendered pages used with composables functions.

## Usage

In the most cases, the composable functions provide SSR support (it is always transparent for developer).
To build that composable you have to create a new composable-factory with using `vsfRef` instead of regular `ref`.

```js
import { vsfRef } from '@vue-storefront/core';

const useCategory = (cacheId) => {
  const categories = vsfRef([], cacheId);

  const search = async (params) => {
    categories.value = await factoryParams.categorySearch(params);
  };

  return {
    search,
    categories: computed(() => categories.value)
  };
};
```

The `vsfRef` is special ref type that shares the state between server and the client side. When it comes to usage the ssr-supported composable, you need to wrap everything that should be called on the server with `onSSR`.


```js
import { useCategory } from 'your/integration/composables';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const { search, categories } = useCategory('categories');

    onSSR(async () => {
      await search();
    })

    return {
      categories
    }
  }
}
```


## Your own SSR implementation

It's possible to create your own implementation of shared-state (we provide it too). In that case you have to provide implementation of the `onSSR` and `vsfRef`.

```js
import { configureSSR } from '@vue-storefront/core';

configureSSR({
  vsfRef: (val) => createRef(val),
  onSSR: (fn) => fn()
});
```

In our implementation, we used nuxt API where `vsfRef` becomes ssrRef and `onSSR` is mostly pure `onServerPrefetch`:


```js
import { configureSSR } from '@vue-storefront/core'
import { ssrRef, onServerPrefetch } from '@nuxtjs/composition-api';

configureSSR({
  vsfRef: ssrRef,
  onSSR: onServerPrefetch,
});
```
