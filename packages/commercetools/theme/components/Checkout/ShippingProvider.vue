<template>
  <div class="shipping-provider">
    <SfHeading
      :level="3"
      title="Shipping method"
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
import ShippingProviderUtils from './ShippingProviderUtils';
import { ref, onMounted } from '@vue/composition-api';
import getShippingMethodPrice from '@/helpers/Checkout/getShippingMethodPrice';

export default {
  name: 'ShippingProvider',
  props: {
    handleShippingMethodSubmit: Function,
    'methods:beforeLoad': {
      type: Function,
      default: () => Promise.resolve()
    },
    finished: Boolean
  },
  components: {
    SfHeading,
    SfButton,
    SfRadio
  },
  setup (props, context) {
    const loading = ref(false);
    const shippingMethods = ref([]);
    const chosenShippingMethod = ref({});
    const { save, load, error } = ShippingProviderUtils(useCart());

    onMounted(async () => {
      loading.value = true;
      await props['methods:beforeLoad']();
      const shippingMethodsResponse = await load();
      loading.value = false;
      if (error.value.load) {
        context.emit('error', error.value.load);
        return;
      }
      shippingMethods.value = shippingMethodsResponse.shippingMethods;
      context.emit('methods:afterLoad', { shippingMethods: shippingMethodsResponse });
    });

    const handleMethodSubmit = async shippingMethod => {
      if (loading.value) {
        return;
      }
      loading.value = true;
      const newShippingMethod = await save({ shippingMethod });
      loading.value = false;
      if (error.value.save) {
        context.emit('error', error.value.save);
        chosenShippingMethod.value = {};
        return;
      }
      chosenShippingMethod.value = newShippingMethod;
      context.emit('methods:selected', { shippingMethod: newShippingMethod });
      context.emit('update:finished', true);
    };

    const handleStepSubmit = () => context.emit('stepSubmit');

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
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
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
