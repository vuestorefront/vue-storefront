# Setting composable internal fields

## Motivation

Sometimes when we create a new composable (using factory) we need to override some fields that are inside.
For example, when you use `useProduct` you want to reload `cart` property from the `useCart` composable.
To do this our factories can return setter function instead of just composable instance:

### Factory:
```js
const useCartFactory = () => {
  const cart = ref({});

  const setCart = (newCart) => {
    cart.value = newCart;
  }

  const useCart = () => {
    return { cart }
  };

  return { setCart, useCart };
}

export default useCartFactory
```

### Integration:
```js
import { useCartFactory } from '@vue-storefront/factories';

export default useCartFactory({ ... })
```

now usage (example with user):

```js
import { setCart } from './useCart';

const factoryParams = {
  login: async () => {
    const response = await authenticate();
    setCart(response.cart);

    return response.customer;
  }
}

export default useUserFactory(factoryParams);
```


## Migration process

You have to change all of imports of the composables as the factories will return object instead of composable function.
