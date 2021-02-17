<template>
  <SfProperty
    name="Shipping"
    v-if="chosenShippingMethod && chosenShippingMethod.zoneRates"
    :value="$n(getShippingMethodPrice(chosenShippingMethod), 'currency')"
    class="sf-property--full-width sf-property--large property"
  />
</template>

<script>
import { SfProperty } from '@storefront-ui/vue';
import getShippingMethodPrice from '@/helpers/Checkout/getShippingMethodPrice';
import { ref } from '@vue/composition-api';

export default {
  components: {
    SfProperty
  },
  setup () {
    const chosenShippingMethod = ref(0);
    return {
      getShippingMethodPrice,
      chosenShippingMethod
    };
  }
};
</script>
