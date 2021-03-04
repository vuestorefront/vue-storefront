# What's checkout?
Checkout is a process of providing information about shipping and billing details, and picking certain shipping and payment method. Then with all the data, we are able to place an order and pay for it.

## Shipping details
Shipping details are information about the receiver and her/his address. Based on that, shop will know how to address a package.

To access shipping details, we can use property of `useShipping` called `shipping`.
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
`shipping` property will return `null` if the address is not saved on the server or just has not been loaded.   

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

Shipping details stored on the server with `save` method will be always possible to load with `load` method.

## Shipping providers
We delegate whole logic of selecting shipping method to the dedicated component called **VsfShippingProvider.vue**. Each shipping extension shares one. All we have to do is import and put it in a proper place.
```vue
<VsfShippingProvider
  @submit="$router.push('/checkout/billing')"
/>
```

VsfShippingProvider emits `submit` event when shipping method is properly picked and configured so we could move to the next step.

You can pass asynchronous functions as `VsfShippingProvider` props to hook into different events within it's lifecycle and override initial function parameters or react to specific events like method selection
- **beforeLoad** - called before loading shipping methods
- **afterLoad** - called after loading shipping methods
- **onSelected** - called after selecting shipping method
- **onSelectedDetailsChanged** - called after modifying currently picked shipping method, e.g. selecting parcel locker on the map
- **onError** - called when some operation throws an error

We can inject in the hook via props:
```vue
<VsfShippingProvider
  :beforeLoad="beforeLoad"
  :afterLoad="afterLoad"
  :onSelected="onSelected"
  :onSelectedDetailsChanged="onSelectedDetailsChanged"
  :onError="onError"
/>
```


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
`billing` property will return `null` if the address is not saved on the server or just has not been loaded.   

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

## Payment providers

## Order
