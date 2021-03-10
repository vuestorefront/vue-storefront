# Calling integration APIs

## How do Integrations work?

In Vue Storefront, single integration has its own sort of software development kit (SDK) library. This library is named API-client and contains a set of functions. Each function is dedicated to one action, endpoint or a feature eg. `getProduct`, `loadCart` `addToCart`. For example, when you call `getProduct`, it will request the integration API and return its response in the original format of a given platform.

## Accessing integration methods on the frontend

To access API-client functions, you can use the composable function `useVSFContext`:

```ts
// each platform has different tag to access its methods, eg $spryker, $storyblok etc.
const { $ct } = useVSFContext();

$ct.api.getProduct({ id: 1 })
```

In the example above we have accessed the API-client for commercetools (Each integration has dedicated tag name, look at [context docs](/advanced/context)) and we called function `getProduct`.



## Extending Integrations

Sometimes, it's necessary to override the original behavior either API-client or even an entire request that comes from an external platform.
The Vue Storefront also provides a possibility to do this by using [middleware extensions](/advanced/server-middleware)
