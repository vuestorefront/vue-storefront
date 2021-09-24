# Server-side rendering

In Vue Storefront we rely on Nuxt.js as a server-side rendering provider and we highly recommend this as well.
However Nuxt.js has everything we need when it comes to SSR, we had to provide a bit more to this implementation.

First of all. As we still wait for fully integration Vue 3 and Nuxt.js and the current SSR based on
composition-api didn't cover our needs, we had to temporarily sort it out on our own.

## Configurable SSR

As this is a temporary workaround, we have provided a configurable mechanism that can provide your own SSR implementation.
It's pretty useful for non-Nuxt.js users - if for some reason you don't want to use Nuxt.js, you can still provide your own SSR.

The configuration is done by single function called `configureSSR` that takes two fields:

- `vsfRef` - a special implementation of `ref` that can work on ssr.
- `onSSR` - you may have seen that in our theme, it's the function that can handle async calls, and share the results between server and the client side. It works in the same way as `fetch` from nuxt.js + vue 2

::: tip
  For now, vsfRef is just ssrRef from `@nuxtjs/composition-api`, and `onSSR` is our implementation with using `onServerPrefetch`.
  In the future vsfRef will be replaced by ordinary `ref` and `onSSR` will become `useFetch` from Nuxt.js
:::


## Current implementation

Below is the our current implementation. By default we provide it as a nuxt-module (`@vue-storefront/nuxt`) so if you are Nuxt.js user, you don't have to do anything - this implementation is provided automatically. If you are not using Nuxt.js, try to copy this piece od code and modify to cover your needs. The result code will be still very similar.

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
  Remember to provide an unique key for `vsfRef`, it's demanded for the correct hydration.
:::
