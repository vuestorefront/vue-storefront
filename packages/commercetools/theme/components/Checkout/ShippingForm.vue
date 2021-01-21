<template>
  <ValidationObserver v-slot="{ handleSubmit, dirty, reset }">
    <form
      @submit.prevent="
        handleSubmit(
          isShippingDetailsCompleted && isShippingMethodCompleted && !dirty
            ? handleStepSubmit
            : handleAddressSubmit(reset)
        )
      "
    >
      <!-- <UserShippingAddresses
        v-if="isAuthenticated && shippingAddresses && shippingAddresses.length"
        :setAsDefault="setAsDefault"
        :shippingAddresses="shippingAddresses"
        :currentAddressId="currentAddressId"
        @setCurrentAddress="setCurrentAddress($event)"
        @changeSetAsDefault="setAsDefault = $event"
      /> -->
      <div class="form">
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="shippingDetails.firstName"
            @input="(firstName) => (shippingDetails.firstName = firstName)"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="lastName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="shippingDetails.lastName"
            @input="(lastName) => (shippingDetails.lastName = lastName)"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="streetName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="shippingDetails.streetName"
            @input="(streetName) => (shippingDetails.streetName = streetName)"
            label="Street name"
            name="streetName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="apartment"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="shippingDetails.streetNumber"
            @input="
              (streetNumber) => (shippingDetails.streetNumber = streetNumber)
            "
            label="House/Apartment number"
            name="apartment"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="city"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="shippingDetails.city"
            @input="(city) => (shippingDetails.city = city)"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="shippingDetails.postalCode"
            @input="(postalCode) => (shippingDetails.postalCode = postalCode)"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            :value="shippingDetails.country"
            @input="(country) => (shippingDetails.country = country)"
            label="Country"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.name"
              :value="countryOption.name"
            >
              {{ countryOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="phone"
          rules="required|digits:9"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="shippingDetails.phone"
            @input="(phone) => (shippingDetails.phone = phone)"
            label="Phone number"
            name="phone"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <SfHeading
        v-if="isShippingDetailsCompleted && !dirty"
        :level="3"
        title="Shipping method"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <div class="form">
        <div class="form__radio-group" v-if="isShippingDetailsCompleted && !dirty">
          <SfRadio
            v-for="item in shippingMethods"
            :key="checkoutShippingMethodGetters.getMethodName(item)"
            :label="checkoutShippingMethodGetters.getMethodName(item)"
            :value="checkoutShippingMethodGetters.getMethodId(item)"
            :selected="
              checkoutShippingMethodGetters.getMethodId(chosenShippingMethod)
            "
            @input="handleMethodSubmit(reset, item)"
            name="shippingMethod"
            :description="checkoutShippingMethodGetters.getMethodDescription(item)"
            class="form__radio shipping"
          >
            <template #label="{ label }">
              <div class="sf-radio__label shipping__label">
                <div>{{ label }}</div>
                <div>${{ checkoutShippingMethodGetters.getMethodPrice(item) }}</div>
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
            >Go back</nuxt-link>
          <SfButton
            class="form__action-button"
            type="submit"
            v-if="isShippingDetailsCompleted && !dirty"
            :disabled="!isShippingMethodCompleted || isSaving.method"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
          <SfButton
            class="form__action-button"
            type="submit"
            :disabled="isSaving.details"
            v-else
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox
} from '@storefront-ui/vue';
import { useCheckoutShippingMethod, checkoutShippingMethodGetters } from '@vue-storefront/commercetools';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, digits } from 'vee-validate/dist/rules';
import { useVSFContext } from '@vue-storefront/core';
import { ref, watch } from '@vue/composition-api';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number'
});

export default {
  name: 'ShippingForm',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    UserShippingAddresses: () => import('~/components/Checkout/UserShippingAddresses'),
    ValidationProvider,
    ValidationObserver
  },
  props: {
    isSaving: Object,
    address: Object
  },
  setup(props, context) {
    const { $ct: { config } } = useVSFContext();
    const { shippingMethods } = useCheckoutShippingMethod();

    const shippingDetails = ref(props.address || {});
    const chosenShippingMethod = ref(null);
    const isShippingMethodCompleted = ref(false);
    const isShippingDetailsCompleted = ref(false);

    const handleStepSubmit = () => {
      context.emit('stepSubmit');
    };

    const handleMethodSubmit = (reset, shippingMethod) => {
      chosenShippingMethod.value = shippingMethod;
      context.emit('methodSubmit', {
        callback: () => {
          reset();
          isShippingMethodCompleted.value = true;
        },
        shippingMethod
      });
    };

    const handleAddressSubmit = reset => () => {
      context.emit('addressSubmit', {
        callback: () => {
          reset();
          isShippingDetailsCompleted.value = true;
        },
        shippingDetails: shippingDetails.value
      });
    };

    watch(shippingDetails, () => {
      context.emit('addressModify');
    });

    watch(() => props.address, (addr) => {
      shippingDetails.value = addr;
    });

    return {
      shippingDetails,
      chosenShippingMethod,
      checkoutShippingMethodGetters,
      countries: config.countries,
      shippingMethods,

      isShippingMethodCompleted,
      isShippingDetailsCompleted,

      handleMethodSubmit,
      handleAddressSubmit,
      handleStepSubmit
    };
  }
};
</script>

<style lang="scss" scoped>
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

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
