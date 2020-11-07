# Vue Storefront API Design Philosophy

While designing something so complex as Vue Storefront it's vital to set up rules that will guide us when designing APIs. The purpose of those rules is to make sure that problems ale solved in a similar, predictable and consistent to understand way which will highly contribute to the learning curve of the framework itself.


## General rules


1. We build **simple**, **declarative** and **general-purpose** APIs that are not tied to implementation details or a specific solution to a problem. That way we can ensure that our APIs will remain  general-purpose and won't break on updates even if we do heavy changes in the underlying business logic.
2. API Surface should be possibly minimal. If there is a feature that can be achieved with already existing APIs we shouldn't add new ones just to make it simplier.
3. Focus on good defaults and embracing [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration) paradigm. Every API should work as it is for most of the use cases and have ability to be configured for other ones.
4. If you introduce a new, commonly used feature (like cache) try to provide a default configuration out of the box and let users customize it so they don't have to configure for the most common use cases, only for custom ones. This approach will dreastically reduce the number of boilerplate code users has to write.
```js
import { ueProduct } from '@vue-storefront/{eCommerce}'
import { cacheManager } from '@vue-storefront/core'

const { search } = useProduct()

// composable is handling most common scenario under the hood
search({ id: '123'}) // under the hood adds cache tag `P123`

// you can always modify the default tags
cacheManager.setTags((tags) => {
  tags.push('C123')
  return tags
})
```
5. APIs should not limit the users. If we can't fulfill all use cases with parameters we should provide extension points so users can do this by themselves.
6. Same code should work on every platform (excluding specific object properties and search params)
7. Follow Domain-Driven Design principles. Try to keep everything related to a specific domain within its composable.
```
"Separating concerns by files is as effective as separating school friendships by desks. Concerns are “separated” when there is no coupling: changing A wouldn’t break B. Increasing the distance without addressing the coupling only makes it easier to add bugs.
~ Dan Abramov
```
8. Composables should be independent and rely on each other only if they are from the same group (`useUser` `useUserOrders`). The only exception is `useUser` that has to be used in many other composables.
9. If you introduce a new feature shared across all/many composables (like Logging/cache) users should be able to configure this feature from core/core nuxt module.
```ts
// every function in composables is using logger
const removeFromCart = async (product: CART_ITEM, customQuery?: CustomQuery) => {
  Logger.debug('userCart.removeFromCart', { product })
  loading.value = true;
  const updatedCart = await factoryParams.removeFromCart(
    {
      currentCart: cart.value,
      product
    },
    customQuery
  );
  cart.value = updatedCart;
  loading.value = false;
};
```
```js
// there is only one palce where we're configuring the logger - core
['@vue-storefront/nuxt', {
  coreDevelopment: true,
  logger: { // new section here
    verbosity: 'error' // verbosity    customLogger: logger // your own implementation as function

  },
}]
```
10. If a feature is platform-specific and not shared across whole application provide integration through its config/nuxt module.
11. Provide a core interface for every feature, no matter if its paid or not (implementation can be paid, the way of implementing this feature by the user has to be always provided)