<template>
  <ValidationObserver v-slot="{ handleSubmit, dirty, reset }">
    <SfHeading
      :level="3"
      :title="$t('Shipping details')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form
      @submit.prevent="
        handleSubmit(handleAddressSubmit(reset))
      "
    >
      <UserShippingAddresses
        v-if="isAuthenticated && hasSavedShippingAddress"
        v-model="setAsDefault"
        :currentAddressId="currentAddressId || NOT_SELECTED_ADDRESS"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <div class="form" v-if="canAddNewAddress">
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            :value="shippingDetails.firstName"
            @input="firstName => changeShippingDetails('firstName', firstName)"
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
            @input="lastName => changeShippingDetails('lastName', lastName)"
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
            @input="streetName => changeShippingDetails('streetName', streetName)"
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
            :value="shippingDetails.apartment"
            @input="apartment => changeShippingDetails('apartment', apartment)"
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
            @input="city => changeShippingDetails('city', city)"
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
          :rules="!statesInSelectedCountry ? null : 'required|min:2'"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            :value="shippingDetails.state"
            @input="state => changeShippingDetails('state', state)"
            label="State/Province"
            name="state"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            :disabled="!statesInSelectedCountry"
          >
            <SfSelectOption
              v-for="state in statesInSelectedCountry"
              :key="state"
              :value="state"
            >
              {{ state }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            :value="shippingDetails.country"
            @input="country => changeShippingDetails('country', country)"
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
            :value="shippingDetails.postalCode"
            @input="postalCode => changeShippingDetails('postalCode', postalCode)"
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
            :value="shippingDetails.phone"
            @input="phone => changeShippingDetails('phone', phone)"
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
      <div class="form">
        <div class="form__action">
          <SfButton
            class="form__action-button"
            type="submit"
            :disabled="!canMoveForward"
            v-if="!(isShippingDetailsStepCompleted && !dirty)"
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isShippingDetailsStepCompleted && !dirty"
        @submit="$router.push('/checkout/billing')"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect
} from '@storefront-ui/vue';
import { useUserShipping, userShippingGetters, useUser, useShipping } from '@vue-storefront/commercetools';
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
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    UserShippingAddresses: () => import('@/components/Checkout/UserShippingAddresses'),
    VsfShippingProvider: () => import('@/components/Checkout/VsfShippingProvider')
  },
  setup () {
    const { $ct: { config } } = useVSFContext();
    const { shipping: address, loading, load, save } = useShipping();
    const { isAuthenticated } = useUser();
    const { shipping: userShipping, load: loadUserShipping, setDefaultAddress } = useUserShipping();

    const shippingDetails = ref(address.value || {});
    const currentAddressId = ref(NOT_SELECTED_ADDRESS);

    const setAsDefault = ref(false);
    const canAddNewAddress = ref(true);

    const isShippingDetailsStepCompleted = ref(false);

    const canMoveForward = computed(() => !loading.value && shippingDetails.value && Object.keys(shippingDetails.value).length);

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !userShipping.value) {
        return false;
      }
      const addresses = userShippingGetters.getAddresses(userShipping.value);
      return Boolean(addresses?.length);
    });

    const statesInSelectedCountry = computed(() => {
      if (!shippingDetails.value.country) {
        return null;
      }
      const selectedCountry = config.countries.find(country => country.name === shippingDetails.value.country);
      return selectedCountry && selectedCountry.states;
    });

    const handleAddressSubmit = (reset) => async () => {
      const addressId = currentAddressId.value;
      await save({ shippingDetails: shippingDetails.value });
      if (addressId !== NOT_SELECTED_ADDRESS && setAsDefault.value) {
        const chosenAddress = userShippingGetters.getAddresses(userShipping.value, { id: addressId });
        if (chosenAddress && chosenAddress.length) {
          await setDefaultAddress({ address: chosenAddress[0] });
        }
      }
      reset();
      isShippingDetailsStepCompleted.value = true;
    };

    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = NOT_SELECTED_ADDRESS;
      canAddNewAddress.value = true;
    };

    const handleSetCurrentAddress = address => {
      shippingDetails.value = {...address};
      currentAddressId.value = address.id;
      canAddNewAddress.value = false;
      isShippingDetailsStepCompleted.value = false;
    };

    const changeShippingDetails = (field, value) => {
      shippingDetails.value = {
        ...shippingDetails.value,
        [field]: value
      };
      isShippingDetailsStepCompleted.value = false;
      currentAddressId.value = NOT_SELECTED_ADDRESS;
    };

    const selectDefaultAddress = () => {
      const defaultAddress = userShippingGetters.getAddresses(userShipping.value, { isDefault: true });
      if (defaultAddress && defaultAddress.length) {
        handleSetCurrentAddress(defaultAddress[0]);
      }
    };

    // Update local state if we have new address' response from the backend
    watch(address, addr => {
      shippingDetails.value = addr || {};
    });

    watch(statesInSelectedCountry, statesInSelectedCountry => {
      const countryHasStates = statesInSelectedCountry && statesInSelectedCountry.length;
      if (!countryHasStates && shippingDetails.value.state) {
        shippingDetails.value.state = null;
      }
    });

    onSSR(async () => {
      await load();
      if (isAuthenticated.value) {
        await loadUserShipping();
      }
    });

    onMounted(async () => {
      if (!userShipping.value?.addresses && isAuthenticated.value) {
        await loadUserShipping();
      }
      const shippingAddresses = userShippingGetters.getAddresses(userShipping.value);
      if (!shippingAddresses || !shippingAddresses.length) {
        return;
      }
      const hasEmptyShippingDetails = !shippingDetails.value || Object.keys(shippingDetails.value).length === 0;
      if (hasEmptyShippingDetails) {
        selectDefaultAddress();
        return;
      }
      canAddNewAddress.value = false;
    });

    return {
      NOT_SELECTED_ADDRESS,

      isAuthenticated,
      shippingDetails,
      address,
      countries: config.countries,
      setAsDefault,
      canAddNewAddress,
      currentAddressId,
      statesInSelectedCountry,

      hasSavedShippingAddress,

      handleAddressSubmit,
      handleAddNewAddressBtnClick,
      handleSetCurrentAddress,

      changeShippingDetails,
      loading,

      isShippingDetailsStepCompleted,
      canMoveForward
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
    flex-wrap: wrap;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }

    ::v-deep .sf-select__label {
      left: initial;
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
      margin: 0 0 var(--spacer-sm) 0;
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
  --heading-title-font-weight: var(--font-weight--bold);
}
</style>
