# Checkout

> This document only outlines the general checkout flow. Each eCommerce platform, Payment provider, or Shipping provider could implement it slightly differently. Please follow the instructions from the documentation of your payment or shipping provider to learn about its caveats

Checkout is a process of providing shipping and billing addresses and selecting shipping and payment methods needed to place an order and pay for it.

## Collecting and saving shipping details

Shipping details are information about the recipient's address required to ship the order.

You can load shipping details by calling the `load` method in `useShipping` composable and accessing the `shipping` property after loading is done.
```js{8,16}
import { useShipping } from '@vue-storefront/commercetools';
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

You can use the `save` method to save shipping details, so they are available next time you `load` them.

```vue{2,15,24}
<template>
  <form @submit.prevent="save({ shippingDetails: shippingForm })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">{{ $t('Submit') }}</button>
  </form>
</template>

<script>
import { useShipping } from '@vue-storefront/commercetools';
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

`VsfShippingProvider` is a component that aggregates one or more shipping methods from a single provider like FedEx or DHL. This component is usually the only thing that you need to integrate a particular vendor into your project and is always delivered as third-party integration.

The component is responsible for:
- Loading and displaying available shipping methods.
- Loading selected shipping method.
- Selecting and configuring shipping method.

All you have to do is to import a component and add it to the template.

```vue
<VsfShippingProvider />
```

`VsfShippingProvider` sets `state.value._status` property of `useShippingProvider` to `true` or `false`. The property informs whether a user is ready to go to the next step (`true`) or not (`false`).

### Extending `VsfShippingProvider` and reacting to its events

You can pass asynchronous functions to the `VsfShippingProvider` component to hook into different events within its lifecycle, override initial function parameters or react to specific events like method selection. Let's call these methods "hooks".

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

### Accessing current shipping method's details outside the component

Sometimes you have to show the information about a selected shipping method in a different place than the `VsfShippingProvider` component.

For such cases, you can use `useShippingProvider` composable. It has been made for loading and saving a current shipping method. After loading the data via the `load` method, it stores the information in some property of a `state` object, so you can access it from many places.

```ts
import { useShippingProvider } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@nuxtjs/composition-api';

export default {
  setup () {
    const { load, state } = useShippingProvider();

    onSSR(async () => {
      await load();
    });

    return {
      selectedShippingMethod: computed(() => ...)
    }
  }
}
```

## Collecting and saving billing details

Billing details are information about the payer's address used by store owners to prepare invoices and payment providers to evaluate the probability of fraud payment.

You can load billing details by calling the `load` method in `useBilling` composable and accessing the `billing` property after loading is done.

```js{8,16}
import { useBilling } from '@vue-storefront/commercetools';
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

You can use the `save` method to save billing details.

```vue{2,15,24}
<template>
  <form @submit.prevent="save({ billingDetails: billingForm })">
    <!-- form fields -->
    <button type="submit" :disabled="loading">{{ $t('Submit') }}</button>
  </form>
</template>

<script>
import { useBilling } from '@vue-storefront/commercetools';
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

After the user has provided all the information required by your eCommerce, you are ready to *make an order*. To do that, you have to call a `make` method from the `useMakeOrder` composable.
```js
import { useMakeOrder } from '@vue-storefront/commercetools';

export default {
  setup () {
    const { make } = useMakeOrder();

    return {
      make
    }
  }
}
```

When the order is created, you can redirect the user to the page thanking them for making an order and refresh the cart.

```js
import { useMakeOrder, useCart } from '@vue-storefront/commercetools';

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

A `VsfPaymentProvider` is a component that provides one or more payment methods. One such component integrates one third-party provider of payments like Checkout.com or Adyen. This component is usually the only thing that you need to integrate a particular vendor into your project and is always delivered as third-party integration.   

The component is responsible for:
- Loading and displaying available payment methods.
- Loading selected payment method.
- Picking and configuring payment method.

The first thing you have to do is to import the component and add it to the template.

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

The next step is making a payment. Each package with a payment provider might use a slightly different approach, but we described the two most common below.

### SDK takes the full control

If the payment provider's SDK handles the whole payment and you can only provide your own callbacks for certain events. You want to make an order in the `beforePay` async hook.
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

### SDK allows externalizing pay method

If the payment provider's SDK handles the process of configuring payment but allows you to decide when to finalize then:
- Composable shares a `pay` method.
- Composable shares a `status` boolean ref that informs if you are ready to call `pay`.

```vue
<template>
  <div>
    <VsfPaymentProvider />
    <button @click="makeOrder" :disabled="!status">
      {{ $t('Order and Pay') }}
    </button>
  </div>
</template>

<script>
import { usePaymentProvider } from '{PAYMENT_PROVIDER_INTEGRATION}';
import { useMakeOrder } from '@vue-storefront/commercetools';
// ...

export default {
  // ...
  setup () {
    const { make } = useMakeOrder();
    const { pay, status } = usePaymentProvider();

    const makeOrder = () => {
      await make();
      await pay();
    };

    return {
      makeOrder,
      status
    };
  }
}
</script>
```

### Extending `VsfPaymentProvider` and reacting to its events

You can pass asynchronous functions to the `VsfPaymentProvider` component to hook into different events within its lifecycle, override initial function parameters or react to specific events like method selection. Let's call these methods "hooks".

Because every payment provider is different, not all of them are present in every integration. Always refer to the documentation of a specific provider to learn which hooks are available.

- **beforeLoad** `(config => config)` - Called before loading payment methods.
- **afterLoad** `(paymentMethodsResponse => paymentMethodsResponse.paymentMethods)` - Called after loading payment methods.
- **beforeSelect** `(paymentMethod => paymentMethod)` - Called before selecting payment method.
- **afterSelect** `(selectedPaymentMethod => void)` - Called after selecting payment method.
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

### Why some integrations have a mocked `VsfPaymentProvider`?

There are eCommerce backends that do not provide any payment methods out-of-the-box, e.g., commercetools. For these, you provide a mock component with the same interface as a real integration, so you can easily swap it with a payment integration of your choice. You can find available payment integrations [here](/v2/integrations/).
