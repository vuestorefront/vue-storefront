<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
    <SfHeading
      :level="3"
      title="Billing address"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfCheckbox
      :selected="sameAsShipping"
      @change="handleCheckSameAddress"
      label="Copy address data from shipping"
      name="copyShippingAddress"
      class="form__element"
    />
      <div class="form">
        <ValidationProvider name="firstName" rules="required|min:2" v-slot="{ errors }" slim>
          <SfInput
            :value="billingDetails.firstName"
            @input="firstName => setBillingDetails({ firstName })"
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
            :value="billingDetails.lastName"
            @input="lastName => setBillingDetails({ lastName })"
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
            :value="billingDetails.streetName"
            @input="streetName => setBillingDetails({ streetName })"
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
            :value="billingDetails.streetNumber"
            @input="streetNumber => setBillingDetails({ streetNumber })"
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
            :value="billingDetails.city"
            @input="city => setBillingDetails({ city })"
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
            :value="billingDetails.postalCode"
            @input="postalCode => setBillingDetails({ postalCode })"
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
            :selected="billingDetails.country"
            @change="country => setBillingDetails({ country })"
            label="Country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="countryOption in COUNTRIES"
              :key="countryOption.key"
              :value="countryOption.key"
            >
              {{ countryOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider name="phone" rules="required|min:2" v-slot="{ errors }" slim>
          <SfInput
            :value="billingDetails.contactInfo.phone"
            @input="phone => setBillingDetails({ contactInfo: { phone } })"
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
      :level="3"
      title="Payment methods"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__element payment-methods">
        <SfRadio
          v-for="item in paymentMethods"
          :key="item.value"
          :selected="chosenPaymentMethod.value"
          :label="item.label"
          :value="item.value"
          @input="setPaymentMethod(item, { save: true })"
          name="paymentMethod"
          :description="item.description"
          class="form__radio payment-method"
        >
          <template #label>
            <div class="sf-radio__label">
              {{ item.label }}
            </div>
          </template>
        </SfRadio>
      </div>

    <form id="payment-form">
      <div class="card-frame">
        <!-- form will be added here -->
      </div>
      <!-- <button id="pay-button" :disabled="submitDisabled" @click="handleSubmit">
        PAY GBP 24.99
      </button> -->
    </form>

      <div class="form__action">
        <nuxt-link to="/checkout/shipping" class="sf-button color-secondary form__back-button">Go back</nuxt-link>
        <SfButton class="form__action-button" type="submit" :disabled="loading.billingAddress || submitDisabled">
          Review my order
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
  SfImage,
  SfCheckbox
} from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import { useCheckout } from '@vue-storefront/commercetools';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import { onSSR } from '@vue-storefront/core';
import { useCko } from '@vue-storefront/checkout-com';

const COUNTRIES = [
  { key: 'US',
    label: 'United States' },
  { key: 'UK',
    label: 'United Kingdom' },
  { key: 'IT',
    label: 'Italy' },
  { key: 'PL',
    label: 'Poland' }
];

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

export default {
  name: 'Payment',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfImage,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },
  setup(props, context) {
    const {
      billingDetails,
      shippingDetails,
      paymentMethods,
      chosenPaymentMethod,
      loadPaymentMethods,
      setBillingDetails,
      setPaymentMethod,
      loadDetails,
      loading
    } = useCheckout();
    const { submitForm, submitDisabled } = useCko();
    const sameAsShipping = ref(false);
    let oldBilling = null;

    onSSR(async () => {
      await loadDetails();
      await loadPaymentMethods();
    });

    const handleFormSubmit = async () => {
      await setBillingDetails(billingDetails.value, { save: true });
      await submitForm();
      context.root.$router.push('/checkout/order-review');
    };

    const handleCheckSameAddress = () => {
      sameAsShipping.value = !sameAsShipping.value;

      if (sameAsShipping.value) {
        oldBilling = billingDetails.value;
        setBillingDetails(shippingDetails.value);
        return;
      }

      setBillingDetails(oldBilling);
    };

    return {
      submitDisabled,
      loading,
      billingDetails,
      paymentMethods,
      chosenPaymentMethod,
      sameAsShipping,
      COUNTRIES,
      setBillingDetails,
      setPaymentMethod,
      handleFormSubmit,
      handleCheckSameAddress
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
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-lg) 0;
    border: 1px solid var(--c-light);
    border-width: 1px 0;
  }
}
.payment-method {
  --radio-container-align-items: center;
  --ratio-content-margin: 0 0 0 var(--spacer-base);
  --radio-label-font-size: var(--font-base);
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  @include for-mobile {
    --radio-background: transparent;
  }
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}
.credit-card-form {
  margin: 0 0 var(--spacer-xl) 0;
  @include for-desktop {
    flex: 0 0 66.666%;
    padding: 0 calc((100% - 66.666%) / 2);
  }
  &__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 var(--spacer-xl) 0;
  }
  &__label {
    flex: unset;
    font: 300 var(--font-base) / 1.6 var(--font-family-secondary);
  }
  &__element {
    display: flex;
    flex: 0 0 66.66%;
  }
  &__input {
    flex: 1;
    &--small {
      flex: 0 0 46.666%;
    }
    & + & {
      margin: 0 0 0 var(--spacer-xl);
    }
  }
}
</style>
