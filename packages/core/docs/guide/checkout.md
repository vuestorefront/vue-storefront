# What's checkout?
Checkout is a process of providing information about shipping and billing details, and picking certain shipping and payment method. Then with all the data, we are able to place an order and pay for it.

## Shipping details
Shipping details are information about the receiver and her/his address. Based on that, shop will know how to address a package.

To access shipping details, we can use property returned by `useShipping` called `shipping`.
```js{8,16}
import { useShipping } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      load,
      shipping
    } = useShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping
    };
  }
}
```
`shipping` property will return `null` if the address is not saved on the server or has not been loaded.   

In order to save shipping details on the server, you can use `save` method:
```vue{2,15,24}
<template>
  <form @submit.prevent="save({ shippingDetails: shippingForm })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Submit</button>
  </form>
</template>

<script>
import { useShipping } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      save,
      loading,
      shipping
    } = useShipping();

    const shippingForm = ref(/* object for shipping details */);

    return {
      shippingForm,
      save
    };
  }
}
</script>
```

Shipping details stored on the server with `save` method will be possible to load after a refresh with `load` method.

## Shipping providers
Shipping provider is an aggregator that provides us one or more shipping methods.    

To give you the best developer experience, we delegate whole logic of selecting shipping method to the dedicated component called **VsfShippingProvider.vue**. It takes care of:
- Loading and showing available shipping methods
- Loading currently picked shipping method
- Showing UI
- Picking and configuring shipping method

All we have to do is import and put it in `pages/Shipping.vue` as a [second part of the Shipping step](https://github.com/vuestorefront/vue-storefront/blob/next/packages/commercetools/theme/pages/Checkout/Shipping.vue#L197)
```vue
<VsfShippingProvider
  @submit="$router.push('/checkout/billing')"
/>
```

`VsfShippingProvider` emits `submit` event when shipping method is properly picked, configured and user clicks `Continue to billing` button.

### Hooks
You can pass asynchronous functions as `VsfShippingProvider` props to hook into different events within it's lifecycle and override initial function parameters or react to specific events like method selection
- **beforeLoad** - called before loading shipping methods
- **afterLoad** - called after loading shipping methods
- **onSelected** - called after selecting shipping method
- **onSelectedDetailsChanged** - called after modifying currently picked shipping method, e.g. selecting parcel locker on the map
- **onError** - called when some operation throws an error

```vue
<VsfShippingProvider
  :beforeLoad="beforeLoad"
  :afterLoad="afterLoad"
  :onSelected="onSelected"
  :onSelectedDetailsChanged="onSelectedDetailsChanged"
  :onError="onError"
/>
```
:::warning
Signatures of hook functions might be different per shipping provider.
:::
## Billing details
Billing details are information about the payer and her/his address. Based on that, payment providers might evaluate probability of fraud payment. Also it is a place, where we should store information for invoice.

To access billing details, we can use property of `useBilling` called `billing`.
```js{8,16}
import { useBilling } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      load,
      billing
    } = useBilling();

    onSSR(async () => {
      await load();
    });

    return {
      billing
    };
  }
}
```
`billing` property will return `null` if the address is not saved on the server or has not been loaded.   

In order to save billing details on the server, you could use `save` method:
```vue{2,15,24}
<template>
  <form @submit.prevent="save({ billingDetails: billingForm })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">Submit</button>
  </form>
</template>

<script>
import { useBilling } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const {
      save,
      loading,
      billing
    } = useBilling();

    const billingForm = ref(/* object for billing details */);

    return {
      billingForm,
      save
    };
  }
}
</script>
```
Billing details stored on the server with `save` method will be possible to load after a refresh with `load` method.

## Payment providers
Payment provider is an aggregator that provides us one or more payment methods.    

To give you the best developer experience, we delegate whole logic of selecting and configuring payment method to the dedicated component called **VsfPaymentProvider.vue**. It takes care of:
- Loading and showing available payment methods
- Showing UI
- Picking and configuring payment method

The first thing we have to do is import and put the component inside `pages/Payment.vue` as a [last part of the Checkout](https://github.com/vuestorefront/vue-storefront/blob/next/packages/commercetools/theme/pages/Checkout/Payment.vue#L108):
```vue
<template>
  <!-- ... -->
  <VsfPaymentProvider
    @submit="$router.push('/checkout/billing')"
  />
  <!-- ... -->
</template>

<script>
import VsfPaymentProvider from '{PAYMENT_PROVIDER_INTEGRATION}/src/VsfPaymentProvider';

export default {
  components: {
    VsfPaymentProvider
  }
}
</script>
```

Then we have to support making a payment - each package with a payment provider has to share a composable which returns `pay` method that handles transaction. 
```ts
import { usePayment } from '{PAYMENT_PROVIDER_INTEGRATION}';
import { useOrder } from '{INTEGRATION}';

export default {
  setup () {
    // ...
    const { make } = useOrder();
    const { pay } = usePayment();

    const placeAnOrder = () => {
      await make();
      await pay();
    }
  }
}
```

Having a composable makes it so easy for integrator to share data between Vue's component and `pay` method via [sharedRef](https://github.com/vuestorefront/vue-storefront/blob/next/packages/core/core/src/utils/shared/index.ts).

`VsfPaymentProvider` emits `status` event with boolean in the payload which tells whether everything is ready for call `pay` or not. Use this information to enable/disable `Place order` button.

### Hooks 
You can pass asynchronous functions as `VsfPaymentProvider` props to hook into different events within it's lifecycle and override initial function parameters or react to specific events like method selection
- **beforeLoad** - called before loading payment methods
- **afterLoad** - called after loading payment methods
- **onSelected** - called after selecting payment method
- **onSelectedDetailsChanged** - called after modifying currently picked payment method, e.g. changing credit card's details
- **onError** - called when some operation throws an error

```vue
<VsfPaymentProvider
  :beforeLoad="beforeLoad"
  :afterLoad="afterLoad"
  :onSelected="onSelected"
  :onSelectedDetailsChanged="onSelectedDetailsChanged"
  :onError="onError"
/>
```
:::warning
Signatures of hook functions might be different per integration.
:::

### Why some integrations have a mock for VsfPaymentProvider?
There are eCommerce backends which do not provide any payment methods out-of-the-box, e.g. commercetools. For these, we provide mocked component to let user go through the whole checkout. We are using external providers with dedicated VsfPaymentProvider for them. One example is a [Checkout.com integration](https://github.com/vuestorefront/checkout-com).

## Order
