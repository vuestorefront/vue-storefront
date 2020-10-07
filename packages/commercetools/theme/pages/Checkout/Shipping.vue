<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ValidationObserver v-slot="{ handleSubmit, dirty, reset }">
      <form @submit.prevent="handleSubmit(dirty || addressIsModified ? handleShippingAddressSubmit(reset) : handleShippingMethodSubmit(reset))">
        <div v-if="isAuthenticated && shippingAddresses.length">
          <SfAddressPicker
            :value="currentAddressId"
            @input="setCurrentAddress($event)"
            class="shipping__addresses"
          >
            <SfAddress
              v-for="shippingAddress in shippingAddresses"
              :key="shippingAddress.id"
              :name="String(shippingAddress.id)"
            >
              <span>{{ shippingAddress.firstName }} {{ shippingAddress.lastName }}</span>
              <span>{{ shippingAddress.streetName }} {{ shippingAddress.apartment }}</span>
              <span>{{ shippingAddress.zipCode }}</span>
              <span>{{ shippingAddress.city }}{{ shippingAddress.state ? `, ${shippingAddress.city}` : ''}}</span>
              <span>{{ shippingAddress.country }}</span>
              <span>{{ shippingAddress.phoneNumber }}</span>
            </SfAddress>
          </SfAddressPicker>
          <SfCheckbox
            data-cy="shipping-details-checkbox_isDefault"
            v-model="setAsDefault"
            name="setAsDefault"
            label="Use this address as my default one."
            class="shipping-address-setAsDefault"
          />
        </div>
        <div class="form" v-if="canAddNewAddress">
          <ValidationProvider name="firstName" rules="required|min:2" v-slot="{ errors }" slim>
            <SfInput
              :value="shippingDetails.firstName"
              @input="firstName => setShippingDetailsAndUnpickAddress({ firstName })"
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
              @input="lastName => setShippingDetailsAndUnpickAddress({ lastName })"
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
              @input="streetName => setShippingDetailsAndUnpickAddress({ streetName })"
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
              @input="streetNumber => setShippingDetailsAndUnpickAddress({ streetNumber })"
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
              @input="city => setShippingDetailsAndUnpickAddress({ city })"
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
              @input="postalCode => setShippingDetailsAndUnpickAddress({ postalCode })"
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
            @change="country => setShippingDetailsAndUnpickAddress({ country })"
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
            @input="phone => setShippingDetailsAndUnpickAddress({ contactInfo: { phone } })"
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
          v-if="canContinueToPayment(dirty)"
          :level="3"
          title="Shipping method"
          class="sf-heading--left sf-heading--no-underline title"
        />
        <div class="form">
          <div class="form__radio-group" v-if="canContinueToPayment(dirty)">
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
            <SfButton class="form__action-button" type="submit" v-if="canContinueToPayment(dirty)" :disabled="!isShippingMethodCompleted || loading.shippingAddress">
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
  SfRadio,
  SfCheckbox
} from '@storefront-ui/vue';
import { getSettings } from '@vue-storefront/commercetools-api';
import { useCheckout, useUserShipping, useUser, checkoutGetters, userShippingGetters } from '@vue-storefront/commercetools';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, digits } from 'vee-validate/dist/rules';
import { onSSR } from '@vue-storefront/core';
import { ref, onMounted, computed } from '@vue/composition-api';

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
    SfRadio,
    SfCheckbox,
    SfAddressPicker: () => import('~/components/temp/SfAddressPicker'),
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
    const { addresses: shippingAddresses, load: loadShippingAddresses, setDefault } = useUserShipping();
    const { isAuthenticated } = useUser();

    const canAddNewAddress = ref(true);
    const addressIsModified = ref(false);
    const currentAddressId = ref(-1);
    const setAsDefault = ref(false);

    const setCurrentAddress = async (addressId) => {
      const chosenAddress = userShippingGetters.getFiltered(shippingAddresses.value, { id: addressId });
      if (!chosenAddress) {
        return;
      }
      currentAddressId.value = addressId;
      setShippingDetails(chosenAddress);
      addressIsModified.value = true;
    };

    onSSR(async () => {
      await loadDetails();
      await loadShippingMethods();
    });

    onMounted(async () => {
      if (isAuthenticated.value) {
        await loadShippingAddresses();
        if (!shippingAddresses.value.length) {
          return;
        }
        canAddNewAddress.value = false;
        if (shippingAddresses.value[0].isDefault) {
          setCurrentAddress(shippingAddresses.value[0].id);
        }
      }
    });

    const handleShippingAddressSubmit = (reset) => async () => {
      await setShippingDetails(shippingDetails.value, { save: true });
      await loadShippingMethods();
      reset();
      if (currentAddressId.value > -1 && setAsDefault.value) {
        const chosenAddress = userShippingGetters.getFiltered(shippingAddresses.value, { id: currentAddressId.value });
        if (!chosenAddress) {
          return;
        }
        await setDefault(chosenAddress);
      }
      addressIsModified.value = false;
    };
    const handleShippingMethodSubmit = (reset) => async () => {
      reset();
      context.root.$router.push('/checkout/payment');
    };

    const setShippingDetailsAndUnpickAddress = value => {
      setShippingDetails(value);
      currentAddressId.value = -1;
      addressIsModified.value = false;
    };

    const canContinueToPayment = dirty => isShippingAddressCompleted.value && !dirty && !addressIsModified.value;

    return {
      loading,
      handleShippingAddressSubmit,
      handleShippingMethodSubmit,
      isShippingAddressCompleted,
      isShippingMethodCompleted,
      setShippingDetailsAndUnpickAddress,
      setShippingMethod,
      shippingDetails,
      chosenShippingMethod,
      shippingMethods,
      checkoutGetters,
      countries: getSettings().countries,
      shippingAddresses,
      canAddNewAddress,
      addressIsModified,
      isAuthenticated,
      currentAddressId: computed(() => currentAddressId.value),
      setAsDefault,
      setCurrentAddress,
      canContinueToPayment
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.shipping__addresses {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: var(--spacer-xl);
}

.shipping-address-setAsDefault, .form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}

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
