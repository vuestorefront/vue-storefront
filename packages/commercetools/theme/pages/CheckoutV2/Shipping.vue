<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ShippingForm
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
import ShippingForm from '@/components/Checkout/ShippingForm';

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    ShippingForm
  },
  setup(_, context) {
    const {
      save,
      load
    } = useShipping();

    onSSR(async () => {
      await load();
    });

    const handleShippingAddressSubmit = async shippingDetails => {
      await save({ shippingDetails });
    };

    const handleStepSubmit = () => context.root.$router.push('/checkout/payment');

    return {
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
