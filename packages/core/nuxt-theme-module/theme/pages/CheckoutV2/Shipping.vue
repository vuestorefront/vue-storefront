<template>
  <div>
    <SfHeading
      :level="3"
      title="Shipping"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <ShippingForm
      :address="$chShipping.shipping"
      :isShippingDetailsCompleted="isShippingDetailsCompleted"
      :isShippingMethodCompleted="isShippingMethodCompleted"
      :isSaving="isSaving"
      @addressSubmit="({ reset, shippingDetails }) => handleShippingAddressSubmit(reset)(shippingDetails)"
      @addressModify="isShippingDetailsCompleted = false"
      @methodSubmit="({ reset, shippingMethod }) => handleShippingMethodSubmit(reset)(shippingMethod)"
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
import { ref, reactive, onMounted } from '@vue/composition-api';
import ShippingForm from '../../components/Checkout/ShippingForm';

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    ShippingForm
  },
  setup(props, context) {
    const $chShipping = useCheckoutShipping();
    const $chShippingMethod = useCheckoutShippingMethod();

    const isShippingDetailsCompleted = ref(false);
    const isShippingMethodCompleted = ref(false);
    const isSaving = reactive({
      details: false,
      method: false
    });

    onSSR(async () => $chShipping.load());

    onMounted(async () => {
      // shippingDetails.value = $chShipping.shipping.value;
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

    const handleShippingAddressSubmit = (reset) => async (shippingDetails) => {
      await $chShipping.save({ shippingDetails });
      if ($chShipping.error.value.save) {
        return;
      }
      await $chShippingMethod.load();
      reset();
      isShippingDetailsCompleted.value = true;
      // if (currentAddressId.value > -1 && setAsDefault.value) {
      //   const chosenAddress = userShippingGetters.getAddresses(shipping.value, { id: currentAddressId.value });
      //   if (!chosenAddress || !chosenAddress.length) {
      //     return;
      //   }
      //   await setDefaultAddress(chosenAddress[0]);
      // }
      // addressIsModified.value = false;
    };
    const handleShippingMethodSubmit = (reset) => async (shippingMethod) => {
      await $chShippingMethod.save({ shippingMethod });
      reset();
      isShippingMethodCompleted.value = true;
    };

    const handleStepSubmit = () => {
      context.root.$router.push('/checkout/payment');
    };

    // const setShippingDetailsAndUnpickAddress = value => {
    //   setShippingDetails(value);
    //   currentAddressId.value = -1;
    //   addressIsModified.value = true;
    // };

    // const canContinueToPayment = dirty => isShippingAddressCompleted.value && !dirty && !addressIsModified.value;

    return {
      $chShipping,
      $chShippingMethod,
      isShippingDetailsCompleted,
      isShippingMethodCompleted,
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
