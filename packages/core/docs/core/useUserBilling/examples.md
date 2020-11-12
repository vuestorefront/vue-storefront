Fetching billing addresses for currently logged-in user:

```typescript
import { onSSR } from '@vue-storefront/core';
import { useUserBilling, userBillingGetters } from '@vsf-enterprise/ct-billing';

export default {
  setup() {
    const {
      billing: rawBilling,
      load,
      addAddress,
      deleteAddress,
      updateAddress
      } = useUserBilling();

    const billing = computed(() => userBillingGetters.getAddresses(rawBilling.value));

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await load();
    });

    return {
      billing,
      userBillingGetters
    };
  }
};
```
