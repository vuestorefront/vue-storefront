# Error handling

A flexible way of error handling is essential for a framework like Vue Storefront. As factories of composables are hearth of our core - we decided to put there whole error handling mechanism.

Each factory returns `error` computed property. It is an object which has names of async functions from factory as keys and Error instance or null as a value. There is a dedicated type for each factory, e.g:
```ts
export interface UseCartComposableErrors {
  addItem?: Error;
  removeItem?: Error;
  updateItemQty?: Error;
  load?: Error;
  clear?: Error;
  applyCoupon: Error;
  removeCoupon?: Error;
}
```

## Where does error come from?
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

## Where can I find interface of the error property from a certain factory?
You shouldn't need it, IDE should give you hints. But if so....

# Best practices and common issues (?)

## How to listen for errors?
```ts
const { cart, error: cartError } = useCart()

watch(cartError => {
  if (cartError.value.addItem) sendInAppNotification('error', cartError.value.addItem.message)
  if (cartError.value.removeItem) sendInAppNotification('error', cartError.value.removeItem.message)
})
```

## How to use error ref?
```vue
<template>
 <button @click="addToCart(product)">Add to cart</button>
 <div v-if="cartError.addToCart">{{ cartError.addToCart.message }}</dIv>
</template>

<script>
export default {
  setup () {
    const { addToCart, error } = useCart()

    return {
      cartError: error
    }
  }
}
</script>
```
