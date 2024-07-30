---
"@vue-storefront/nuxt": major
---

[BREAKING] [ADDED] global state management with Pinia. This will allow you to keep your global state in a more organized way.
It shares the data about:
- cart
- customer
- currency
- locale

This is a breaking change because it requires you to refactor your composables and usage of them.
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


