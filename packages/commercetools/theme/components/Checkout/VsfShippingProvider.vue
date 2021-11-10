<template>
  <div class="shipping-provider">
    <SfHeading
      :level="3"
      :title="$t('Shipping method')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfLoader :loading="loading">
        <div v-if="error.loadMethods">
          {{ $t('There was some error while trying to fetch shipping methods. We are sorry, please try with different shipping details or later.') }}
        </div>
        <div v-else-if="errorShippingProvider.save">
          {{ $t('There was some error while trying to select this shipping method. We are sorry, please try with different shipping method or later.') }}
        </div>
        <div v-else-if="!shippingMethods.length">
          {{ $t('There are no shipping methods available for this country. We are sorry, please try with different country or later.') }}
        </div>
      </SfLoader>
      <div class="form__radio-group">
          <SfRadio
            v-e2e="'shipping-method-label'"
            v-for="method in shippingMethods"
            :key="method.id"
            :label="method.name"
            :value="method.id"
            :selected="selectedShippingMethod && selectedShippingMethod.shippingMethod && selectedShippingMethod.shippingMethod.id"
            @change="selectShippingMethod(method)"
            name="shippingMethod"
            :description="method.localizedDescription"
            class="form__radio shipping"
          >
            <template #label="{ label }">
              <div class="sf-radio__label shipping__label">
                <div>{{ label }}</div>
                <div v-if="method && method.zoneRates">{{ $n(getShippingMethodPrice(method, totals.total), 'currency') }}</div>
              </div>
            </template>
            <template #description="{ localizedDescription }">
              <div class="sf-radio__description shipping__description">
                <div class="shipping__info">
                  {{ localizedDescription }}
                </div>
              </div>
            </template>
          </SfRadio>
        </div>
    </div>
  </div>
</template>

<script>
import { useCart, useShippingProvider, cartGetters } from '@vue-storefront/commercetools';
import {
  SfHeading,
  SfButton,
  SfRadio,
  SfLoader
} from '@storefront-ui/vue';
import { ref, reactive, onMounted, computed } from '@nuxtjs/composition-api';
import getShippingMethodPrice from '@/helpers/Checkout/getShippingMethodPrice';
import { useVSFContext } from '@vue-storefront/core';

export default {
  name: 'VsfShippingProvider',
  components: {
    SfHeading,
    SfButton,
    SfRadio,
    SfLoader
  },
  props: {
    beforeLoad: {
      type: Function,
      default: config => config
    },
    afterLoad: {
      type: Function,
      default: shippingMethodsResponse => shippingMethodsResponse.shippingMethods
    },
    beforeSelect: {
      type: Function,
      default: shippingMethod => shippingMethod
    },
    afterSelect: {
      type: Function,
      // eslint-disable-next-line
      default: selectedShippingMethod => {}
    },
    beforeSelectedDetailsChange: {
      type: Function,
      default: () => {}
    },
    afterSelectedDetailsChange: {
      type: Function,
      default: () => {}
    },
    onError: {
      type: Function,
      // eslint-disable-next-line
      default: ({ action, error }) => {}
    }
  },
  setup (props) {
    const loading = ref(false);
    const shippingMethods = ref([]);
    const { $ct } = useVSFContext();
    const { cart } = useCart();
    const {
      state,
      setState,
      save,
      load,
      error: errorShippingProvider,
      loading: loadingShippingProvider
    } = useShippingProvider();
    const selectedShippingMethod = computed(() => state.value && state.value.response);
    const totals = computed(() => cartGetters.getTotals(cart.value));

    const error = reactive({
      loadMethods: null
    });

    const loadMethods = async () => {
      try {
        error.loadMethods = null;
        const shippingMethodsResponse = await $ct.api.getShippingMethods(cart.value.id);
        return shippingMethodsResponse.data;
      } catch (err) {
        error.loadMethods = err;
        await props.onError({
          action: 'loadMethods',
          error: error.loadMethods
        });
      }
    };

    const selectShippingMethod = async shippingMethod => {
      if (loadingShippingProvider.value) {
        return;
      }
      const interceptedShippingMethod = await props.beforeSelect(shippingMethod);
      await save({ shippingMethod: interceptedShippingMethod });
      if (errorShippingProvider.value.save) {
        setState({
          ...(state.value ? state.value : {}),
          _status: false
        });
        await props.onError({
          action: 'selectShippingMethod',
          error: errorShippingProvider.value.save
        });
        return;
      }
      await props.afterSelect(selectedShippingMethod.value);
      setState({
        ...(state.value ? state.value : {}),
        _status: true
      });
    };

    onMounted(async () => {
      loading.value = true;
      await props.beforeLoad();
      const shippingMethodsResponse = await loadMethods();
      if (error.loadMethods) {
        return;
      }
      await load();
      shippingMethods.value = await props.afterLoad(shippingMethodsResponse);
      loading.value = false;
    });

    return {
      shippingMethods,
      selectedShippingMethod,
      selectShippingMethod,
      getShippingMethodPrice,
      totals,

      loading,

      error,
      errorShippingProvider,
      state
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
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
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 25rem;
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
