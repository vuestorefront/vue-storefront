<template>
  <div>
    <SfAddressPicker
      :value="currentAddressId"
      @input="setCurrentAddress($event)"
      class="billing__addresses"
    >
      <SfAddress
        v-for="billingAddress in billingAddresses"
        :key="billingAddress.id"
        :name="String(billingAddress.id)"
      >
        <span
          >{{ billingAddress.firstName }} {{ billingAddress.lastName }}</span
        >
        <span
          >{{ billingAddress.streetName }}
          {{ billingAddress.apartment }}</span
        >
        <span>{{ billingAddress.zipCode }}</span>
        <span
          >{{ billingAddress.city
          }}{{ billingAddress.state ? `, ${billingAddress.city}` : '' }}</span
        >
        <span>{{ billingAddress.country }}</span>
        <span>{{ billingAddress.phoneNumber }}</span>
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      data-cy="billing-details-checkbox_isDefault"
      v-model="localSetAsDefault"
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
import { ref, watch } from '@vue/composition-api';
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
  .billing__addresses {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: var(--spacer-xl);
  }
  .billing-address-setAsDefault, .form__action-button--margin-bottom {
    margin-bottom: var(--spacer-xl);
  }
</style>
