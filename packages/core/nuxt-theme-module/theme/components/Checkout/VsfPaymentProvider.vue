<template>
  <div>
    <p>
      <b>Please implement vendor specific VsfPaymentProvider component in 'components/Checkout' directory</b>
    </p>

    <SfRadio
      v-e2e="'payment-method'"
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
    </SfRadio>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

const SHIPPING_METHODS = [
  { label: 'Visa Debit', value: 'visa_debit' },
  { label: 'MasterCard', value: 'master_card' },
  { label: 'VisaElectron', value: 'visa_electron' },
  { label: 'Cash on delivery', value: 'cash' },
  { label: 'Check', value: 'check' }
];

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup(props, { emit }) {
    const selectedMethod = ref(null);

    const selectMethod = (method) => {
      selectedMethod.value = method;
      emit('status');
    };

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
