# Building Composables

[[toc]]

___

While API Client is a data layer for the application composables are the business logic part based on [Vue.js Composition API](https://vue-composition-api-rfc.netlify.com/). This package should contain **only** the following Composition API functions responsible for interacting with specific pieces of eCommerce platform logic:
- `useProduct` to fetch, filter and sort products
- `useCategory` to fetch categories
- `useCart` to manage basket
- `useUser` to manage authorization and user profile
   - `useUserOrders` (subcomposable to `useUser`) to manage user orders that has already been placed
   - `useUserAddresses` (subcomposable to `useUser`) to manage user shipping addresses
- `useCheckout` to manage order processing
- `useLocale` to manage localization settings (only platform-specific ones, theme-specific ones like static content translations are handled by the theme)

Above functions together should cover 100% of your eCommerce platforms functionalities. The shouldn't rely on each other and should be able to used independently.

Every composable is exposing more or less following properties:
- **Main data object** - a single, readonly object that the rest of the composition function interacts with or depends on. For example in `useProduct` it's a `products` object that `search()` function interacts with.
- **Main function that interacts with data object** which usually calls the API and updates the main data object, For example in `useProduct` and `useCategory` it's a `search` method, in `useCart` it's a `loadCart()` method etc.
- **Supportive data objects** which are depending directly on indirectly on the main data object, for example, `loading`, `error` or `isAuthenticated` from `useUser` that is depending on `user` object.

Let's see an example of how Vue Storefront Composable could look like. This is how you can perform a product search:

```js
const { products, search, loading } = useProduct()

// We're performing a search method, so loading property value changes to `true`.
search({ id: '12345' })
// Once the api call is done `products` object is populated with the result and `loading` becomes `false` again.
```
