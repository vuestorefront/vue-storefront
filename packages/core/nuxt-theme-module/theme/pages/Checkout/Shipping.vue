<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        data-cy="shipping-details-input_firstName"
        v-model="shippingDetails.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        data-cy="shipping-details-input_lastName"
        v-model="shippingDetails.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        data-cy="shipping-details-input_streetName"
        v-model="shippingDetails.streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        required
      />
      <SfInput
        data-cy="shipping-details-input_apartmanet"
        v-model="shippingDetails.apartment"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        required
      />
      <SfInput
        data-cy="shipping-details-input_city"
        v-model="shippingDetails.city"
        label="City"
        name="city"
        class="form__element form__element--half"
        required
      />
      <SfInput
        data-cy="shipping-details-input_state"
        v-model="shippingDetails.state"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        data-cy="shipping-details-input_postalCode"
        v-model="shippingDetails.postalCode"
        label="Zip-code"
        name="zipCode"
        class="form__element form__element--half"
        required
      />
      <SfSelect
        data-cy="shipping-details-select_country"
        v-model="shippingDetails.country"
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
        data-cy="shipping-details-input_phone"
        v-model="shippingDetails.phone"
        label="Phone number"
        name="phone"
        class="form__element"
        required
      />
    </div>
    <SfHeading
      :level="3"
      title="Shipping method"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__radio-group">
        <SfRadio
          data-cy="shipping-details-radio_shippingMethod"
          v-for="item in shippingMethods"
          :key="checkoutGetters.getShippingMethodName(item)"
          :label="checkoutGetters.getShippingMethodName(item)"
          :value="checkoutGetters.getShippingMethodId(item)"
          :selected="checkoutGetters.getShippingMethodId(chosenShippingMethod)"
          @input="() => chosenShippingMethod = item"
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
        <!-- TODO: add nuxt link for returning to personal details -->
        <SfButton data-cy="shipping-btn_go-back" class="color-secondary form__back-button">
          Go back
        </SfButton>
        <SfButton data-cy="shipping-btn_continue" class="form__action-button" @click="$emit('nextStep')">
          Continue to payment
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
  SfRadio
} from '@storefront-ui/vue';
import { useCheckout, checkoutGetters } from '<%= options.generate.replace.composables %>';

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
  name: 'PersonalDetails',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio
  },
  setup(props, context) {
    context.emit('changeStep', 1);
    const {
      shippingDetails,
      chosenShippingMethod,
      shippingMethods
    } = useCheckout();

    return {
      shippingDetails,
      chosenShippingMethod,
      shippingMethods,
      checkoutGetters,
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
    margin: 0 0 var(--spacer-2xl) var(--spacer-base);
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
    --radio-description-font-size: var(--font-size--xs);
  }
}

</style>
