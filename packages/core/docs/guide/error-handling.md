# Error handling

A flexible way of error handling is essential for a framework like Vue Storefront. As composables are the heart of our app, we decided to put there whole error handling mechanism.

Each composable returns `error` computed property. It is an object which has names of async functions from composable as keys and Error instance or `null` as a value.

```vue
<template>
  <button @click="addToCart(product)">Add to cart</button>
  <div v-if="error.addToCart">{{ error.addToCart.message }}</div>
</template>

<script>
export default {
  setup() {
    const { addToCart, error } = useCart();

    return {
      error,
    };
  },
};
</script>
```

There is a dedicated TypeScript interface for each composable. Take a look at this one from `useCart`:

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

:::details Where does the error come from?

Inside each async method, we are clearing the current error before an integration's method call and setting it in the `catch` block.

```ts
const addItem = async ({ product, quantity, customQuery }) => {
  Logger.debug('useCart.addItem', { product, quantity });

  try {
    loading.value = true;
    error.value.addItem = null; // Clearing the current error
    const updatedCart = await factoryParams.addItem(context, {
      currentCart: cart.value,
      product,
      quantity,
      customQuery,
    });
    cart.value = updatedCart;
  } catch (err) {
    error.value.addItem = err; // Setting a new error
    Logger.error('useCart/addItem', err);
  } finally {
    loading.value = false;
  }
};
```

:::

:::details Where can I find an interface of the error property from a certain composable?

When you are writing a code inside a script part of the Vue's component, your IDE should give you hints dedicated for each type of composable. That's why you probably do not need to check these interfaces in the core's code.

However, if you still wand to check interfaces, you could find them inside [`packages/core/core/src/types.ts`](https://github.com/vuestorefront/vue-storefront/blob/next/packages/core/core/src/types.ts).

[//]: # 'TODO: This should be added to API reference'

:::

## How to listen for errors?

Let's imagine you have some global components for error notifications. You want to send information about every new error to this component. But how to know when a new error appears? You can observe an error object with a watcher!

```ts
const { cart, error } = useCart();

watch(error, (error, prevError) => {
  if (error.value.addItem && error.value.addItem !== prevError.value.addItem)
    sendInAppNotification('error', error.value.addItem.message);
  if (
    error.value.removeItem &&
    error.value.removeItem !== prevError.value.removeItem
  )
    sendInAppNotification('error', error.value.removeItem.message);
});
```
