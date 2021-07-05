# Error handling

Each [composable](/guide/composables.html) has a computed property called `errors` which stores errors from all methods within that composable. It's an object with keys matching the names of the methods within the composable, and Error instance or `null` as a value.

```vue
<template>
  <button @click="addItem(product)">Add to cart</button>
  <div v-if="error.addItem">{{ error.addItem.message }}</div>
</template>

<script>
export default {
  setup() {
    const { addItem, error } = useCart();

    return {
      addItem,
      error
    };
  }
};
</script>
```
The `@vue-storefront/core` package exports interfaces for `error` objects for every composable. Let's take a look at the one from the `useCart` composable:

```ts
export interface UseCartErrors {
  addItem: Error;
  removeItem: Error;
  updateItemQty: Error;
  load: Error;
  clear: Error;
  applyCoupon: Error;
  removeCoupon: Error;
}
```

:::details Where does the error come from?

Inside each async method, we catch thrown errors and save them in the `error` object under the key corresponding to the called method.

```ts
const { addItem, error } = useCart();

addItem({ product: null }); // throws an error
error.value.addItem; // here you access error thrown by addItem function
```

:::

:::details Where can I find an interface of the error property for a specific composable?

When you are writing a code inside a script part of the Vue component, your IDE should give you hints on every different type of the composable. That's why you probably do not need to check these interfaces in the core's code.

However, if you still want to check interfaces, you could find them in [core API reference](../core/api-reference/core.html).

:::

### How to listen for errors?

Let's imagine you have some global component for error notifications. You want to send information about every new error to this component. But how do you know when a new error appears?
You can observe an error object with a watcher:

```ts
import { useUiNotification } from '~/composables';

const { cart, error } = useCart();
const { send } = useUiNotification();

watch(() => ({...error.value}), (error, prevError) => {
  if (error.addItem && error.addItem !== prevError.addItem)
    send({ type: 'danger', message: error.addItem.message });
  if (
    error.removeItem &&
    error.removeItem !== prevError.removeItem
  )
    send({ type: 'danger', message: error.removeItem.message });
});
```

In this example, we are using `useUiNotification` - a composable that handles notifications state. You can read more about it in the API reference.
