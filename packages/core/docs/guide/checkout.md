# Checkout

Checkout is a process of providing shipping and billing addresses and selecting shipping and payment methods needed to place an order and pay for it.

## Collecting and saving shipping details

Shipping details are information about the recipient's address required to ship the order.

We can load shipping details by calling the `load` method in `useShipping` composable and accessing the `shipping` property after loading is done.
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

We can use `save` method to save shipping details so they're available next time we `load` them.

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

`VsfShippingProvider` is a component that aggregates one or more shipping methods from a single provider like FedEx or DHL. This component is usually the only thing that we need to integrate a particular vendor into our project and is always delivered as third-party integration.

The component is responsible for:
- Loading and displaying available shipping methods.
- Loading selected shipping method.
- Selecting and configuring shipping method.

All we have to do is to import a component and add it to the template.

```vue
<VsfShippingProvider
  @submit="$router.push('/checkout/billing')"
/>
```

`VsfShippingProvider` emits `submit` event when shipping method is selected, configured and user clicks submit button.

### Extending `VsfShippingProvider` and reacting to it's events
We can pass asynchronous functions to the `VsfShippingProvider` component to hook into different events within its lifecycle, override initial function parameters or react to specific events like method selection. We will call these methods "hooks".

Because every shipping provider is different, not all of them are present in every integration. Always refer to the documentation of a specific provider to learn which hooks are available.

- **beforeLoad** `(config => config)` - Called before loading shipping methods.
- **afterLoad** `(shippingMethodsResponse => shippingMethodsResponse.shippingMethods)` - Called after loading shipping methods.
- **beforeSelect** `(shippingMethod => shippingMethod)` - Called before selecting shipping method.
- **afterSelect** `(selectedShippingMethod => void)` - Called after selecting shipping method.
- **beforeSelectedDetailsChange** `(details => details)` - Called before modifying currently picked shipping method, e.g. selecting parcel locker on the map.
- **afterSelectedDetailsChange** `(details => void)` - Called after modifying currently picked shipping method.
- **onError** `(({ action, error }) => void)` - Called when some operation throws an error.

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
Billing details are information about the payer's address used by store owners to prepare invoices and payment providers to evaluate the probability of fraud payment.

We can load billing details by calling the `load` method in `useBilling` composable and use the `billing` property to access it.
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

We can use `save` method to save billing details.
```vue{2,15,24}
<template>
  <form @submit.prevent="save({ billingDetails: billingForm })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">{{ $t('Submit') }}</button>
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

When the order is created, we can redirect the user to the page thanking them for making an order and refresh the cart.
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
A `VsfPaymentProvider` is a component that provides one or more payment methods. One such component integrates one 3rd party provider of payments like Checkout.com or Adyen. This component is usually the only thing that we need to integrate a particular vendor into our project and is always delivered as a third-party integration.   

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

The next step is making a payment. Each package with a payment provider might use a slightly different approach, but below we described the two most common.

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
      {{ $t('Order and Pay') }}
    </button>
  </div>
</template>

<script>
import { usePaymentProvider } from '{PAYMENT_PROVIDER_INTEGRATION}';
import { useMakeOrder } from '{INTEGRATION}';
// ...

export default {
  // ...
  setup () {
    const readyToPay = ref(false);
    const { make } = useMakeOrder();
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
We can pass asynchronous functions to the `VsfPaymentProvider` component to hook into different events within its lifecycle, override initial function parameters or react to specific events like method selection. We will call these methods "hooks".

Because every payment provider is different, not all of them are present in every integration. Always refer to the documentation of a specific provider to learn which hooks are available.

- **beforeLoad** `(config => config)` - Called before loading payment methods.
- **afterLoad** `(shippingMethodsResponse => shippingMethodsResponse.shippingMethods)` - Called after loading payment methods.
- **beforeSelect** `(shippingMethod => shippingMethod)` - Called before selecting payment method.
- **afterSelect** `(selectedShippingMethod => void)` - Called after selecting payment method.
- **beforePay** `(paymentDetails => paymentDetails)` - Called before pay.
- **afterPay** `(paymentResponse => void)` - Called after pay.
- **beforeSelectedDetailsChange** `(details => details)` - Called before modifying currently picked payment method, e.g. changing credit card's details.
- **afterSelectedDetailsChange** `(details => void)` - Called after modifying currently picked payment method, e.g. changing credit card's details.
- **onError** `(({ action, error }) => void)` - Called when some operation throws an error. 

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
There are eCommerce backends which do not provide any payment methods out-of-the-box, e.g. commercetools. For these, we provide mock component that has exactly same interface as a real integration so you can easily swap it with a payment integration of your choice. You can find available payment integrations [here](/v2/integrations/)
