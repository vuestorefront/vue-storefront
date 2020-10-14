<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(addressIsModified ? handleBillingAddressSubmit : handleFormSubmit)">
    <SfHeading
      :level="3"
      title="Billing address"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <UserBillingAddresses
      v-if="isAuthenticated && billingAddresses && billingAddresses.length"
      :setAsDefault="setAsDefault"
      :billingAddresses="billingAddresses"
      :currentAddressId="currentAddressId"
      @setCurrentAddress="setCurrentAddress($event)"
      @changeSetAsDefault="setAsDefault = $event"
    />
    <SfCheckbox
      :selected="sameAsShipping"
      @change="handleCheckSameAddress"
      label="Copy address data from shipping"
      name="copyShippingAddress"
      class="form__element"
    />
      <div class="form" v-if="canAddNewAddress">
        <ValidationProvider name="firstName" rules="required|min:2" v-slot="{ errors }" slim>
          <SfInput
            :value="billingDetails.firstName"
            @input="firstName => setBillingDetailsAndUnpickAddress({ firstName })"
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
            @input="lastName => setBillingDetailsAndUnpickAddress({ lastName })"
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
            @input="streetName => setBillingDetailsAndUnpickAddress({ streetName })"
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
            @input="streetNumber => setBillingDetailsAndUnpickAddress({ streetNumber })"
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
            @input="city => setBillingDetailsAndUnpickAddress({ city })"
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
            @input="postalCode => setBillingDetailsAndUnpickAddress({ postalCode })"
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
            @change="country => setBillingDetailsAndUnpickAddress({ country })"
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
            @input="phone => setBillingDetailsAndUnpickAddress({ contactInfo: { phone } })"
            label="Phone number"
            name="phone"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-if="!canAddNewAddress"
        class="form__action-button form__action-button--margin-bottom"
        type="submit"
        @click.native="canAddNewAddress = true"
      >
        Add new address
      </SfButton>
    <SfHeading
      v-if="canContinueToReview"
      :level="3"
      title="Payment methods"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__element payment-methods" v-if="canContinueToReview">
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
      <div class="form__action">
        <nuxt-link to="/checkout/shipping" class="sf-button color-secondary form__back-button">Go back</nuxt-link>
        <SfButton class="form__action-button" type="submit" :disabled="loading.billingAddress" v-if="canContinueToReview">
          Review my order
        </SfButton>
        <SfButton class="form__action-button" type="submit" :disabled="loading.billingAddress" v-else>
          Select payment method
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
import { ref, computed, onMounted } from '@vue/composition-api';
import { useCheckout, useUser, userBillingGetters, useUserBilling } from '@vue-storefront/commercetools';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import { onSSR } from '@vue-storefront/core';

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
    UserBillingAddresses: () => import('~/components/Checkout/UserBillingAddresses'),
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
      isBillingAddressCompleted,
      setBillingDetails,
      setPaymentMethod,
      loadDetails,
      loading
    } = useCheckout();
    const { billing, load: loadBilling, setDefault } = useUserBilling();
    const { isAuthenticated } = useUser();

    const canAddNewAddress = ref(true);
    const addressIsModified = ref(false);
    const currentAddressId = ref(-1);
    const setAsDefault = ref(false);

    const sameAsShipping = ref(false);
    let oldBilling = null;

    const mapAbstractAddressToIntegrationAddress = address => ({
      ...billingDetails.value,
      contactInfo: {
        ...billingDetails.value.contactInfo,
        phone: address.phoneNumber
      },
      streetNumber: address.apartment,
      city: address.city,
      country: address.country,
      state: address.state,
      firstName: address.firstName,
      lastName: address.lastName,
      streetName: address.streetName,
      postalCode: address.zipCode
    });

    const setCurrentAddress = async (addressId) => {
      const chosenAddress = userBillingGetters.getAddresses(billing.value, { id: addressId });
      if (!chosenAddress || !chosenAddress.length) {
        return;
      }
      currentAddressId.value = addressId;
      setBillingDetails(mapAbstractAddressToIntegrationAddress(chosenAddress[0]));
      addressIsModified.value = true;
      sameAsShipping.value = false;
    };

    onSSR(async () => {
      await loadDetails();
      await loadPaymentMethods();
    });

    onMounted(async () => {
      if (isAuthenticated.value) {
        await loadBilling();
        const billingAddresses = userBillingGetters.getAddresses(billing.value);
        if (!billingAddresses || !billingAddresses.length) {
          return;
        }
        canAddNewAddress.value = false;
        if (billingAddresses[0].isDefault) {
          setCurrentAddress(billingAddresses[0].id);
        }
      }
    });

    const handleFormSubmit = async () => {
      await setBillingDetails(billingDetails.value, { save: true });
      context.root.$router.push('/checkout/order-review');
    };

    const handleBillingAddressSubmit = async () => {
      await setBillingDetails(billingDetails.value, { save: true });
      // here we should have something like loadPaymentMethods which depends on billing address imo
      if (currentAddressId.value > -1 && setAsDefault.value) {
        const chosenAddress = userBillingGetters.getAddresses(billing.value, { id: currentAddressId.value });
        if (!chosenAddress || !chosenAddress.length) {
          return;
        }
        await setDefault(chosenAddress[0]);
      }
      addressIsModified.value = false;
    };

    const handleCheckSameAddress = () => {
      sameAsShipping.value = !sameAsShipping.value;
      if (sameAsShipping.value) {
        oldBilling = billingDetails.value;
        setBillingDetails(shippingDetails.value);
        currentAddressId.value = -1;
        setAsDefault.value = false;
        addressIsModified.value = true;
        return;
      }
      setBillingDetails(oldBilling);
    };

    const setBillingDetailsAndUnpickAddress = value => {
      setBillingDetails(value);
      currentAddressId.value = -1;
      addressIsModified.value = true;
      sameAsShipping.value = false;
    };

    return {
      loading,
      billingDetails,
      paymentMethods,
      chosenPaymentMethod,
      sameAsShipping,
      COUNTRIES,
      setPaymentMethod,
      handleFormSubmit,
      handleBillingAddressSubmit,
      handleCheckSameAddress,

      isAuthenticated,
      billingAddresses: computed(() => userBillingGetters.getAddresses(billing.value)),
      setAsDefault,
      canContinueToReview: computed(() => isBillingAddressCompleted.value && !addressIsModified.value),
      currentAddressId: computed(() => currentAddressId.value),
      setCurrentAddress,
      addressIsModified,
      setBillingDetailsAndUnpickAddress,
      canAddNewAddress
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
  &__action-button, &__back-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
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
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  white;
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__back-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
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
  --radio-background: transparent;
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  --radio-background: transparent;
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}
</style>
