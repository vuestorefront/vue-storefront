# Checkout Module

Checkout Module is designed to handle all logic related the checkout operations and UI.

## Components

### CartSummary

This component displays the cart summary information

**Computed**

- `totals` - mapped getter to show the cart totals

### OrderReview

A summary of the current order

**Props**

- `isActive` - boolean, required prop

**Methods**

- `placeOrder` - checks if current user has an account. If not, will trigger a `register` method, otherwise will emit `checkout-before-placeOrder` bus event
- `register` - dispatches a `user/register` action to register a new user

### Payment

A component to handle payment operations

**Props**

- `isActive` - boolean, required prop

**Computed**

- `currentUser` - the current user mapped from application state
- `paymentMethods` - available payment methods mapped from `payment/paymentMethods` getter

**Methods**

- `sendDataToCheckout` - emits `checkout-after-paymentDetails` bus event and sets `isFilled` to `true`
- `edit` - checks `isFilled` and if it's `true`, emits a `checkout-before-edit` bus event
- `hasBillingData` - checks if current user exists and if it has `default_billing_ property
- `initializeBillingAddress` - checks if current user exists and if it has `default_billing` property; if so, populates the `payment` data property with current user address data
- `useShippingAddress` - populates the `payment` data property with `$store.state.checkout.shippingDetails`
- `useBillingAddress` - populates the `payment` data property with `currentUser.addressess`
- `useGenerateInvoice` - negates the `generateInvoice` value and if it becomes `false`, will reset `this.payment.company` and `this.payment.taxId`
- `getCountryName` - gets the country name for the current payment by the country code
- `getPaymentMethod` - gets the payment method title for the current payment by the payment method code
- `notInMethods` - checks if passed method is present in `paymentMethods`
- `changePaymentMethod` - resets the additional payment method component container if exists and emits `checkout-payment-method-changed` bus event

### Personal Details

User's personal details component

**Props**

- `isActive` - boolean, required prop
- `focusedField` - a string showing which field is focused

**Computed**

- `currentUser` - the current user mapped from application state

**Methods**

- `onLoggedIn` - populates `personalDetails` with data passed as a parameter
- `sendDataToCheckout` - performs a check if an account is already created and emits `checkout-after-personalDetails` bus event
- `edit` - emits `checkout-before-edit` bus event
- `gotoAccount` - shows a sign-up modal

### Product

The component representing a product

**Props**

- `product` - current product

**Computed**

- `thumbnail` - returns a thumbnail for product image

**Methods**

- `onProductChanged` - checks `event.item.sku` and if it's equal to `product.sku`, the force update will be triggered

### Shipping

Component handling all the shipping logic

**Props**

- `isActive` - boolean, required prop

**Computed**

- `currentUser` - the current user mapped from application state
- `shippingMethods` - available payment methods mapped from `payment/paymentMethods` getter
- `checkoutShippingDetails` - mapped from `state.checkout.shippingDetails`
- `paymentMethod` - mapped from `state.payment.methods`

**Methods**

- `onAfterShippingSet` - populates the `shipping` data property with a passed parameter
- `onAfterPersonalDetail` - checks `isFilled` data property and if it's false, dispatches `checkout/updatePropValue` with user's first and last names
- `sendDataToCheckout` - emits `checkout-after-shippingDetails` bus event; sets `isFilled` to `true`
- `edit` - is `isFilled` is true, emits `checkout-before-edit` bus event and sets `isFilled` to `false`
- `hasShippingDetails` - checks, if `currentUser` exists and has a property `default_shipping`; if so, populates `myAddressDetails` data property with `currentUser.addresses`
- `useMyAddress` - checks `shipToMyAddress`; if `true`, populates `shipping` data property with `myAddressDetails`
- `getShippingMethod` - gets the shipping method from `shippingMethods` data property
- `getCountryName` - gets country name with country code
- `changeCountry` - emits `checkout-before-shippingMethods` bus event
- `getCurrentShippingMethod` - calculates a current shipping method with shipping method code
- `changeShippingMethod` - if `getCurrentShippingMethod` exists, emits `checkout-after-shippingMethodChanged` bus event
- `notInMethods` - checks if passed method is present in `shippingMethods`

## Store

### State

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
      shippingMethod: ''
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
      paymentMethod: ''
    }
  }
```

Checkout state is centralized around the [Order object](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json) and the address data given by the user within the checkout process, to be stored for further use in the `localForage`.

The state is modified by [`placeOrder`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/checkout/actions.js#L11) action and [`load`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/checkout/actions.js#L41) which loads the state from browser database.

The category state data:

- `order` - this is the last order to be placed, the [schema is defined](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json) in Ajv compliant format
- `shippingDetails`, `paymentDetails` - the address information provided by the user during the [Checkout](https://github.com/DivanteLtd/vue-storefront/blob/master/core/pages/Checkout.vue).

### Actions

The cart store provides following public actions:

#### `placeOrder (context, { order })`

Action called by `Checkout.vue` to complete the order. Data object is validated against the [order schema](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json), stored within the `localForage` collection by subseqent call of [`order/placeOrder`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/store/modules/order/actions.js#L12)

#### `savePersonalDetails ({ commit }, personalDetails)`

Stores the personal Details (the format is exactly the same as this store `state.personalDetails`) for later use in the browser's storage

#### `saveShippingDetails ({ commit }, shippingDetails)`

Stores the shipping Details (the format is exactly the same as this store `state.shippingDetails`) for later use in the browser's storage

#### `savePaymentDetails ({ commit }, paymentDetails)`

Stores the payment Details (the format is exactly the same as this store `state.paymentDetails`) for later use in the browser's storage

#### `load ({ commit })`

Load the current state from the `localForage`
