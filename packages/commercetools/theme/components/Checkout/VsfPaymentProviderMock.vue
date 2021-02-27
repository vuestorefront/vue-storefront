<template>
  <div class="payment-provider">
    <SfHeading
      :level="3"
      :title="$t('Payment methods')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__radio-group">
          <SfRadio
            v-for="method in paymentMethods"
            :key="method.id"
            :label="method.name"
            :value="method.id"
            :selected="selectedPaymentMethod.id"
            @input="selectPaymentMethod(method)"
            name="paymentMethod"
            :description="method.description"
            class="form__radio payment"
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
import { ref } from '@vue/composition-api';

export default {
  name: 'VsfPaymentProviderMock',
  components: {
    SfHeading,
    SfButton,
    SfRadio
  },
  setup (props, context) {
    const selectedPaymentMethod = ref({});
    const paymentMethods = ref([
      {
        id: 'mocked-id',
        name: 'Cash on delivery',
        description: 'Pay when you get the package'
      }
    ]);

    const selectPaymentMethod = paymentMethod => {
      selectedPaymentMethod.value = paymentMethod;
      context.emit('status', true);
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
}

.payment-provider {
  .sf-radio {
    &__label {
      display: flex;
      justify-content: space-between;
    }
    &__description {
      --radio-description-margin: 0;
      --radio-description-font-size: var(--font-xs);
    }
  }
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
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }
    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      margin: 0 0 var(--spacer-2xl) 0;
    }

  }
}
</style>
