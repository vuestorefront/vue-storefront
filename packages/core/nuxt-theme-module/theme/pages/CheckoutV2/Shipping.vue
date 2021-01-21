<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ShippingForm
      :address="shipping"
      :isSaving="isSaving"
      @addressSubmit="({ callback, shippingDetails }) => handleShippingAddressSubmit(callback)(shippingDetails)"
      @methodSubmit="({ callback, shippingMethod }) => handleShippingMethodSubmit(callback)(shippingMethod)"
      @stepSubmit="handleStepSubmit"
    />
  </div>
</template>

<script>
import {
  SfHeading
} from '@storefront-ui/vue';
import { useCheckoutShipping, useCheckoutShippingMethod } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import { reactive, onMounted } from '@vue/composition-api';
import ShippingForm from '../../components/Checkout/ShippingForm';

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    ShippingForm
  },
  setup(props, context) {
    const {
      save: saveShipping,
      load: loadShipping,
      error: shippingError,
      shipping
    } = useCheckoutShipping();
    const {
      save: saveShippingMethod,
      load: loadShippingMethod,
      error: shippingMethodError
    } = useCheckoutShippingMethod();

    const isSaving = reactive({
      details: false,
      method: false
    });

    onSSR(async () => loadShipping());

    onMounted(async () => {
      // if (isAuthenticated.value) {
      //   await loadUserShipping();
      //   const shippingAddresses = userShippingGetters.getAddresses(shipping.value);
      //   if (!shippingAddresses || !shippingAddresses.length) {
      //     return;
      //   }
      //   canAddNewAddress.value = false;
      //   if (shippingAddresses[0].isDefault) {
      //     setCurrentAddress(shippingAddresses[0].id);
      //   }
      // }
    });

    const handleShippingAddressSubmit = (callback) => async (shippingDetails) => {
      isSaving.details = true;
      await saveShipping({ shippingDetails });
      if (shippingError.value.save) {
        return;
      }
      await loadShippingMethod();
      isSaving.details = false;
      callback();
      // if (currentAddressId.value > -1 && setAsDefault.value) {
      //   const chosenAddress = userShippingGetters.getAddresses(shipping.value, { id: currentAddressId.value });
      //   if (!chosenAddress || !chosenAddress.length) {
      //     return;
      //   }
      //   await setDefaultAddress(chosenAddress[0]);
      // }
      // addressIsModified.value = false;
    };
    const handleShippingMethodSubmit = (callback) => async (shippingMethod) => {
      isSaving.method = true;
      await saveShippingMethod({ shippingMethod });
      if (shippingMethodError.value.save) {
        return;
      }
      isSaving.method = false;
      callback();
    };

    const handleStepSubmit = () => {
      context.root.$router.push('/checkout/payment');
    };

    // const setShippingDetailsAndUnpickAddress = value => {
    //   setShippingDetails(value);
    //   currentAddressId.value = -1;
    //   addressIsModified.value = true;
    // };

    return {
      shipping,
      isSaving,
      handleShippingAddressSubmit,
      handleShippingMethodSubmit,
      handleStepSubmit
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
