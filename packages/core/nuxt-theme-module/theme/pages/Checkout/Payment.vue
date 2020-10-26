<template>
  <div>
    <SfHeading
      :level="3"
      title="Billing address"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfCheckbox
        v-model="sameAsShipping"
        label="Copy address data from shipping"
        name="copyShippingAddress"
        class="form__element"
      />
      <SfInput
        data-cy="payment-input_firstName"
        v-model="billingDetails.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        data-cy="payment-input_lastName"
        v-model="billingDetails.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        data-cy="payment-input_streetName"
        v-model="billingDetails.streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        required
      />
      <SfInput
        data-cy="payment-input_apartment"
        v-model="billingDetails.apartment"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        required
      />
      <SfInput
        data-cy="payment-input_"
        v-model="billingDetails.city"
        label="City"
        name="city"
        class="form__element form__element--half"
        required
      />
      <SfInput
        data-cy="payment-input_state"
        v-model="billingDetails.state"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        data-cy="payment-input_postalCode"
        v-model="billingDetails.postalCode"
        label="Zip-code"
        name="zipCode"
        class="form__element form__element--half"
        required
      />
      <SfSelect
        data-cy="payment-select_billingDetails"
        v-model="billingDetails.country"
        label="Country"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        required
      >
        <SfSelectOption
          v-for="countryOption in COUNTRIES"
          :key="countryOption.key"
          :value="countryOption.key"
        >
          {{ countryOption.label }}
        </SfSelectOption>
      </SfSelect>
      <SfInput
        data-cy="payment-input_phone"
        v-model="billingDetails.phone"
        label="Phone number"
        name="phone"
        class="form__element"
        required
      />
    </div>
    <SfHeading
      :level="3"
      title="Payment methods"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__element payment-methods">
        <SfRadio
          data-cy="payment-radio_paymentMethod"
          v-for="item in paymentMethods"
          :key="item.value"
          v-model="chosenPaymentMethod"
          :label="item.label"
          :value="item.value"
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
      <div class="form__action">
        <!-- TODO: add nuxt link for returning to personal details -->
        <SfButton data-cy="payment-btn_go-back" class="color-secondary form__back-button">
          Go back
        </SfButton>
        <SfButton data-cy="payment-btn_review" class="form__action-button" @click="$emit('nextStep')">
          Pay for order
        </SfButton>
      </div>
    </div>
  </div>
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
import { ref, watch } from '@vue/composition-api';
import { useCheckout } from '<%= options.generate.replace.composables %>';

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

export default {
  name: 'Payment',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfImage,
    SfCheckbox
  },
  setup(props, context) {
    context.emit('changeStep', 2);
    const { billingDetails, shippingDetails, paymentMethods, chosenPaymentMethod } = useCheckout();
    const sameAsShipping = ref(false);

    watch(sameAsShipping, () => {
      if (sameAsShipping.value) {
        billingDetails.value = { ...shippingDetails.value };
      } else {
        billingDetails.value = Object.keys(billingDetails.value).reduce((prev, curr) => ({
          ...prev,
          [curr]: ''
        }), {});
      }
    });

    return {
      billingDetails,
      paymentMethods,
      chosenPaymentMethod,
      sameAsShipping,
      COUNTRIES
    };
  }
};

</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.form {
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
  }
  &__element {
    margin: 0 0 var(--spacer-base) 0;
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
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
   &__action-button, &__back-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__action-button {
    margin: 0 var(--spacer-xl) 0 0;
  }
  &__back-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
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
  --radio-label-font-size: var(--font-size--base);
  --radio-background: transparent;
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}

</style>
