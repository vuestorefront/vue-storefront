<template>
  <div>
    <SfAddressPicker
      :value="currentAddressId"
      @input="setCurrentAddress($event)"
      class="shipping__addresses"
    >
      <SfAddress
        v-for="shippingAddress in shippingAddresses"
        :key="userShippingGetters.getId(shippingAddress)"
        :name="String(userShippingGetters.getId(shippingAddress))"
      >
        <UserShippingAddress :address="shippingAddress" />
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
import { SfCheckbox } from '@storefront-ui/vue';
import UserShippingAddress from '~/components/UserShippingAddress';
import SfAddressPicker from '~/components/temp/SfAddressPicker';
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
    SfAddressPicker,
    UserShippingAddress
  },
  setup ({ setAsDefault }, { emit }) {
    const setCurrentAddress = $event => emit('setCurrentAddress', $event);

    const localSetAsDefault = ref(setAsDefault);

    watch(localSetAsDefault, () => emit('changeSetAsDefault', localSetAsDefault.value));
    watch(() => setAsDefault, () => localSetAsDefault.value = setAsDefault);

    return {
      setCurrentAddress,
      localSetAsDefault,
      userShippingGetters
    };
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/shared/styles/variables";

  .shipping__addresses {
    @include for-desktop {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    margin-bottom: var(--spacer-xl);

    .sf-address {
      margin-bottom: var(--spacer-sm);
    }
  }

  .shipping-address-setAsDefault, .form__action-button--margin-bottom {
    margin-bottom: var(--spacer-xl);
  }
</style>
