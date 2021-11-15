# Server-side rendering

In Vue Storefront, we rely on Nuxt.js as a server-side rendering provider. Although it is a powerful framework, we needed to extend it to meet our needs.

## Configurable SSR

As this is a temporary workaround, we have provided a configurable mechanism that can provide your own SSR implementation.
It's pretty useful for non-Nuxt.js users - if you don't want to use Nuxt.js, you can still provide your own SSR.

The configuration is done by a single function called `configureSSR` that takes two fields:

- `vsfRef` - a special implementation of `ref` that can work on SSR.
- `onSSR` - you may have seen that in our theme, it's the function that can handle async calls and share the results between the server and the client-side. It works in the same way as `fetch` from Nuxt.js + Vue.js 2

::: tip
  For now, vsfRef is just ssrRef from `@nuxtjs/composition-api`, and `onSSR` is our implementation with using `onServerPrefetch`.
  In the future, vsfRef will be replaced by ordinary `ref` and `onSSR` will become `useFetch` from Nuxt.js
:::


## Current implementation

Below you can find our current implementation. By default, we provide it as a nuxt-module (`@vue-storefront/nuxt`), so if you are Nuxt.js user, you don't have to do anything - this implementation is provided automatically. If you are not using Nuxt.js, try to copy this piece of code and modify it to cover your needs. The resulting code will still be very similar.

```js
import { configureSSR } from '@vue-storefront/core'
import { ssrRef, getCurrentInstance, onServerPrefetch } from '@nuxtjs/composition-api';

const ssrPlugin = () => {
  let previousRoute = '';

  configureSSR({
    vsfRef: ssrRef,
    onSSR: (fn) => {
      onServerPrefetch(fn);
      if (typeof window !== 'undefined') {
        const vm = getCurrentInstance();
        if (previousRoute !== vm.$route.fullPath) {
          fn();
        }

        previousRoute = vm.$route.fullPath;
      }
    }
  });
};

export default ssrPlugin;
```

## Future replacement

Once Vue 3 and Nuxt.js can talk together, we'll replace this implementation using `configureSSR` so it will be transparent for you.

## Usage 


```js
setup () {
  const product = vsfRef({}, 'product-key')

  onSSR(async () => {
    product.value = await getProduct();
  });

  return { product }
}
```

::: tip
  Remember to provide a unique key for `vsfRef` - it's required for the correct hydration.
:::
