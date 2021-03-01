<template>
  <div class="shipping-provider">
    <SfHeading
      :level="3"
      :title="$t('Shipping method')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div v-if="error.loadMethods">
        {{ $t('There was some error while trying to fetch shipping methods. We are sorry, please try with different shipping details or later.') }}
      </div>
      <div v-else-if="errorShippingProvider.save">
        {{ $t('There was some error while trying to select this shipping method. We are sorry, please try with different shipping method or later.') }}
      </div>
      <div class="form__radio-group">
          <SfRadio
            v-for="method in shippingMethods"
            :key="method.id"
            :label="method.name"
            :value="method.id"
            :selected="selectedShippingMethod && selectedShippingMethod.shippingMethod && selectedShippingMethod.shippingMethod.id"
            @input="selectShippingMethod(method)"
            name="shippingMethod"
            :description="method.description"
            class="form__radio shipping"
          >
            <template #label="{ label }">
              <div class="sf-radio__label shipping__label">
                <div>{{ label }}</div>
                <div v-if="method && method.zoneRates">{{ $n(getShippingMethodPrice(method), 'currency') }}</div>
              </div>
            </template>
            <template #description="{ description }">
              <div class="sf-radio__description shipping__description">
                <div class="shipping__info">
                  {{ description }}
                </div>
              </div>
            </template>
          </SfRadio>
        </div>
      <div class="form__action">
        <nuxt-link
          to="/checkout/shipping"
          class="sf-button color-secondary form__back-button"
          >{{ $t('Go back') }}</nuxt-link
        >
        <SfButton
          class="form__action-button"
          type="button"
          @click.native="$emit('submit')"
          :disabled="!isShippingMethodStepCompleted || loading || loadingShippingProvider.save"
        >
          {{ $t('Continue to billing') }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart, useShippingProvider } from '@vue-storefront/commercetools';
import {
  SfHeading,
  SfButton,
  SfRadio
} from '@storefront-ui/vue';
import { ref, reactive, onMounted } from '@vue/composition-api';
import getShippingMethodPrice from '@/helpers/Checkout/getShippingMethodPrice';
import { useVSFContext } from '@vue-storefront/core';

export default {
  name: 'VsfShippingProvider',
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
  setup (props) {
    const isShippingMethodStepCompleted = ref(false);
    const loading = ref(false);
    const shippingMethods = ref([]);
    const { $ct } = useVSFContext();
    const { cart } = useCart();
    const { response: selectedShippingMethod, save, error: errorShippingProvider, loading: loadingShippingProvider } = useShippingProvider();

    const error = reactive({
      loadMethods: null
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
        const shippingMethodsResponse = await $ct.api.getShippingMethods(cart.value.id);
        return shippingMethodsResponse.data;
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

    const selectShippingMethod = async shippingMethod => {
      if (loadingShippingProvider.value.save) {
        return;
      }
      await save({ shippingMethod });
      if (errorShippingProvider.value.save) {
        isShippingMethodStepCompleted.value = false;
        return;
      }
      await callHookWithFallback(props.onSelected, { shippingMethod: selectedShippingMethod.value });
      isShippingMethodStepCompleted.value = true;
    };

    onMounted(async () => {
      loading.value = true;
      await callHookWithFallback(props.beforeLoad);
      const shippingMethodsResponse = await loadMethods();
      if (error.loadMethods) {
        return;
      }
      shippingMethods.value = await callHookWithFallback(
        props.afterLoad,
        { shippingMethods: shippingMethodsResponse },
        shippingMethodsResponse.shippingMethods
      );
      loading.value = false;
    });

    return {
      shippingMethods,
      selectedShippingMethod,
      selectShippingMethod,
      getShippingMethodPrice,
      isShippingMethodStepCompleted,

      loading,
      loadingShippingProvider,

      error,
      errorShippingProvider
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}

.shipping-provider {
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
