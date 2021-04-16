<template>
  <div>
    <p>
      <b>Please implement vendor specific VsfShippingProvider component in 'components/Checkout' directory</b>
    </p>

    <SfRadio
      v-e2e="'shipping-method'"
      v-for="method in shippingMethods"
      :key="method.value"
      :label="method.label"
      :value="method.value"
      :description="method.description"
      :selected ="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @input="selectMethod(method.value)"
    >
      <div class="shipping__label">
        {{ method.label }}
      </div>

      <div class="shipping__description">
        {{ method.description }}
      </div>
    </SfRadio>

    <SfButton
      v-e2e="'continue-to-billing'"
      :disabled="!selectedMethod"
      type="button"
      @click="$emit('submit')"
    >
      {{ $t('Continue to billing') }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

const SHIPPING_METHODS = [
  { label: 'Express US', value: 'express', description: 'Same day delivery' },
  { label: 'Standard US', value: 'standard', description: 'Delivery in 5-6 working days' }
];

export default {
  name: 'VsfShippingProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup() {
    const selectedMethod = ref(null);

    const selectMethod = method => selectedMethod.value = method;

    return {
      shippingMethods: SHIPPING_METHODS,
      selectedMethod,
      selectMethod
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
