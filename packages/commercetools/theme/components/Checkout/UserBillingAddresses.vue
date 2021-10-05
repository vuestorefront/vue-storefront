<template>
  <div>
    <SfAddressPicker
      :selected="String(currentAddressId)"
      @change="setCurrentAddress($event)"
      class="billing__addresses"
    >
      <SfAddress
        v-for="billingAddress in billingAddresses"
        :key="userBillingGetters.getId(billingAddress)"
        :name="String(userBillingGetters.getId(billingAddress))"
        class="billing__address"
      >
        <span
          >{{ userBillingGetters.getFirstName(billingAddress) }} {{ userBillingGetters.getLastName(billingAddress) }}</span
        >
        <span
          >{{ userBillingGetters.getStreetName(billingAddress) }}
          {{ userBillingGetters.getStreetNumber(billingAddress) }}</span
        >
        <span>{{ userBillingGetters.getPostCode(billingAddress) }}</span>
        <span
          >{{ userBillingGetters.getCity(billingAddress)
          }}{{ userBillingGetters.getProvince(billingAddress) ? `, ${userBillingGetters.getProvince(billingAddress)}` : '' }}</span
        >
        <span>{{ userBillingGetters.getCountry(billingAddress)}}</span>
        <span>{{ userBillingGetters.getPhone(billingAddress) }}</span>
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      :selected="value"
      @change="$emit('input', $event)"
      name="setAsDefault"
      label="Use this address as my default one."
      class="billing__setAsDefault"
    />
  </div>
</template>

<script>
import {
  SfCheckbox,
  SfAddressPicker
} from '@storefront-ui/vue';
import { useUserBilling, userBillingGetters } from '@vue-storefront/commercetools';
export default {
  name: 'UserBillingAddresses',
  props: {
    currentAddressId: {
      type: String | Number,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  components: {
    SfCheckbox,
    SfAddressPicker
  },
  setup (_, { emit }) {
    const { billing: userBilling } = useUserBilling();
    const setCurrentAddress = async addressId => {
      const selectedAddress = userBillingGetters.getAddresses(userBilling.value, { id: addressId });
      if (!selectedAddress || !selectedAddress.length) {
        return;
      }
      emit('setCurrentAddress', selectedAddress[0]);
    };
    return {
      billingAddresses: userBillingGetters.getAddresses(userBilling.value),
      setCurrentAddress,
      userBillingGetters
    };
  }
};
</script>

<style lang="scss" scoped>
  .billing {
    &__address {
      margin-bottom: var(--spacer-base);
      @include for-desktop {
        margin-right: var(--spacer-sm);
      }
    }
    &__addresses {
      margin-bottom: var(--spacer-xl);
      @include for-desktop {
        display: flex;
      }
    }
    &__setAsDefault {
      margin-bottom: var(--spacer-xl);
    }
  }
</style>
