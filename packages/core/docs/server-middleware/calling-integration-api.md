# Calling integration APIs

## How do integrations work?

In Vue Storefront, every integration consists of a library called API-client that contains a set of functions. Each function is an endpoint like:

* `getProduct`,
* `loadCart`,
* `addToCart`.

For example, when you call `getProduct`, it might send a request to the integration API and return the response containing a list of products in the format of a given platform.

## Accessing integration methods on the frontend

To access API-client functions, you can use the composable function `useVSFContext`:

```typescript{1,5-6,9-10}
import { useVSFContext, onSSR } from '@vue-storefront/core';

export default {
  setup() {
    // Every platform has different tag to access its methods, eg. $spryker, $storyblok etc.
    const { $ct } = useVSFContext();

    onSSR(async () => {
      // Every platform has different set of API methods
      await $ct.api.getProduct({ id: 1 });
    });
  }
}
```

In the example above, we access the API-client for `commercetools` and call the `getProduct` API function. Each integration has a unique tag name. For more information, see the [Context API](/advanced/context.html) page.

## Extending Integrations

Sometimes, it might be necessary to override the original behavior for either API-client or even an entire request from an external platform. In Vue Storefront, it's possible by [Extending integrations](/integrate/extending-integrations.html).
