<template>
  <ValidationObserver v-slot="{ handleSubmit, dirty, reset }">
    <form
      @submit.prevent="
        handleSubmit(
          isBillingDetailsCompleted && isBillingMethodCompleted && !dirty
            ? handleStepSubmit
            : handleAddressSubmit(reset)
        )
      "
    >
      <UserBillingAddresses
        v-if="isAuthenticated && hasSavedBillingAddress"
        :setAsDefault.sync="setAsDefault"
        :currentAddressId="currentAddressId || NOT_SELECTED_ADDRESS"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <SfCheckbox
        :selected="sameAsShipping"
        @change="handleCheckSameAddress"
        label="Copy address data from shipping"
        name="copyShippingAddress"
        class="form__element"
      />
      <div class="form" v-if="canAddNewAddress">
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="billingDetails.firstName"
            @input="firstName => changeDetails('firstName', firstName)"
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
            :value="billingDetails.lastName"
            @input="lastName => changeDetails('lastName', lastName)"
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
            :value="billingDetails.streetName"
            @input="streetName => changeDetails('streetName', streetName)"
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
            :value="billingDetails.apartment"
            @input="apartment => changeDetails('apartment', apartment)"
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
            :value="billingDetails.city"
            @input="city => changeDetails('city', city)"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="state"
          slim
        >
          <SfInput
            :value="billingDetails.state"
            @input="state => changeDetails('state', state)"
            label="State/Province"
            name="state"
            class="form__element form__element--half form__element--half-even"
          />
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            :value="billingDetails.country"
            @input="country => changeDetails('country', country)"
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
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="billingDetails.postalCode"
            @input="postalCode => changeDetails('postalCode', postalCode)"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="phone"
          rules="required|digits:9"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="billingDetails.phone"
            @input="phone => changeDetails('phone', phone)"
            label="Phone number"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-if="!canAddNewAddress"
        class="color-light form__action-button form__action-button--add-address"
        type="submit"
        @click.native="handleAddNewAddressBtnClick"
      >
        {{ $t('Add new address') }}
      </SfButton>
      <SfHeading
        v-if="isBillingDetailsCompleted && !dirty"
        :level="3"
        title="Payment methods"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <div class="form">
        <div class="form__action">
          <nuxt-link
            to="/checkout/personal-details"
            class="sf-button color-secondary form__back-button"
            >Go back</nuxt-link>
          <SfButton
            class="form__action-button"
            type="submit"
            v-if="isBillingDetailsCompleted && !dirty"
            :disabled="!isBillingMethodCompleted"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
          <SfButton
            class="form__action-button"
            type="submit"
            :disabled="loading"
            v-else
          >
            {{ $t('Select payment method') }}
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
import { useUserBilling, userBillingGetters, useUser, useBilling, useShipping } from '@vue-storefront/commercetools';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, digits } from 'vee-validate/dist/rules';
import { useVSFContext } from '@vue-storefront/core';
import { ref, watch, computed, onMounted } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';

const NOT_SELECTED_ADDRESS = '';

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
  name: 'BillingForm',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    UserBillingAddresses: () => import('~/components/Checkout/UserBillingAddresses'),
    ValidationProvider,
    ValidationObserver
  },
  props: {
    handleBillingAddressSubmit: Function
  },
  setup(props, context) {
    const { $ct: { config } } = useVSFContext();
    const { shipping: shippingDetails, load: loadShipping } = useShipping();
    const { billing: address, loading } = useBilling();
    const { isAuthenticated } = useUser();
    const { billing: userBilling, load: loadUserBilling, setDefaultAddress } = useUserBilling();
    const billingDetails = ref(address.value || {});

    const isBillingMethodCompleted = ref(false);
    const isBillingDetailsCompleted = ref(false);
    const currentAddressId = ref(NOT_SELECTED_ADDRESS);
    const setAsDefault = ref(false);
    const canAddNewAddress = ref(true);
    const sameAsShipping = ref(false);
    let oldBilling = null;

    const hasSavedBillingAddress = computed(() => {
      if (!isAuthenticated.value || !userBilling.value) {
        return false;
      }
      const addresses = userBillingGetters.getAddresses(userBilling.value);
      return Boolean(addresses?.length);
    });

    const handleCheckSameAddress = async () => {
      sameAsShipping.value = !sameAsShipping.value;
      if (sameAsShipping.value) {
        if (!shippingDetails.value) {
          await loadShipping();
        }
        oldBilling = {...billingDetails.value};
        billingDetails.value = {...shippingDetails.value};
        currentAddressId.value = NOT_SELECTED_ADDRESS;
        setAsDefault.value = false;
        isBillingDetailsCompleted.value = false;
        return;
      }
      isBillingDetailsCompleted.value = false;
      billingDetails.value = oldBilling;
    };

    const handleStepSubmit = () => context.emit('stepSubmit');

    const handleAddressSubmit = (reset) => async () => {
      const addressId = currentAddressId.value;
      await props.handleBillingAddressSubmit(billingDetails.value);
      if (addressId !== NOT_SELECTED_ADDRESS && setAsDefault.value) {
        const chosenAddress = userBillingGetters.getAddresses(userBilling.value, { id: addressId });
        if (chosenAddress && chosenAddress.length) {
          await setDefaultAddress({ address: chosenAddress[0] });
        }
      }
      reset();
      isBillingDetailsCompleted.value = true;
    };

    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = NOT_SELECTED_ADDRESS;
      canAddNewAddress.value = true;
    };

    const handleSetCurrentAddress = address => {
      billingDetails.value = {...address};
      currentAddressId.value = address.id;
      canAddNewAddress.value = false;
      isBillingDetailsCompleted.value = false;
      isBillingMethodCompleted.value = false;
      sameAsShipping.value = false;
    };

    const changeDetails = (field, value) => {
      billingDetails.value[field] = value;
      isBillingMethodCompleted.value = false;
      currentAddressId.value = NOT_SELECTED_ADDRESS;
    };

    const selectDefaultAddress = () => {
      const defaultAddress = userBillingGetters.getAddresses(userBilling.value, { isDefault: true });
      if (defaultAddress && defaultAddress.length) {
        handleSetCurrentAddress(defaultAddress[0]);
      }
    };

    // Update local state if we have new address' response from the backend
    watch(address, (addr) => {
      billingDetails.value = addr;
    });

    onSSR(async () => {
      if (isAuthenticated.value) {
        await loadUserBilling();
      }
    });

    onMounted(async () => {
      if (!userBilling.value?.addresses && isAuthenticated.value) {
        await loadUserBilling();
      }
      const billingAddresses = userBillingGetters.getAddresses(userBilling.value);
      if (!billingAddresses || !billingAddresses.length) {
        return;
      }
      const hasEmptyBillingDetails = !billingDetails.value || Object.keys(billingDetails.value).length === 0;
      if (hasEmptyBillingDetails) {
        selectDefaultAddress();
        return;
      }
      canAddNewAddress.value = false;
    });

    return {
      NOT_SELECTED_ADDRESS,
      isAuthenticated,
      billingDetails,
      countries: config.countries,
      setAsDefault,
      canAddNewAddress,
      currentAddressId,
      hasSavedBillingAddress,
      isBillingMethodCompleted,
      isBillingDetailsCompleted,
      handleAddressSubmit,
      handleStepSubmit,
      handleAddNewAddressBtnClick,
      handleSetCurrentAddress,
      handleCheckSameAddress,
      changeDetails,
      sameAsShipping,
      shippingDetails,
      loading
    };
  }
};
</script>
<style lang="scss" scoped>
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
