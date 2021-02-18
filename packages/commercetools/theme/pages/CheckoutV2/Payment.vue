<template>
  <div>
    <SfHeading
      :level="3"
      title="Billing"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <BillingForm
      :isSaving="isSaving"
      :handleBillingAddressSubmit="handleBillingAddressSubmit"
      @stepSubmit="handleStepSubmit"
    />
  </div>
</template>

<script>
import {
  SfHeading
} from '@storefront-ui/vue';
import { useBilling } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import { reactive } from '@vue/composition-api';
import BillingForm from '@/components/Checkout/BillingForm';

export default {
  name: 'Billing',
  components: {
    SfHeading,
    BillingForm
  },
  setup(_, context) {
    const {
      save: saveBilling,
      load: loadBilling,
      error: billingError
    } = useBilling();

    const isSaving = reactive({
      details: false,
      method: false
    });

    onSSR(async () => {
      await loadBilling();
    });

    const handleBillingAddressSubmit = async billingDetails => {
      isSaving.details = true;
      await saveBilling({ billingDetails });
      if (billingError.value.save) {
        return;
      }
      isSaving.details = false;
    };

    const handleStepSubmit = () => context.root.$router.push('/checkout/order-review');
    return {
      isSaving,
      handleBillingAddressSubmit,
      handleStepSubmit
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
