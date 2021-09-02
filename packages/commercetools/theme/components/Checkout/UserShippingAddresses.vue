<template>
  <div>
    <SfAddressPicker
      :selected="currentAddressId"
      @change="setCurrentAddress($event)"
      class="shipping-addresses"
    >
      <SfAddress
        class="shipping-addresses__address"
        v-for="shippingAddress in shippingAddresses"
        :key="userShippingGetters.getId(shippingAddress)"
        :name="String(userShippingGetters.getId(shippingAddress))"
      >
        <UserShippingAddress :address="shippingAddress" />
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      v-show="currentAddressId"
      :selected="value"
      @change="$emit('input', $event)"
      name="setAsDefault"
      label="Use this address as my default one."
      class="shipping-address-setAsDefault"
    />
  </div>
</template>

<script>
import {
  SfCheckbox,
  SfAddressPicker
} from '@storefront-ui/vue';
import UserShippingAddress from '~/components/UserShippingAddress';
import { useUserShipping, userShippingGetters } from '@vue-storefront/commercetools';

export default {
  name: 'UserShippingAddresses',
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
    SfAddressPicker,
    UserShippingAddress
  },
  setup (_, { emit }) {
    const { shipping: userShipping } = useUserShipping();

    const setCurrentAddress = async (addressId) => {
      const selectedAddress = userShippingGetters.getAddresses(userShipping.value, { id: addressId });
      if (!selectedAddress || !selectedAddress.length) {
        return;
      }
      emit('setCurrentAddress', selectedAddress[0]);
    };

    return {
      shippingAddresses: userShippingGetters.getAddresses(userShipping.value),
      setCurrentAddress,
      userShippingGetters
    };
  }
};
</script>

<style lang="scss">
.shipping-addresses {
  @include for-desktop {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }
  margin-bottom: var(--spacer-xl);
  &__address {
    margin-bottom: var(--spacer-sm);
  }
}

.shipping-address-setAsDefault, .form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>
