---
"@vue-storefront/nuxt": major
---

[ADDED] global state management with Pinia. This will allow you to keep your global state in a more organized way.
It shares the data about:
- cart
- customer
- currency
- locale

This change will require you to refactor your composables and make use of the introduced state manager.
As this is only a state management, you will still need to use the composables to fetch the data and put it into the state.

Every part of global state can now be used as refs so reading and writing to them is more straightforward.

Example of usage:

```vue
<template>
  <div>
    <p>Cart total: {{ cart.total }}</p>
    <p>Customer name: {{ customer.firstName }} {{ customer.lastName }}</p>
    <p>Currency: {{ currency }}</p>
    <p>Locale: {{ locale }}</p>
  </div>
</template>

<script setup>
  const { cart, customer, currency, currencies, locale, locales } = storeToRefs(useSfState());

  // updating the currency state
  currency.value = 'USD';

  // updating the cart state
  onMounted(async () => {
    cart.value = await useSdk().unified.getCart()
  });
</script>
```

[BREAKING] [CHANGED] module configKey is changed from `vsf` to `alokai`. Also, the support for the `vsf` key in Runtime Envs has been changed to `alokai`.

```diff
 meta: {
    name: "@vue-storefront/nuxt",
-   configKey: "vsf",
+   configKey: "alokai",
    compatibility: {
      nuxt: "^3.0.0",
    },
```

```diff
nuxt.options.runtimeConfig.public.alokai = defu(
-  nuxt.options.runtimeConfig.public?.vsf as any,
+  nuxt.options.runtimeConfig.public?.alokai as any,
   options
);
```

