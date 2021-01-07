# Error handling

A flexible way of error handling is essential for a framework like Vue Storefront. As composables are hearth of our app - we decided to put there whole error handling mechanism.

Each composable returns `error` - computed property. It is an object which has names of async functions from composable as keys and Error instance or null as a value. 

Example usage:
```vue
<template>
  <button @click="addToCart(product)">Add to cart</button>
  <div v-if="error.addToCart">{{ error.addToCart.message }}</dIv>
</template>

<script>
export default {
  setup () {
    const { addToCart, error } = useCart()

    return {
      error
    }
  }
}
</script>
```

There is a dedicated interface for each composable, example one for the `useCart`:
```ts
export interface UseCartErrors {
  addItem?: Error;
  removeItem?: Error;
  updateItemQty?: Error;
  load?: Error;
  clear?: Error;
  applyCoupon: Error;
  removeCoupon?: Error;
}
```

## How to listen for errors?
Let's imagine you have some global components for error notifications. You want to send information about each new error to this component. But how to know when new error appears? You can observe error object with a simple watcher!

```ts
const { cart, error } = useCart()

watch(error, (error, prevError) => {
  if (error.value.addItem && error.value.addItem !== prevError.value.addItem) sendInAppNotification('error', error.value.addItem.message)
  if (error.value.removeItem && error.value.removeItem !== prevError.value.removeItem) sendInAppNotification('error', error.value.removeItem.message)
})
```

## Where can I find interface of the error property from a certain composable?
When you are writing a code inside a script part of the Vue's component, your IDE should give you hints dedicated for each type of composable. That's why you probably do not need to check these interfaces in the core's code.

However, if somewhy you still want to do that, you could find them inside [`packages/core/core/src/types.ts`](https://github.com/vuestorefront/vue-storefront/blob/next/packages/core/core/src/types.ts). Just search for `UseCartErrors` with your IDE inside.

Feel free to replace `UseCartErrors` with other composable name - `UseFacetErrors`, `UseWishlistErrors`, `UseProductErrors` etc.

## Where does error come from?
To better understand this part you should know what are factories of composables in our core.   

Inside each factory's async method we are clearing the current error before integration's method call and setting it in catch block.
```ts
const addItem = async ({ product, quantity, customQuery }) => {
  Logger.debug('useCart.addItem', { product, quantity });

  try {
    loading.value = true;
    error.value.addItem = null; // Clearing the current error
    const updatedCart = await factoryParams.addItem(
      context,
      {
        currentCart: cart.value,
        product,
        quantity,
        customQuery
      }
    );
    cart.value = updatedCart;
  } catch (err) {
    error.value.addItem = err; // Setting a new error
    Logger.error('useCart/addItem', err);
  } finally {
    loading.value = false;
  }
};
```