<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Billing')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <BillingForm
      :handleBillingAddressSubmit="saveBillingAddress"
      @submit="$router.push('/checkout/order-review')"
    />
  </div>
</template>

<script>
import {
  SfHeading
} from '@storefront-ui/vue';
import { useBilling } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import BillingForm from '@/components/Checkout/BillingForm';

export default {
  name: 'Billing',
  components: {
    SfHeading,
    BillingForm
  },
  setup () {
    const {
      save,
      load
    } = useBilling();

    onSSR(async () => {
      await load();
    });

    return {
      saveBillingAddress: save
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
