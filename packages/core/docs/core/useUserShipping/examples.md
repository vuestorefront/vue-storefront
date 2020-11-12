Fetching shipping addresses for currently logged-in user:

```typescript
import { onSSR } from '@vue-storefront/core';
import { useUserShipping, userShippingGetters } from '@vsf-enterprise/ct-shipping';

export default {
  setup() {
    const {
      shipping: rawShipping,
      load,
      addAddress,
      deleteAddress,
      updateAddress
      } = useUserShipping();

    const shipping = computed(() => userShippingGetters.getAddresses(rawShipping.value));

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await load();
    });

    return {
      shipping,
      userShippingGetters
    };
  }
};
```
