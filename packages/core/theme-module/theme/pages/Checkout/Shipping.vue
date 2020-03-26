<template>
  <div>
    <SfHeading
      title="2. Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        v-model="shippingDetails.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="shippingDetails.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="shippingDetails.streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        required
      />
      <SfInput
        v-model="shippingDetails.apartment"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        required
      />
      <SfInput
        v-model="shippingDetails.city"
        label="City"
        name="city"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="shippingDetails.state"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="shippingDetails.postalCode"
        label="Zip-code"
        name="zipCode"
        class="form__element form__element--half"
        required
      />
      <SfSelect
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
        v-model="shippingDetails.phone"
        label="Phone number"
        name="phone"
        class="form__element"
        required
      />
    </div>
    <SfHeading
      title="Shipping method"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__radio-group">
        <SfRadio
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
        <SfButton class="sf-button--full-width form__action-button" @click="$emit('nextStep')">
          Continue to payment
        </SfButton>
        <SfButton
          class="sf-button--full-width sf-button--text color-secondary form__action-button form__action-button--secondary"
          @click="$emit('click:back')">
            Go back to Personal details
        </SfButton
        >
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
import { useCheckout, checkoutGetters } from '<%= options.composables %>';

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
  margin: 0 0 var(--spacer-extra-big);
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-extra-big) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-extra-big);
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
      margin: var(--spacer-big) 0;
      @include for-desktop {
        order: -1;
        --button-margin: 0;
        text-align: left;
      }
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
    margin: 0 0 var(--spacer-extra-big) 0;
  }
}
.shipping {
  margin: 0 calc(var(--spacer-big) * -1);
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-size-extra-small);
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
