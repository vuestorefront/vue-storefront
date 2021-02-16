<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ShippingForm
      :isSaving="isSaving"
      :handleShippingAddressSubmit="handleShippingAddressSubmit"
      @stepSubmit="handleStepSubmit"
    />
  </div>
</template>

<script>
import {
  SfHeading
} from '@storefront-ui/vue';
import { useShipping } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import { reactive } from '@vue/composition-api';
import ShippingForm from '@/components/Checkout/ShippingForm';

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    ShippingForm
  },
  setup(_, context) {
    const {
      save: saveShipping,
      load: loadShipping,
      error: shippingError
    } = useShipping();

    const isSaving = reactive({
      details: false,
      method: false
    });

    onSSR(async () => {
      await loadShipping();
    });

    const handleShippingAddressSubmit = async shippingDetails => {
      isSaving.details = true;
      await saveShipping({ shippingDetails });
      if (shippingError.value.save) {
        return;
      }
      isSaving.details = false;
    };

    const handleStepSubmit = () => context.root.$router.push('/checkout/payment');

    return {
      isSaving,
      handleShippingAddressSubmit,
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
