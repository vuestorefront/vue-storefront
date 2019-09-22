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

## How to add a custom checkout step

We now show an example of how to add a new step to the checkout page of Vue Storefront.

The step is named `NewStep` and is placed just after the `PersonalDetails` step; changing the step's name and position requires small modifications to the procedure.

### First, create the NewStep component

1. **Create the NewStep component** according to your needs. To do it quickly, make a copy of the `PersonalDetails` component, name it `NewStep` and customize it.

2. **Customize the sendDataToCheckout method** of the `NewStep` component so that it emits the event `checkout-after-newStep`; for example:
```javascript
    sendDataToCheckout () {
      this.$bus.$emit('checkout-after-newStep', this.newStep, this.$v)
    }
```

3. **Call the sendDataToCheckout method** when the button to the next section is clicked. This could be achieved in the template like this:
```vue
    <button-full
      @click.native="sendDataToCheckout"
    >
```

### Then, modify the checkout component

1. **Insert the NewStep component in the checkout template** at the desired position. For example, you could place it between the Personal Details and Shipping steps:
```vue
  <personal-details class="line relative" :is-active="activeSection.personalDetails" :focused-field="focusedField"/>
  <new-step class="line relative" :is-active="activeSection.newStep">
  <shipping class="line relative" :is-active="activeSection.shipping" v-if="!isVirtualCart"/>
  <payment class="line relative" :is-active="activeSection.payment"/>
  <order-review class="line relative" :is-active="activeSection.orderReview"/>
```

2. **Listen for the checkout-after-newStep event** by adding the following listener to the `beforeMount()` function:
```javascript
    this.$bus.$on('checkout-after-newStep', this.onAfterNewStep)
```

3. **Specify how to jump from the previous step to NewStep**. Modify the `onAfterPersonalDetails()` method in order to activate the `newStep` section instead of the `shipping` step:
```javascript
    onAfterPersonalDetails (receivedData, validationResult) {
      this.personalDetails = receivedData
      this.validationResults.personalDetails = validationResult
      this.activateSection('newStep') // show the new step
      this.savePersonalDetails()
      this.focusedField = null
    }
```
This is assuming that the new checkout step follows the Personal Details step; if this is not the case, you will need to modify the `onAfter` metod of whatever step precedes `NewStep`.

4. **Specify how to jump from NewStep to the next step** by creating the method `onAfterNewStep`; in this example, the next step is the shipping form:
```javascript
    onAfterNewStep (receivedData, validationResult) {
      this.newStep = receivedData
      this.validationResults.newStep = validationResult
      this.activateSection('shipping') // change 'shipping' to whatever you want the next step to be
      this.saveNewStep() // include this line only if newStep has state
    }
```
Note that calling `activateSection('shipping')` is what ultimately shows the next checkout step to the user.

5. **If needed, save NewStep state** by defining a non-empty method `saveNewStep()`; for example:
```javascript
    saveNewStep () {
      this.$store.dispatch('checkout/saveNewStep', this.newStep)
    },
```
This is needed only if your new step has state, in which case you will also need to define the `checkout/saveNewStep` action in Vuex.


## Store

The Checkout Store is designed to handle the passage from user's cart to actual order; it defines actions such as saving the information given by the user during checkout, and placing the order.

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
      region_id: 0,
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
      region_id: 0,
      zipCode: '',
      phoneNumber: '',
      taxId: '',
      paymentMethod: '',
      paymentMethodAdditional: {}
    },
    isThankYouPage: false,
    modifiedAt: 0
  }
```

The state of the Checkout module contains both the [Order object](https://github.com/DivanteLtd/vue-storefront/blob/master/core/models/order.schema.json) and the information given by the user during the checkout process, to be stored for further use in the `localForage`.

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
