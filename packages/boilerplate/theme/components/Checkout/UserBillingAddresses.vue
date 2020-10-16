<template>
  <div>
    <SfAddressPicker
      :value="currentAddressId"
      @input="setCurrentAddress($event)"
      class="billing__addresses"
    >
      <SfAddress
        v-for="billingAddress in billingAddresses"
        :key="userBillingGetters.getId(billingAddress)"
        :name="String(userBillingGetters.getId(billingAddress))"
      >
        <span
          >{{ userBillingGetters.getFirstName(billingAddress) }} {{ userBillingGetters.getLastName(billingAddress) }}</span
        >
        <span
          >{{ userBillingGetters.getStreetName(billingAddress) }}
          {{ userBillingGetters.getApartmentNumber(billingAddress) }}</span
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
      data-cy="billing-details-checkbox_isDefault"
      :selected="setAsDefault"
      @change="$emit('changeSetAsDefault', $event)"
      name="setAsDefault"
      label="Use this address as my default one."
      class="billing-address-setAsDefault"
    />
  </div>
</template>

<script>
import {
  SfCheckbox
} from '@storefront-ui/vue';
import SfAddressPicker from '~/components/temp/SfAddressPicker';
import { userBillingGetters } from '@vue-storefront/boilerplate';

export default {
  name: 'UserBillingAddresses',
  props: {
    currentAddressId: {
      type: Number,
      required: true
    },
    setAsDefault: {
      type: Boolean,
      required: true
    },
    billingAddresses: {
      type: Array,
      required: true
    }
  },
  components: {
    SfCheckbox,
    SfAddressPicker
  },
  setup (_, { emit }) {
    const setCurrentAddress = $event => emit('setCurrentAddress', $event);

    return {
      setCurrentAddress,
      userBillingGetters
    };
  }
};
</script>

<style>
  .billing__addresses {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: var(--spacer-xl);
  }
  .billing-address-setAsDefault, .form__action-button--margin-bottom {
    margin-bottom: var(--spacer-xl);
  }
</style>
