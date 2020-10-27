<template>
  <div>
    <SfHeading
      :level="3"
      title="Billing address"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <UserBillingAddresses
        v-if="isAuthenticated && billingAddresses && billingAddresses.length"
        :setAsDefault="setAsDefault"
        :billingAddresses="billingAddresses"
        :currentAddressId="currentAddressId"
        @setCurrentAddress="setCurrentAddress($event)"
        @changeSetAsDefault="setAsDefault = $event"
      />
      <SfCheckbox
        v-model="sameAsShipping"
        label="Copy address data from shipping"
        name="copyShippingAddress"
        class="form__element"
        @input="afterModifiedAddress"
      />
      <template v-if="canAddNewAddress">
      <SfInput
        data-cy="payment-input_firstName"
        v-model="billingDetails.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        @input="afterModifiedAddress"
        required
      />
      <SfInput
        data-cy="payment-input_lastName"
        v-model="billingDetails.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        @input="afterModifiedAddress"
        required
      />
      <SfInput
        data-cy="payment-input_streetName"
        v-model="billingDetails.streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        @input="afterModifiedAddress"
        required
      />
      <SfInput
        data-cy="payment-input_apartment"
        v-model="billingDetails.apartment"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        @input="afterModifiedAddress"
        required
      />
      <SfInput
        data-cy="payment-input_"
        v-model="billingDetails.city"
        label="City"
        name="city"
        class="form__element form__element--half"
        @input="afterModifiedAddress"
        required
      />
      <SfInput
        data-cy="payment-input_state"
        v-model="billingDetails.state"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        @input="afterModifiedAddress"
        required
      />
      <SfInput
        data-cy="payment-input_postalCode"
        v-model="billingDetails.postalCode"
        label="Zip-code"
        name="zipCode"
        class="form__element form__element--half"
        @input="afterModifiedAddress"
        required
      />
      <SfSelect
        data-cy="payment-select_billingDetails"
        v-model="billingDetails.country"
        label="Country"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        @input="afterModifiedAddress"
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
        @input="afterModifiedAddress"
        required
      />
      </template>
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
        <SfButton class="form__action-button" @click="$emit('nextStep')" v-if="canContinueToReview">
          Review my order
        </SfButton>
        <SfButton class="form__action-button" @click="saveBillingDetails" v-else>
          Select payment method
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
import { ref, watch, onMounted, computed } from '@vue/composition-api';
import { useCheckout, useUser, useUserBilling, userBillingGetters } from '@vue-storefront/boilerplate';

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
    SfCheckbox,
    UserBillingAddresses: () => import('~/components/Checkout/UserBillingAddresses')
  },
  setup(props, context) {
    context.emit('changeStep', 2);
    const { billingDetails, shippingDetails, paymentMethods, chosenPaymentMethod } = useCheckout();
    const sameAsShipping = ref(false);

    const { billing, load: loadBilling, setDefault } = useUserBilling();
    const { isAuthenticated } = useUser();

    const canAddNewAddress = ref(true);
    const addressIsModified = ref(false);
    const currentAddressId = ref(-1);
    const setAsDefault = ref(false);
    const isBillingAddressCompleted = ref(false);

    const setBillingDetails = address => {
      billingDetails.value = {
        ...billingDetails.value,
        ...address
      };
    };

    const mapAbstractAddressToIntegrationAddress = address => ({
      ...billingDetails.value,
      city: userBillingGetters.getCity(address),
      country: userBillingGetters.getCountry(address),
      firstName: userBillingGetters.getFirstName(address),
      lastName: userBillingGetters.getLastName(address),
      streetName: userBillingGetters.getStreetName(address),
      postalCode: userBillingGetters.getPostCode(address),
      state: userBillingGetters.getProvince(address),
      phone: userBillingGetters.getPhone(address),
      apartment: userBillingGetters.getApartmentNumber(address)
    });

    const setCurrentAddress = async (addressId) => {
      const chosenAddress = userBillingGetters.getAddresses(billing.value, { id: addressId });
      if (!chosenAddress || !chosenAddress.length) {
        return;
      }
      currentAddressId.value = addressId;
      sameAsShipping.value = false;
      setBillingDetails(mapAbstractAddressToIntegrationAddress(chosenAddress[0]));
      addressIsModified.value = true;
    };

    onMounted(async () => {
      if (isAuthenticated.value) {
        await loadBilling();
        const billingAddresses = userBillingGetters.getAddresses(billing.value);
        if (!billingAddresses || !billingAddresses.length) {
          return;
        }
        canAddNewAddress.value = false;
        if (userBillingGetters.isDefault(billingAddresses[0])) {
          setCurrentAddress(userBillingGetters.getId(billingAddresses[0]));
        }
      }
    });

    const saveBillingDetails = async () => {
      if (currentAddressId.value > -1 && setAsDefault.value) {
        const chosenAddress = userBillingGetters.getAddresses(billing.value, { id: currentAddressId.value });
        if (!chosenAddress || !chosenAddress.length) {
          return;
        }
        await setDefault(chosenAddress[0]);
      }
      isBillingAddressCompleted.value = true;
      addressIsModified.value = false;
    };

    const afterModifiedAddress = () => {
      addressIsModified.value = true;
      currentAddressId.value = -1;
    };

    const canContinueToReview = computed(() => isBillingAddressCompleted.value && !addressIsModified.value);

    watch(sameAsShipping, () => {
      if (sameAsShipping.value) {
        billingDetails.value = { ...shippingDetails.value };
        currentAddressId.value = -1;
        setAsDefault.value = false;
        addressIsModified.value = true;
      }
    });

    return {
      billingDetails,
      paymentMethods,
      chosenPaymentMethod,
      sameAsShipping,
      COUNTRIES,
      isAuthenticated,
      billingAddresses: computed(() => userBillingGetters.getAddresses(billing.value)),
      setAsDefault,
      currentAddressId,
      setCurrentAddress,
      canAddNewAddress,
      canContinueToReview,
      isBillingAddressCompleted,
      addressIsModified,
      saveBillingDetails,
      afterModifiedAddress
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
