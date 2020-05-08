<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ValidationObserver v-slot="{ handleSubmit, dirty, reset }">
      <form @submit.prevent="handleSubmit(dirty ? handleShippingAddressSubmit(reset) : handleShippingMethodSubmit(reset))">
        <div class="form">
          <ValidationProvider name="firstName" rules="required|min:2" v-slot="{ errors }" slim>
            <SfInput
              :value="shippingDetails.firstName"
              @input="firstName => setShippingDetails({ firstName })"
              label="First name"
              name="firstName"
              class="form__element form__element--half"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider name="lastName" rules="required|min:2" v-slot="{ errors }" slim>
            <SfInput
              :value="shippingDetails.lastName"
              @input="lastName => setShippingDetails({ lastName })"
              label="Last name"
              name="lastName"
              class="form__element form__element--half form__element--half-even"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider name="streetName" rules="required|min:2" v-slot="{ errors }" slim>
            <SfInput
              :value="shippingDetails.streetName"
              @input="streetName => setShippingDetails({ streetName })"
              label="Street name"
              name="streetName"
              class="form__element form__element--half"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider name="apartment" rules="required|min:2" v-slot="{ errors }" slim>
            <SfInput
              :value="shippingDetails.streetNumber"
              @input="streetNumber => setShippingDetails({ streetNumber })"
              label="House/Apartment number"
              name="apartment"
              class="form__element form__element--half form__element--half-even"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider name="city" rules="required|min:2" v-slot="{ errors }" slim>
            <SfInput
              :value="shippingDetails.city"
              @input="city => setShippingDetails({ city })"
              label="City"
              name="city"
              class="form__element form__element--half"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider name="zipCode" rules="required|min:2" v-slot="{ errors }" slim>
            <SfInput
              :value="shippingDetails.postalCode"
              @input="postalCode => setShippingDetails({ postalCode })"
              label="Zip-code"
              name="zipCode"
              class="form__element form__element--half form__element--half-even"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider name="country" rules="required|min:2" v-slot="{ errors }" slim>
          <SfSelect
            :selected="shippingDetails.country"
            @change="country => setShippingDetails({ country })"
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
          <ValidationProvider name="phone" rules="required|digits:9" v-slot="{ errors }" slim>
          <SfInput
            :value="shippingDetails.contactInfo.phone"
            @input="phone => setShippingDetails({ contactInfo: { phone } })"
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
          v-if="isShippingAddressCompleted && !dirty"
          :level="3"
          title="Shipping method"
          class="sf-heading--left sf-heading--no-underline title"
        />
        <div class="form">
          <div class="form__radio-group" v-if="isShippingAddressCompleted && !dirty">
            <SfRadio
              v-for="item in shippingMethods"
              :key="checkoutGetters.getShippingMethodName(item)"
              :label="checkoutGetters.getShippingMethodName(item)"
              :value="checkoutGetters.getShippingMethodId(item)"
              :selected="checkoutGetters.getShippingMethodId(chosenShippingMethod)"
              @input="setShippingMethod(item, { save: true })"
              name="shippingMethod"
              :description="checkoutGetters.getShippingMethodDescription(item)"
              class="form__radio shipping"
            >
              <template #label="{label}">
                <div class="sf-radio__label shipping__label">
                  <div>{{ label }}</div>
                  <div>${{ checkoutGetters.getShippingMethodPrice(item) }}</div>
                </div>
              </template>
              <template #description="{description}">
                <div class="sf-radio__description shipping__description">
                  <div class="shipping__info">
                    {{ description }}
                  </div>
                </div>
              </template>
            </SfRadio>
          </div>
          <div class="form__action">
            <nuxt-link to="/checkout/personal-details" class="sf-button color-secondary form__back-button">Go back</nuxt-link>
            <SfButton class="form__action-button" type="submit" v-if="isShippingAddressCompleted && !dirty" :disabled="!isShippingMethodCompleted || loading.shippingAddress">
              Continue to payment
            </SfButton>
            <SfButton class="form__action-button" type="submit" :disabled="loading.shippingMethods" v-else>
              Select shipping method
            </SfButton>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio
} from '@storefront-ui/vue';
import { countries } from '@vue-storefront/commercetools-api';
import { useCheckout, checkoutGetters } from '@vue-storefront/commercetools';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, digits } from 'vee-validate/dist/rules';
import { onSSR } from '@vue-storefront/core';

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
  name: 'PersonalDetails',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    ValidationProvider,
    ValidationObserver
  },
  setup(props, context) {
    const {
      shippingDetails,
      chosenShippingMethod,
      setShippingDetails,
      setShippingMethod,
      shippingMethods,
      loadShippingMethods,
      isShippingAddressCompleted,
      isShippingMethodCompleted,
      loadDetails,
      loading
    } = useCheckout();

    onSSR(async () => {
      await loadDetails();
      await loadShippingMethods();
    });

    const handleShippingAddressSubmit = (reset) => async () => {
      await setShippingDetails(shippingDetails.value, { save: true });
      await loadShippingMethods();
      reset();
    };

    const handleShippingMethodSubmit = (reset) => async () => {
      reset();
      context.root.$router.push('/checkout/payment');
    };

    return {
      loading,
      handleShippingAddressSubmit,
      handleShippingMethodSubmit,
      isShippingAddressCompleted,
      isShippingMethodCompleted,
      setShippingDetails,
      setShippingMethod,
      shippingDetails,
      chosenShippingMethod,
      shippingMethods,
      checkoutGetters,
      countries
    };
  }
};

</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  @include for-desktop {
    margin: var(--spacer-2xl) 0 var(--spacer-base) 0;
  }
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
        --button-margin: 0;
        text-align: left;
      }
    }
  }
  &__back-button {
    margin: 0 var(--spacer-xl) 0 0;

    &:hover {
      color:  white;
    }
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-2xl) 0;
  }
}
.shipping {
  margin: 0 calc(var(--spacer-xl) * -1);
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
  &__delivery {
    color: var(--c-text-muted);
  }
  &__action {
    margin: 0 0 0 var(--spacer);
    &::before {
      content: "+";
    }
    &--is-active {
      --button-color: var(--c-primary);
      --button-transition: color 150ms linear;
      &::before {
        content: "-";
      }
    }
  }
}
</style>
