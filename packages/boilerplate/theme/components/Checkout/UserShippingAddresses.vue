<template>
  <div>
    <SfAddressPicker
      :value="currentAddressId"
      @input="setCurrentAddress($event)"
      class="shipping-addresses"
    >
      <SfAddress
        class="shipping-addresses__address"
        v-for="shippingAddress in shippingAddresses"
        :key="shippingAddress.id"
        :name="String(shippingAddress.id)"
      >
        <span
          >{{ userShippingGetters.getFirstName(shippingAddress) }} {{ userShippingGetters.getLastName(shippingAddress) }}</span
        >
        <span
          >{{ userShippingGetters.getStreetName(shippingAddress) }}
          {{ userShippingGetters.getApartmentNumber(shippingAddress) }}</span
        >
        <span>{{ userShippingGetters.getPostCode(shippingAddress) }}</span>
        <span
          >{{ userShippingGetters.getCity(shippingAddress)
          }}{{ userShippingGetters.getProvince(shippingAddress) ? `, ${userShippingGetters.getProvince(shippingAddress)}` : '' }}</span
        >
        <span>{{ userShippingGetters.getCountry(shippingAddress)}}</span>
        <span>{{ userShippingGetters.getPhone(shippingAddress) }}</span>
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      data-cy="shipping-details-checkbox_isDefault"
      v-model="localSetAsDefault"
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
import { ref, watch } from '@vue/composition-api';
import { userShippingGetters } from '@vue-storefront/commercetools';

export default {
  name: 'UserShippingAddresses',
  props: {
    currentAddressId: {
      type: Number,
      required: true
    },
    setAsDefault: {
      type: Boolean,
      required: true
    },
    shippingAddresses: {
      type: Array,
      required: true
    }
  },
  components: {
    SfCheckbox,
    SfAddressPicker
  },
  watch: {
    setAsDefault (setAsDefault) {
      this.localSetAsDefault = setAsDefault;
    }
  },
  setup ({ setAsDefault }, { emit }) {
    const setCurrentAddress = $event => emit('setCurrentAddress', $event);
    const localSetAsDefault = ref(setAsDefault);
    watch(localSetAsDefault, () => emit('changeSetAsDefault', localSetAsDefault.value));

    return {
      setCurrentAddress,
      localSetAsDefault,
      userShippingGetters
    };
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

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
