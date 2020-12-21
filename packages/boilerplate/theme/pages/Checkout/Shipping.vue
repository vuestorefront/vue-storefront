<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
        <UserShippingAddresses
          v-if="isAuthenticated && shippingAddresses && shippingAddresses.length"
          :setAsDefault="setAsDefault"
          :shippingAddresses="shippingAddresses"
          :currentAddressId="currentAddressId"
          @setCurrentAddress="setCurrentAddress($event); addressIsModified = true;"
          @changeSetAsDefault="setAsDefault = $event"
        />
        <SfButton
          v-if="!canAddNewAddress"
          class="form__action-button form__action-button--margin-bottom"
          type="submit"
          @click.native="canAddNewAddress = true"
        >
          Add new address
        </SfButton>

        <template v-if="canAddNewAddress">
          <SfInput
            data-cy="shipping-details-input_firstName"
            v-model="shippingDetails.firstName"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            @input="afterModifiedAddress"
            required
          />
          <SfInput
            data-cy="shipping-details-input_lastName"
            v-model="shippingDetails.lastName"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            @input="afterModifiedAddress"
            required
          />
          <SfInput
            data-cy="shipping-details-input_streetName"
            v-model="shippingDetails.streetName"
            label="Street name"
            name="streetName"
            class="form__element"
            @input="afterModifiedAddress"
            required
          />
          <SfInput
            data-cy="shipping-details-input_apartmanet"
            v-model="shippingDetails.apartment"
            label="House/Apartment number"
            name="apartment"
            class="form__element"
            @input="afterModifiedAddress"
            required
          />
          <SfInput
            data-cy="shipping-details-input_city"
            v-model="shippingDetails.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            @input="afterModifiedAddress"
            required
          />
          <SfInput
            data-cy="shipping-details-input_state"
            v-model="shippingDetails.state"
            label="State/Province"
            name="state"
            class="form__element form__element--half form__element--half-even"
            @input="afterModifiedAddress"
            required
          />
          <SfInput
            data-cy="shipping-details-input_postalCode"
            v-model="shippingDetails.postalCode"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half"
            @input="afterModifiedAddress"
            required
          />
          <SfSelect
            data-cy="shipping-details-select_country"
            v-model="shippingDetails.country"
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
            data-cy="shipping-details-input_phone"
            v-model="shippingDetails.phone"
            label="Phone number"
            name="phone"
            class="form__element"
            @input="afterModifiedAddress"
            required
          />
        </template>
    </div>
    <SfHeading
      :level="3"
      title="Shipping method"
      class="sf-heading--left sf-heading--no-underline title"
      v-if="canContinueToPayment"
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
        <SfButton data-cy="shipping-btn_continue" class="form__action-button" @click="$emit('nextStep')" v-if="canContinueToPayment">
          Continue to payment
        </SfButton>
        <SfButton data-cy="shipping-btn_continue" class="form__action-button" @click="saveShippingDetails" v-else>
          Select shipping method
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
import { useCheckout, useUser, useUserShipping, checkoutGetters, userShippingGetters } from '@vue-storefront/boilerplate';
import { ref, onMounted, computed } from '@vue/composition-api';

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
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    UserShippingAddresses: () => import('~/components/Checkout/UserShippingAddresses')
  },
  setup(props, context) {
    context.emit('changeStep', 1);
    const {
      shippingDetails,
      chosenShippingMethod,
      shippingMethods
    } = useCheckout();

    const { shipping, load: loadUserShipping, setDefault } = useUserShipping();
    const { isAuthenticated } = useUser();

    const canAddNewAddress = ref(true);
    const addressIsModified = ref(false);
    const currentAddressId = ref(-1);
    const setAsDefault = ref(false);
    const isShippingAddressCompleted = ref(false);

    const setShippingDetails = address => {
      shippingDetails.value = {
        ...shippingDetails.value,
        ...address
      };
    };

    const mapAbstractAddressToIntegrationAddress = address => ({
      ...shippingDetails.value,
      city: address.city,
      country: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      streetName: address.streetName,
      postalCode: address.zipCode,
      state: address.state,
      phone: address.phoneNumber,
      apartment: address.apartment
    });

    const setCurrentAddress = async (addressId) => {
      const chosenAddress = userShippingGetters.getAddresses(shipping.value, { id: addressId });
      if (!chosenAddress || !chosenAddress.length) {
        return;
      }
      currentAddressId.value = addressId;
      setShippingDetails(mapAbstractAddressToIntegrationAddress(chosenAddress[0]));
      addressIsModified.value = true;
    };

    onMounted(async () => {
      if (isAuthenticated.value) {
        await loadUserShipping();
        const shippingAddresses = userShippingGetters.getAddresses(shipping.value);
        if (!shippingAddresses || !shippingAddresses.length) {
          return;
        }
        canAddNewAddress.value = false;
        if (shippingAddresses[0].isDefault) {
          setCurrentAddress(shippingAddresses[0].id);
        }
      }
    });

    const saveShippingDetails = async () => {
      if (currentAddressId.value > -1 && setAsDefault.value) {
        const chosenAddress = userShippingGetters.getAddresses(shipping.value, { id: currentAddressId.value });
        if (!chosenAddress || !chosenAddress.length) {
          return;
        }
        await setDefault(chosenAddress[0]);
      }
      isShippingAddressCompleted.value = true;
      addressIsModified.value = false;
    };

    const afterModifiedAddress = () => {
      addressIsModified.value = true;
      currentAddressId.value = -1;
    };

    const canContinueToPayment = computed(() => isShippingAddressCompleted.value && !addressIsModified.value);

    return {
      shippingDetails,
      chosenShippingMethod,
      shippingMethods,
      checkoutGetters,
      COUNTRIES,
      isAuthenticated,
      shippingAddresses: computed(() => userShippingGetters.getAddresses(shipping.value)),
      setAsDefault,
      currentAddressId,
      setCurrentAddress,
      canAddNewAddress,
      canContinueToPayment,
      isShippingAddressCompleted,
      addressIsModified,
      saveShippingDetails,
      afterModifiedAddress
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
    --radio-description-font-size: var(--font-size--xs);
  }
}

</style>
