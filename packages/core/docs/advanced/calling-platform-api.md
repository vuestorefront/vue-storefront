# Calling platform API

The Vue Storefront has its own way to communicate with other platform APIs. First of all, each integration implements an API-client that defines an interaction and connection with a given platform. Each time you make a call to the external platform, you actually use API-client beneath. We use that in all of the integrations and also you can reach the API-client in your project if it's needed.

## How do Integrations work?

Basically, API-client is a sort of SDK for a given platform you integrate with. It has a set of functions, each is dedicated to one action, endpoint, feature, or something else. It's aiming to provide an abstraction for the developers when it comes to making calls.

## Using useVSFContext to access integration API Client methods

To access API-client functions, you can use the composable function `useVSFContext` that reads from the application context every possible integration so you can easily access it.

```ts
const { $ct } = useVSFContext();

$ct.api.getProduct({ id: 1 })
```

In the example above we have accessed the API-client for commercetools (Each integration has dedicated tag name, look at [context docs](/advanced/context)) and we called function `getProduct`.


::: tip
Remember that API-client you are accessing from the front-end side is only a stub. It's making a call to our middleware where the real API-client is being called. For more info, jump to the [server middleware](/advanced/server-middleware) section.
:::

## Extending API Client

Sometimes, it's necessary to override the original behavior either API-client or even an entire request that comes from an external platform. The Vue Storefront also provides possibility to do this by using [middleware extensions](/advanced/server-middleware)
