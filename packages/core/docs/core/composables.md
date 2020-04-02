
# Composables

While API Client is a data layer for the application composables are the business logic part based on [Vue.js Composition API](https://vue-composition-api-rfc.netlify.com/). This package contains the following Composition API functions responsible for interacting with specific parts of eCommerce platform logic:
- `useProduct` to fetch, filter and sort products
- `useCategory` to get the information about category
- `useCart` to manage basket
- `useUser` to manage authorization and user profile
   - `useUserOrders` (subcomposable to `useUser`) to manage user orders that has already been placed
   - `useUserAddresses` (subcomposable to `useUser`) to manage user shipping addresses
- `useCheckout` to manage order processing
- `useLocale` to manage localization settings (only platform-specific ones, theme-specific ones like static content translations are handled by the theme)


Each of this function works independently and combined they are covering all the logic of your eCommerce platform.

Every composable is exposing more or less following properties:
- **Main data object** - a single, readonly object that the rest of the composition function interacts with or depends on. For example in `useProduct` it's a `products` object that `search()` function interacts with.
- **Main function that interacts with data object** which usually calls the API and updates the main data object, For example in `useProduct` and `useCategory` it's a `search` method, in `useCart` it's a `loadCart()` method etc.
- **Supportive data objects** which are depending directly on indirectly on the main data object, for example, `loading`, `error` or `isAuthenticated` from `useUser` that is depending on `user` object.
- **Getters** functions that can help you extract certain properties from complex objects and transform them to UI-friendly form, for example, we can use `productGetters.getproductAttributes()` function to extract attribute list from a certain product. **There are always the same getters for every eCommerce platform and they are always returning the same formats** which makes them a great tool to keep your frontend backend-agnostic if needed.

Let's see an example of how Vue Storefront Composable could look like. This is how you can perform a product search in Vue Storefront:

```js
const { products, search, loading, productGetters } = useProduct()

// We're performing a search method, so loading property value changes to `true`.
search({ id: '12345' })
// Once the api call is done `products` object is populated with the result and `loading` becomes `false` again.

// Then when we want to extract attributes list from prduct object and transform them to UI-friendly form ([{ name, value, label }]) we can use a getter. We're making it a computed property so when the `search` method will be invoked again and `product` will change the `attributes` object will change as well.
const attributes = computed(() => productGetters.getproductAttributes(product.value[0]))
```
