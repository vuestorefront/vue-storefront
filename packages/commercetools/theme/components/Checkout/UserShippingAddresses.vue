<template>
  <div>
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
        <span
          >{{ shippingAddress.firstName }} {{ shippingAddress.lastName }}</span
        >
        <span
          >{{ shippingAddress.streetName }}
          {{ shippingAddress.apartment }}</span
        >
        <span>{{ shippingAddress.zipCode }}</span>
        <span
          >{{ shippingAddress.city
          }}{{ shippingAddress.state ? `, ${shippingAddress.city}` : '' }}</span
        >
        <span>{{ shippingAddress.country }}</span>
        <span>{{ shippingAddress.phoneNumber }}</span>
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
  SfCheckbox
} from '@storefront-ui/vue';
import SfAddressPicker from '~/components/temp/SfAddressPicker';
import { ref, watch } from '@vue/composition-api';

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
  setup ({ setAsDefault }, { emit }) {
    const setCurrentAddress = $event => emit('setCurrentAddress', $event);

    const localSetAsDefault = ref(setAsDefault);

    watch(localSetAsDefault, () => emit('changeSetAsDefault', localSetAsDefault.value));
    watch(() => setAsDefault, () => localSetAsDefault.value = setAsDefault);

    return {
      setCurrentAddress,
      localSetAsDefault
    };
  }
};
</script>

<style>
  .shipping__addresses {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: var(--spacer-xl);
  }

  .shipping-address-setAsDefault, .form__action-button--margin-bottom {
    margin-bottom: var(--spacer-xl);
  }
</style>
