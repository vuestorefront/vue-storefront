# Create redirect (^1.13)

If you want to handle redirects, you have to think about the client side and the server side. This is because after hydration, VSF is like a normal SPA application.
On server side we use extended express `redirect` method and on client we use vue-router.
IMPORTANT: you can call `redirect` only once per request

## Redirect: asyncData

Best place to handle redirection is `asyncData`, because here we have access to server context from component.
We know that `context` exists only on server side so we can use it to check on which side asyncData is triggered.
```
import { router } from '@vue-storefront/core/app'
...
asyncData ({ context }) {
  if (context) {
    context.server.response.redirect('/new-url')
  } else {
    router.replace('/new-url')
  }
}
```

### Avoid unnecessary computation
Important thing is to return as soon as possible after making redirection to avoid unnecessary computation.
```
// Bad:
import { router } from '@vue-storefront/core/app'
...
asyncData ({ context }) {
  const requireRedirect = someMethodThatChecksRedirect()
  if (requireRedirect) {
    if (context) {
      context.server.response.redirect('/new-url')
    } else {
      router.replace('/new-url')
    }
  }
  heavyComputation()
}
```

```
// Good:
import { router } from '@vue-storefront/core/app'
...
asyncData ({ context }) {
  const requireRedirect = someMethodThatChecksRedirect()
  if (requireRedirect) {
    if (context) {
      context.server.response.redirect('/new-url')
    } else {
      router.replace('/new-url')
    }
    return
  }
  heavyComputation()
}
```

TIP: if you use multistore then its good to use `localizedRoute` helper. `router.replace(localizedRoute('/new-url'))`

## Redirect: AsyncDataLoader

If you need to make redirection outside of `asyncData` then you can also use `AsyncDataLoader` to handle it.
```
import { isServer } from '@vue-storefront/core/helpers'
import { router } from '@vue-storefront/core/app'
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
...
function makeRedirection () {
  if (isServer) { // we use `isServer` helper to be sure that `AsyncDataLoader` is triggered on server side and `context` exists.
    AsyncDataLoader.push({
      execute: async ({ context }) => {
        context.server.response.redirect('/new-url')
      }
    })
  } else {
    router.replace('/new-url')
  }
}
```
Make sure that after calling `makeRedirection()` you don't make unnecessary computation [same as it is with `asyncData`](redirect.md#avoid-unnecessary-computation)
