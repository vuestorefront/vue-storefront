# Checkout
Checkout is a process of providing information about shipping and billing details, and picking certain shipping and payment method. Then with all the data, we are able to place an order and pay for it.

## Collecting and saving shipping details
Shipping details are information about the receiver and her/his address. Based on that, we know where to send the order.

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

In order to save shipping details, you can use `save` method:
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

## Selecting a shipping method
Shipping provider is an aggregator that provides us one or more shipping methods. It is also an integration, one provider component always means one 3rd party provider of shipping.   

To give you the best developer experience, we delegate whole logic of selecting shipping method to the dedicated component called **VsfShippingProvider.vue**. It takes care of:
- Loading and displaying available shipping methods
- Loading selected shipping method
- Selecting and configuring shipping method

All we have to do is import and put it in `pages/Shipping.vue` as a [second part of the Shipping step](https://github.com/vuestorefront/vue-storefront/blob/next/packages/commercetools/theme/pages/Checkout/Shipping.vue#L197)
```vue
<VsfShippingProvider
  @submit="$router.push('/checkout/billing')"
/>
```

`VsfShippingProvider` emits `submit` event when shipping method is properly picked, configured and user clicks `Continue to billing` button.

### Extending`VsfShippingProvider` and reacting to it's events
You can pass asynchronous functions as `VsfShippingProvider` props to hook into different events within it's lifecycle and override initial function parameters or react to specific events like method selection. Available hooks: 
- **beforeLoad** `(config => config)` - called before loading shipping methods
- **afterLoad** `(shippingMethodsResponse => shippingMethodsResponse.shippingMethods)` - called after loading shipping methods
- **beforeSelect** `(shippingMethod => shippingMethod)` - called before selecting shipping method
- **afterSelect** `(selectedShippingMethod => void)` - called after selecting shipping method
- **beforeSelectedDetailsChange** `(details => details)` - called before modifying currently picked shipping method, e.g. selecting parcel locker on the map
- **afterSelectedDetailsChange** `(details => void)` - called after modifying currently picked shipping method
- **onError** `(({ action, error }) => void)` - called when some operation throws an error

```vue
<VsfShippingProvider
  :beforeLoad="beforeLoad"
  :afterLoad="afterLoad"
  :beforeSelect="beforeSelect"
  :afterSelect="afterSelect"
  :beforeSelectedDetailsChange="beforeSelectedDetailsChange"
  :afterSelectedDetailsChange="afterSelectedDetailsChange"
  :onError="onError"
/>
```
## Collecting and saving billing details
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

## Making an order
After providing every crucial information by the user, we are ready to *make an order*. To do that, we have to call a `make` method from the `useMakeOrder` composable.
```js
import { useMakeOrder } from '{INTEGRATION}';

export default {
  setup () {
    const { make } = useMakeOrder();

    return {
      make
    }
  }
}
```

It creates an order but we need to perform additional actions:
- redirect to thank you page
- clear a cart
```js
import { useMakeOrder, useCart } from '{INTEGRATION}';

export default {
  setup (_, context) {
    const { make, order } = useMakeOrder();
    const { setCart } = useCart();

    const processOrder = async () => {
      await make();
      context.root.$router.push(`/checkout/thank-you?order=${order.value.id}`);
      setCart(null);
    }
  }
}
```

## Payment providers
Payment provider is an aggregator that provides us one or more payment methods. It is also an integration, one provider component always means one 3rd party provider of payments.       

To give you the best developer experience, we delegate whole logic of selecting and configuring payment method to the dedicated component called **VsfPaymentProvider.vue**. It takes care of:
- Loading and showing available payment methods
- Picking and configuring payment method

The first thing we have to do is import and put the component inside `pages/Payment.vue` as a [last part of the Checkout](https://github.com/vuestorefront/vue-storefront/blob/next/packages/commercetools/theme/pages/Checkout/Payment.vue#L108):
```vue
<template>
  <!-- ... -->
  <VsfPaymentProvider />
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

Then we have to support making a payment - each package with a payment provider might force us to use a bit different approach. We found that there will be 2 most common ones:

### SDK takes the full control
If payment provider's SDK handles the whole payment and we can only provide own callbacks for certain events. We want to make an order in `beforePay` async hook.
```vue
<template>
  <div>
    <!-- ... -->
    <VsfPaymentProvider
      :beforePay="makeOrder"
    />
  </div>
</template>

<script>
export default {
  setup () {
    const { make: makeOrder } = useMakeOrder();

    return {
      makeOrder
    }
  }
}
</script>
```

### SDK allows to externalize pay method
If payment provider's SDK handles process of configuring payment but allows us to decide when to finalize then:
- VsfPaymentProvider emits `status` event. Use this information to enable/disable `Place order` button.
- Composable shares a `pay` method.

```vue
<template>
  <div>
    <VsfPaymentProvider
      @status="readyToPay = $event"
    />
    <button @click="makeOrder" :disabled="!readyToPay">
      Order and Pay
    </button>
  </div>
</template>

<script>
import { usePaymentProvider } from '{PAYMENT_PROVIDER_INTEGRATION}';
import { useOrder } from '{INTEGRATION}';
// ...

export default {
  // ...
  setup () {
    const readyToPay = ref(false);
    const { make } = useOrder();
    const { pay } = usePaymentProvider();

    const makeOrder = () => {
      await make();
      await pay();
    };

    return {
      makeOrder,
      readyToPay
    };
  }
}
</script>
```

### Hooks 
You can pass asynchronous functions as `VsfPaymentProvider` props to hook into different events within it's lifecycle and override initial function parameters or react to specific events like method selection. Available hooks: 
- **beforeLoad** `(config => config)` - called before loading payment methods
- **afterLoad** `(shippingMethodsResponse => shippingMethodsResponse.shippingMethods)` - called after loading payment methods
- **beforeSelect** `(shippingMethod => shippingMethod)` - called before selecting payment method
- **afterSelect** `(selectedShippingMethod => void)` - called after selecting payment method
- **beforePay** `(paymentDetails => paymentDetails)` - called before pay
- **afterPay** `(paymentResponse => void)` - called after pay
- **beforeSelectedDetailsChange** `(details => details)` - called before modifying currently picked payment method, e.g. changing credit card's details
- **afterSelectedDetailsChange** `(details => void)` - called after modifying currently picked payment method, e.g. changing credit card's details
- **onError** `(({ action, error }) => void)` - called when some operation throws an error

```vue
<VsfPaymentProvider
  :beforeLoad="beforeLoad"
  :afterLoad="afterLoad"
  :beforeSelect="beforeSelect"
  :afterSelect="afterSelect"
  :beforePay="beforePay"
  :afterPay="afterPay"
  :beforeSelectedDetailsChange="beforeSelectedDetailsChange"
  :afterSelectedDetailsChange="afterSelectedDetailsChange"
  :onError="onError"
/>
```

### Why some integrations have a mocked VsfPaymentProvider?
There are eCommerce backends which do not provide any payment methods out-of-the-box, e.g. commercetools. For these, we provide mocked component to let user go through the whole checkout. We are using external providers with dedicated VsfPaymentProvider for them. One example is a [Checkout.com integration](https://github.com/vuestorefront/checkout-com).
