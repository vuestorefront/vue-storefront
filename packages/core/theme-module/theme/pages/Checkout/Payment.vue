<template>
  <div>
    <SfHeading
      title="3. Payment"
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
        v-model="billingDetails.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="billingDetails.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="billingDetails.streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        required
      />
      <SfInput
        v-model="billingDetails.apartment"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        required
      />
      <SfInput
        v-model="billingDetails.city"
        label="City"
        name="city"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="billingDetails.state"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="billingDetails.postalCode"
        label="Zip-code"
        name="zipCode"
        class="form__element form__element--half"
        required
      />
      <SfSelect
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
        v-model="billingDetails.phone"
        label="Phone number"
        name="phone"
        class="form__element"
        required
      />
    </div>
    <SfHeading
      title="Payment methods"
      subtitle="Choose your payment method"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__element payment-methods">
        <SfRadio
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
        <SfButton class="sf-button--full-width form__action-button" @click="$emit('nextStep')">
          Review order
        </SfButton>
        <SfButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary"
          @click="$emit('click:back')"
        >
          Go back to Personal details
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
import { useCheckout } from '@vue-storefront/commercetools-composables';

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
@import "~@storefront-ui/shared/styles/variables";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
.title {
  margin-bottom: var(--spacer-extra-big);
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__element {
    margin-bottom: var(--spacer-extra-big);
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: var(--spacer-extra-big);
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
  &__action-button {
    flex: 1;
    &--secondary {
      margin: var(--spacer-big) 0;
      @include for-desktop {
        order: -1;
        margin: 0;
        text-align: left;
      }
    }
  }
  &__select {
    ::v-deep .sf-select__selected {
      padding: 5px 0;
    }
  }
  &__radio {
    white-space: nowrap;
  }
}
.payment-image {
  display: flex;
  align-items: center;
  height: 2.125rem;
  width: auto;
  ::v-deep > * {
    width: auto;
    max-width: unset;
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-big) 0;
    border-top: 1px solid var(--c-light);
    border-bottom: 1px solid var(--c-light);
  }
}
.payment-method {
  border-top: 1px solid var(--c-light);
  @include for-mobile {
    background-color: transparent;
  }
  @include for-desktop {
    border: 0;
    border-radius: 4px;
  }
  &:last-child {
    border-bottom: 1px solid var(--c-light);
    @include for-desktop {
      border-bottom: 0;
    }
  }
  ::v-deep {
    .sf-radio {
      &__container {
        align-items: center;
      }
      &__content {
        margin: 0 0 0 var(--spacer);
      }
    }
  }
}
.credit-card-form {
  margin-bottom: var(--spacer-big);
  @include for-desktop {
    flex: 0 0 66.666%;
    padding: 0 calc((100% - 66.666%) / 2);
  }
  &__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 var(--spacer-big) 0;
  }
  &__label {
    flex: unset;
  }
  &__element {
    display: flex;
    flex: 0 0 66.666%;
  }
  &__input {
    flex: 1;
    &--small {
      flex: 0 0 46.666%;
    }
    & + & {
      margin-left: var(--spacer-big);
    }
  }
}
</style>
