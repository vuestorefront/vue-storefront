<template>
  <div>
    <div class="highlighted">
      <SfHeading
        title="Order review"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <div class="highlighted__header">
        <h3 class="highlighted__title">Personal details</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 0)">Edit</SfButton>
      </div>
      <p class="content">{{ personalDetails.firstName }} {{ personalDetails.lastName }}<br /></p>
      <p class="content">{{ personalDetails.email }}</p>
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Shipping details</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 1)">Edit</SfButton>
      </div>
      <p class="content">
        <span class="content__label">{{ getShippingMethodName(chosenShippingMethod) }}</span><br />
        {{ shippingDetails.streetName }} {{ shippingDetails.apartment }}, {{ shippingDetails.zipCode }}<br />
        {{ shippingDetails.city }}, {{ shippingDetails.country }}
      </p>
      <p class="content">{{ shippingDetails.phoneNumber }}</p>
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Billing address</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 2)">Edit</SfButton>
      </div>
      <p v-if="billingSameAsShipping" class="content">Same as shipping address</p>
      <template v-else>
        <p class="content">
          <span class="content__label">{{ chosenPaymentMethod }}</span><br />
          {{ billingDetails.streetName }} {{ billingDetails.apartment }}, {{ billingDetails.zipCode }}<br />
          {{ billingDetails.city }}, {{ billingDetails.country }}
        </p>
        <p class="content">{{ billingDetails.phoneNumber }}</p>
      </template>
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Payment method</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 2)">Edit</SfButton>
      </div>
      <p class="content">{{ paymentMethod.label }}</p>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfButton } from '@storefront-ui/vue';
import { useCheckout } from '@vue-storefront/commercetools-composables';
import {
  getShippingMethodName,
  getShippingMethodDescription,
  getShippingMethodPrice
} from '@vue-storefront/commercetools-helpers';

export default {
  name: 'OrderReview',
  components: {
    SfHeading,
    SfButton
  },

  setup() {
    const { personalDetails, shippingDetails, chosenShippingMethod, chosenPaymentMethod } = useCheckout();

    return {
      personalDetails,
      shippingDetails,
      chosenShippingMethod,
      chosenPaymentMethod,
      getShippingMethodName,
      getShippingMethodDescription,
      getShippingMethodPrice
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: #f1f2f3;
  padding: $spacer-extra-big;
  margin-bottom: $spacer-big;
  &:last-child {
    margin-bottom: 0;
  }
  &--total {
    margin-bottom: 1px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacer-big;
  }
  &__title {
    font-family: $body-font-family-primary;
    font-size: $font-size-big-desktop;
    line-height: 1.6;
  }
}
.title {
  margin-bottom: $spacer-extra-big;
}
.content {
  margin: 0 0 $spacer-big 0;
  color: $c-text;
  font-size: $font-size-extra-small-desktop;
  font-weight: 300;
  line-height: 1.6;
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: 400;
  }
}
</style>
