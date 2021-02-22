<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ShippingForm
      :isShippingDetailsCompleted.sync="isShippingDetailsCompleted"
      :isShippingMethodCompleted.sync="isShippingMethodCompleted"
      :handleShippingAddressSubmit="handleShippingAddressSubmit"
    />
    <ShippingProvider
      v-if="isShippingDetailsCompleted"
      :finished.sync="isShippingMethodCompleted"
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
import { ref } from '@vue/composition-api';

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    ShippingForm,
    ShippingProvider: () => import('@/components/Checkout/ShippingProvider')
  },
  setup(_, context) {
    const isShippingMethodCompleted = ref(false);
    const isShippingDetailsCompleted = ref(false);

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
      handleStepSubmit,

      isShippingDetailsCompleted,
      isShippingMethodCompleted
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
