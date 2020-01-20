<template>
  <div>
    <div class="highlighted">
      <SfHeading
        title="Order review"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <div class="highlighted__header">
        <h3 class="highlighted__title">Personal details</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 0)"
          >Edit</SfButton
        >
      </div>
      <p class="content">{{ order.firstName }} {{ order.lastName }}<br /></p>
      <p class="content">
        {{ order.email }}
      </p>
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Shipping details</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 1)"
          >Edit</SfButton
        >
      </div>
      <p class="content">
        <span class="content__label">{{ shippingMethod.label }}</span
        ><br />
        {{ shipping.streetName }} {{ shipping.apartment }}, {{ shipping.zipCode
        }}<br />
        {{ shipping.city }}, {{ shipping.country }}
      </p>
      <p class="content">{{ shipping.phoneNumber }}</p>
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Billing address</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 2)"
          >Edit</SfButton
        >
      </div>
      <p v-if="payment.sameAsShipping" class="content">
        Same as shipping address
      </p>
      <template v-else>
        <p class="content">
          <span class="content__label">{{ payment.shippingMethod }}</span
          ><br />
          {{ payment.streetName }} {{ payment.apartment }}, {{ payment.zipCode
          }}<br />
          {{ payment.city }}, {{ payment.country }}
        </p>
        <p class="content">{{ payment.phoneNumber }}</p>
      </template>
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Payment method</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 2)"
          >Edit</SfButton
        >
      </div>
      <p class="content">{{ paymentMethod.label }}</p>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfButton } from "@storefront-ui/vue";
export default {
  name: "OrderReview",
  components: {
    SfHeading,
    SfButton
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    shippingMethods: {
      type: Array,
      default: () => []
    },
    paymentMethods: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    shipping() {
      return this.order.shipping;
    },
    shippingMethod() {
      const shippingMethod = this.shipping.shippingMethod;
      const method = this.shippingMethods.find(
        method => method.value === shippingMethod
      );
      return method ? method : { price: 0 };
    },
    payment() {
      return this.order.payment;
    },
    paymentMethod() {
      const paymentMethod = this.payment.paymentMethod;
      const method = this.paymentMethods.find(
        method => method.value === paymentMethod
      );
      return method ? method : { label: "" };
    }
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
