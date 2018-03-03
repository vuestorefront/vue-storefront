# Checkout Vuex Store

Checkout Store is designed to handle all actions related the checkout operations and used to propagate the Checkout UI.

## State

```js
 state: {
    order: {},
    personalDetails: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      createAccount: false
    },
    shippingDetails: {
      firstName: '',
      lastName: '',
      country: '',
      streetAddress: '',
      apartmentNumber: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      shippingMethod: 'flatrate'
    },
    paymentDetails: {
      firstName: '',
      lastName: '',
      company: '',
      country: '',
      streetAddress: '',
      apartmentNumber: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      taxId: '',
      paymentMethod: 'cashondelivery'
    }
  }
```

Checkout state is centralized around the [Order object](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json) and the address data given by the user within the checkout process, to be stored for further use in the `localForage`.

The state is modified by [`placeOrder`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/checkout/actions.js#L11) action and [`load`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/checkout/actions.js#L41) which loads the state from browser database.

The category state data:
- `order` - this is the last order to be placed, the [schema is defined](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json) in Ajv compliant format
- `shippingDetails`, `paymentDetails` - the address information provided by the user during the [Checkout](https://github.com/DivanteLtd/vue-storefront/blob/master/core/pages/Checkout.vue).

## Actions 

The cart store provides following public actions:

### `placeOrder (context, { order })`
Action called by Checkout.vue to complete the order. Data object is validated against the [order schema](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json), stored within the `localForage` collection by subseqent call of [`order/placeOrder`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/order/actions.js#L12)

### `savePersonalDetails ({ commit }, personalDetails)`
Stores the personal Details (the format is exactly the same as this store `state.personalDetails`) for later use in the browser's storage

### `saveShippingDetails ({ commit }, shippingDetails)`
Stores the shipping Details (the format is exactly the same as this store `state.shippingDetails`) for later use in the browser's storage

### `savePaymentDetails ({ commit }, paymentDetails)`
Stores the payment Details (the format is exactly the same as this store `state.paymentDetails`) for later use in the browser's storage

### `load ({ commit })`
Load the current state from the `localForage`
