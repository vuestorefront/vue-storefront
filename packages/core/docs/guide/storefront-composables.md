# What are Vue Storefront composables

Composable is a function that uses [Composition API](composition-api.html) under the hood. Composables are the main public API of Vue Storefront and, in most cases, the only API except configuration you will work with.

You can treat composables as independent micro-applications. They manage their own state, handle server-side rendering, and rarely interact with each other (except [useUser](/composables/use-user.html) and [useCart](/composables/use-cart.html)). No matter what integration you are using, your application will always have the same set of composables with the same interfaces.

To use a composable, you need to import it from an integration you are using, and call it on the component `setup` option:

```js
import { useProduct } from '{INTEGRATION}';

export default {
  setup() {
    const { products } = useProduct('<UNIQUE_ID>');

    return {
      products
    };
  }
};
```

For some composables (like `useProduct` ) you will need to pass a unique ID as a parameter (it can be a product ID, category ID etc.). Others (like `useCart`) do not require an ID passed. You can always check a composable signature in the [API Reference](TODO)
