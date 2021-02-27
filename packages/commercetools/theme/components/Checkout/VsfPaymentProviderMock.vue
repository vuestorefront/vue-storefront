<template>
  <div class="payment-provider">
    <SfHeading
      :level="3"
      :title="$t('Payment methods')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div v-if="error.loadMethods">
        {{ $t('There was some error while trying to fetch payment methods. We are sorry, please try with different billing details or later.') }}
      </div>
      <div v-else-if="error.saveMethod">
        {{ $t('There was some error while trying to select this payment method. We are sorry, please try with different payment method or later.') }}
      </div>
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
import { ref, reactive, onMounted } from '@vue/composition-api';

export default {
  name: 'VsfPaymentProviderMock',
  components: {
    SfHeading,
    SfButton,
    SfRadio
  },
  props: {
    beforeLoad: Function,
    afterLoad: Function,
    onSelected: Function,
    onSelectedDetailsChanged: Function,
    onError: Function
  },
  setup (props, context) {
    const loading = ref(false);
    const paymentMethods = ref([]);
    const selectedPaymentMethod = ref({});

    const error = reactive({
      loadMethods: null,
      saveMethod: null
    });

    const callHookWithFallback = async (hookFn, arg = null, fallbackValue = null) => {
      if (typeof hookFn === 'function') {
        return await hookFn(arg);
      }
      return fallbackValue;
    };

    const loadMethods = async () => {
      try {
        error.loadMethods = null;
        return [
          {
            id: 'mocked-id',
            name: 'Cash on delivery',
            description: 'Pay when you get the package'
          }
        ];
      } catch (err) {
        error.loadMethods = err;
        await callHookWithFallback(
          props.onError,
          {
            action: 'loadMethods',
            error: error.loadMethods
          }
        );
      }
    };

    const saveMethod = async ({ paymentMethod }) => {
      try {
        error.saveMethod = null;
        loading.value = true;
        return paymentMethod;
      } catch (err) {
        error.saveMethod = err;
        await callHookWithFallback(
          props.onError,
          {
            action: 'saveMethod',
            error: error.saveMethod
          }
        );
      } finally {
        loading.value = false;
      }
    };

    const selectPaymentMethod = async paymentMethod => {
      if (loading.value) {
        return;
      }
      const newPaymentMethod = await saveMethod({ paymentMethod });
      if (error.saveMethod) {
        selectedPaymentMethod.value = {};
        context.emit('status', false);
        return;
      }
      selectedPaymentMethod.value = await callHookWithFallback(props.onSelected, { paymentMethod: newPaymentMethod }, newPaymentMethod);
      context.emit('status', true);
    };

    onMounted(async () => {
      loading.value = true;
      await callHookWithFallback(props.beforeLoad);
      const paymentMethodsResponse = await loadMethods();
      if (error.loadMethods) {
        return;
      }
      paymentMethods.value = await callHookWithFallback(
        props.afterLoad,
        { paymentMethods: paymentMethodsResponse },
        paymentMethodsResponse
      );
      loading.value = false;
    });

    return {
      loading,
      paymentMethods,
      selectedPaymentMethod,
      selectPaymentMethod,
      error
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
