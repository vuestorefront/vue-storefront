
# Composables

While API Client is a data layer for the application composables are the business logic part based on [Vue.js Composition API](https://vue-composition-api-rfc.netlify.com/). This package contains the following Composition API functions responsible for interacting with specific parts of eCommerce platform logic:
- `useProduct` to fetch, filter and sort products
- `useCategory` to fetch categories
- `useCart` to manage basket
- `useUser` to manage authorization and user profile
   - `useUserOrder` (subcomposable to `useUser`) to manage user orders that has already been placed
   - `useUserAddresses` (subcomposable to `useUser`) to manage user shipping addresses
- `useCheckout` to manage order processing

Each of this function works independently and combined they are covering all the logic of your eCommerce platform.

Every composable is exposing more or less following properties:
- **Main data object** - a single, readonly object that the rest of the composition function interacts with or depends on. For example in `useProduct` it's a `products` object that `search()` function interacts with.
- **Main function that interacts with data object** which usually calls the API and updates the main data object, For example in `useProduct` and `useCategory` it's a `search` method, in `useCart` it's a `load()` method etc.
- **Supportive data objects** which are depending directly on indirectly on the main data object, for example, `loading`, `error` or `isAuthenticated` from `useUser` that is depending on `user` object.

Let's see an example of how Vue Storefront Composable could look like. This is how you can perform a product search:

<Content slot-key="example-product-search" />

At the moment of invoking a `search` method the`loading` property value changes to `true`. Once the api call is done `products` object is populated with the result and `loading` becomes `false` again.

## Getters
::: tip
Usage of getters is coompletely optional. Use them where it makes sense to you.
:::

Sometimes its hard to extract certain subproperties from complex data objects like products or categories and display them in the UI in a simple way. This is the reason why we introduced **getters**. Every getter is a simple function you can use to extract certain subproperties from specific objects. Every composable has its corresponding getter functions.

<Content slot-key="example-product-search-getters" />

___

::: tip Writing backend-agnostic code
In many cases using getters can save you time and contribute to cleaner code but there is one more thing about getters that makes them really useful. They're always returning agnostic data formats. No matter which platform we're using `productGetters.getAttributes()` will always return the data in a same, UI-friendly format.

Because interfaces for composables and getters are the same for every platform the above code from above example will work exactly the each one of them. Because of that you can use getters to keep your frontend code agnostic regarding eCommerce platform. This approach can be really useful when you're considering a migration to different platform in the near future
:::

<Content slot-key="example-product-search-custom-query" />

