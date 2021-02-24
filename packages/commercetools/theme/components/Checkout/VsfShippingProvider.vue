<template>
  <div class="shipping-provider">
    <SfHeading
      :level="3"
      :title="$t('Shipping method')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div v-if="error.load">
        There was some error while trying to fetch shipping methods. We are sorry, please try with other shipping details or later.
      </div>
      <div v-else-if="error.save">
        There was some error while trying to select this shipping method. We are sorry, please try with other shipping method or later.
      </div>
      <div class="form__radio-group">
          <SfRadio
            v-for="item in shippingMethods"
            :key="item.id || item.name"
            :label="item.name"
            :value="item.id"
            :selected="chosenShippingMethod.id"
            @input="handleMethodSubmit(item)"
            name="shippingMethod"
            :description="item.description"
            class="form__radio shipping"
          >
            <template #label="{ label }">
              <div class="sf-radio__label shipping__label">
                <div>{{ label }}</div>
                <div v-if="item && item.zoneRates">${{ getShippingMethodPrice(item) }}</div>
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
          to="/checkout/personal-details"
          class="sf-button color-secondary form__back-button"
          >Go back</nuxt-link
        >
        <SfButton
          class="form__action-button"
          type="submit"
          @click.native="handleStepSubmit"
          :disabled="!finished || loading"
        >
          {{ $t('Continue to payment') }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '@vue-storefront/commercetools';
import {
  SfHeading,
  SfButton,
  SfRadio
} from '@storefront-ui/vue';
import { ref, reactive, onMounted } from '@vue/composition-api';
import getShippingMethodPrice from '@/helpers/Checkout/getShippingMethodPrice';
import { useVSFContext } from '@vue-storefront/core';
import { cartActions } from '@vue-storefront/commercetools-api';

export default {
  name: 'ShippingProvider',
  props: {
    finished: Boolean
  },
  components: {
    SfHeading,
    SfButton,
    SfRadio
  },
  setup (_, context) {
    const loading = ref(false);
    const shippingMethods = ref([]);
    const chosenShippingMethod = ref({});
    const { $ct } = useVSFContext();
    const { cart, setCart } = useCart();

    const error = reactive({
      load: null,
      save: null
    });

    const load = async () => {
      try {
        error.load = null;
        loading.value = true;
        const shippingMethodsResponse = await $ct.api.getShippingMethods(cart.value.id);
        return shippingMethodsResponse.data;
      } catch (err) {
        error.load = err;
        context.emit('error', {
          action: 'load',
          error: error.load
        });
      } finally {
        loading.value = false;
      }
    };

    const save = async ({ shippingMethod }) => {
      try {
        error.save = null;
        loading.value = true;
        const cartResponse = await $ct.api.updateCart({
          id: cart.value.id,
          version: cart.value.version,
          actions: [
            cartActions.setShippingMethodAction(shippingMethod.id)
          ]
        });

        setCart(cartResponse.data.cart);
        return cartResponse.data.cart.shippingInfo.shippingMethod;
      } catch (err) {
        error.save = err;
        context.emit('error', {
          action: 'save',
          error: error.save
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      context.emit('methods:beforeLoad');
      const shippingMethodsResponse = await load();
      if (error.load) {
        return;
      }
      shippingMethods.value = shippingMethodsResponse.shippingMethods;
      context.emit('methods:afterLoad', { shippingMethods: shippingMethodsResponse });
    });

    const handleMethodSubmit = async shippingMethod => {
      if (loading.value) {
        return;
      }
      const newShippingMethod = await save({ shippingMethod });
      if (error.save) {
        chosenShippingMethod.value = {};
        context.emit('update:finished', false);
        return;
      }
      chosenShippingMethod.value = newShippingMethod;
      context.emit('methods:selected', { shippingMethod: newShippingMethod });
      context.emit('update:finished', true);
    };

    const handleStepSubmit = () => context.emit('submit');

    return {
      loading,
      shippingMethods,
      chosenShippingMethod,
      handleMethodSubmit,
      handleStepSubmit,
      getShippingMethodPrice,
      error
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
