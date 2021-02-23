<template>
  <div>
    <ShippingForm
      :handleShippingAddressSubmit="handleShippingAddressSubmit"
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
  setup () {
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

    return {
      handleShippingAddressSubmit
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
