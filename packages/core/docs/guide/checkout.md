# Checkout
Checkout is a process of providing shipping and billing addresses and selecting shipping and payment methods needed to place an order and pay for it.

## Collecting and saving shipping details
Shipping details are information about the recipient's address needed to ship the order.

We can load shipping details by calling the `load` method in `useShipping` composable and use the `shipping` property to access it.
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
`shipping` property returns `null` if the `load` function was not invoked or nothing is saved.    

We can use `save` method to save shipping details.
```vue{2,15,24}
<template>
  <form @submit.prevent="save({ shippingDetails: shippingForm })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">{{ $t('Submit') }}</button>
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

## Selecting a shipping method
`VsfShippingProvider` is a component that aggregates one or more shipping methods from a single provider like FedEx or DHL. This component is usually the only thing that we need to integrate a particular vendor into our project and is always delivered as a third-party integration.

The component is responsible for:
- Loading and displaying available shipping methods.
- Loading selected shipping method.
- Selecting and configuring shipping method.

All we have to do is import and put in the view.
```vue
<VsfShippingProvider
  @submit="$router.push('/checkout/billing')"
/>
```

`VsfShippingProvider` emits `submit` event when shipping method is selected, configured and user clicks submit button.

### Extending `VsfShippingProvider` and reacting to it's events
We can pass asynchronous functions as `VsfShippingProvider` props to hook into different events within it's lifecycle, override initial function parameters or react to specific events like method selection. We will call these methods "hooks".

Below we can find a list of available hooks. Because every shipping provider is different not all of them are present in every integration. Always refer to the documentation of a specific provider to learn which hooks are available for it.
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
Billing details are information about the payer and her/his address. Based on that, payment providers can evaluate probability of fraud payment and store owners can prepare invoices.

We can load billing details by invoking `load` method. To access them, use property returned by `useBilling` called `billing`.
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
`billing` property returns `null` if the `load` function was not invoked or nothing is saved.   

We can use `save` method in order to save billing details.
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

## Making an order
After user provided every information required by our eComerce, we are ready to *make an order*. To do that, we have to call a `make` method from the `useMakeOrder` composable.
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
`VsfPaymentProvider` is a component that aggregates one or more payment methods from a single provider like Checkout.com or Adyen. This component is usually the only thing that we need to integrate a particular vendor into our project and is always delivered as a third-party integration.   

The component is responsible for:
- Loading and displaying available payment methods.
- Loading selected payment method.
- Picking and configuring payment method.

The first thing we have to do is import and put in the view.
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

### Extending `VsfPaymentProvider` and reacting to it's events
We can pass asynchronous functions as `VsfPaymentProvider` props to hook into different events within it's lifecycle, override initial function parameters or react to specific events like method selection. We will call these methods "hooks".

Below we can find a list of available hooks. Because every payment provider is different not all of them are present in every integration. Always refer to the documentation of a specific provider to learn which hooks are available for it.

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
