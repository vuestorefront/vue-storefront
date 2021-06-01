# Error handling

A flexible way of error handling is essential for a framework like Vue Storefront. We decided to put all errors in reactive objects so they can be easily managed in the template.

Each composable returns an `error` computed property. It is an object which has names of async functions from composable as keys and Error instance or `null` as a value.

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

There is a dedicated TypeScript interface for every composable. Take a look at this one from `useCart`:

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

Inside each async method, we are catching errors when they occur and save them to the reactive property called `error` under the key corresponding to the triggered method:

```ts
const { addItem, error } = useCart();

addItem({ product: null }); // triggers an error
error.value.addItem; // here you have error raised by addItem function
```

:::

:::details Where can I find an interface of the error property from a certain composable?

When you are writing a code inside a script part of the Vue component, your IDE should give you hints on every different type of the composable. That's why you probably do not need to check these interfaces in the core's code.

However, if you still want to check interfaces, you could find them inside [`packages/core/core/src/types.ts`](https://github.com/vuestorefront/vue-storefront/blob/next/packages/core/core/src/types.ts).

[//]: # 'TODO: This should be added to API reference'

:::

### How to listen for errors?

Let's imagine you have some global component for error notifications. You want to send information about every new error to this component. But how to know when a new error appears? You can observe an error object with a watcher:

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

[//]: # 'TODO: This should be added to API reference'