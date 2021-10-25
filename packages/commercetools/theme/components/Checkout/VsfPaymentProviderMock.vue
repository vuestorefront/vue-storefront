<template>
  <div class="payment-provider">
    <SfHeading
      :level="3"
      :title="$t('Payment methods')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__radio-group payment__methods">
          <SfRadio
            v-e2e="'payment-method'"
            v-for="method in paymentMethods"
            :key="method.id"
            :label="method.name"
            :value="method.id"
            :selected="selectedPaymentMethod.id"
            @change="selectPaymentMethod(method)"
            name="paymentMethod"
            :description="method.description"
            class="form__radio payment__method"
          >
            <template #label="{ label }">
              <div class="sf-radio__label payment__label">
                <div>{{ label }}</div>
              </div>
            </template>
            <template #description="{ description }">
              <div class="sf-radio__description payment__description">
                <div class="payment__info">
                  {{ description }}
                </div>
              </div>
            </template>
          </SfRadio>
        </div>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfButton,
  SfRadio
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { usePaymentProviderMock } from '@/composables/usePaymentProviderMock';

export default {
  name: 'VsfPaymentProviderMock',
  components: {
    SfHeading,
    SfButton,
    SfRadio
  },
  setup () {
    const { status } = usePaymentProviderMock();
    const selectedPaymentMethod = ref({});
    const paymentMethods = ref([
      {
        id: 'mocked-id',
        name: 'Cash on delivery',
        description: ''
      }
    ]);

    const selectPaymentMethod = paymentMethod => {
      selectedPaymentMethod.value = paymentMethod;
      status.value = true;
    };

    return {
      paymentMethods,
      selectedPaymentMethod,
      selectPaymentMethod
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}
.form {
  --button-width: 100%;
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      margin: 0 0 var(--spacer-xl) 0;
    }

  }
}
.payment {
  &__methods {
    border: 1px solid var(--c-light);
    border-width: 1px 0;
    @include for-desktop {
      display: flex;
      padding: var(--spacer-lg) 0;
    }
  }
  &__method {
    --radio-description-margin: 0;
    --radio-container-align-items: center;
    --ratio-content-margin: 0 0 0 var(--spacer-base);
    --radio-label-font-size: var(--font-base);
    --radio-background: transparent;
    white-space: nowrap;
    --radio-background: transparent;
    @include for-desktop {
      border: 0;
      --radio-border-radius: 4px;
    }
  }
}
</style>
