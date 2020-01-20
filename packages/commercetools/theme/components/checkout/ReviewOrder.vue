<template>
  <div>
    <SfHeading
      title="4. Order review"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfAccordion first-open class="accordion mobile-only">
      <SfAccordionItem header="Personal Details">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">
              {{ order.firstName }} {{ order.lastName }}<br />
            </p>
            <p class="content">
              {{ order.email }}
            </p>
          </div>
          <SfButton
            class="sf-button--text accordion__edit"
            @click="$emit('click:edit', 0)"
            >Edit</SfButton
          >
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Shipping address">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">
              <span class="content__label">{{ shippingMethod.label }}</span
              ><br />
              {{ shipping.streetName }} {{ shipping.apartment }},
              {{ shipping.zipCode }}<br />
              {{ shipping.city }}, {{ shipping.country }}
            </p>
            <p class="content">{{ shipping.phoneNumber }}</p>
          </div>
          <SfButton
            class="sf-button--text accordion__edit"
            @click="$emit('click:edit', 1)"
            >Edit</SfButton
          >
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Billing address">
        <div class="accordion__item">
          <div class="accordion__content">
            <p v-if="payment.sameAsShipping" class="content">
              Same as shipping address
            </p>
            <template v-else>
              <p class="content">
                <span class="content__label">{{ payment.shippingMethod }}</span
                ><br />
                {{ payment.streetName }} {{ payment.apartment }},
                {{ payment.zipCode }}<br />
                {{ payment.city }}, {{ payment.country }}
              </p>
              <p class="content">{{ payment.phoneNumber }}</p>
            </template>
          </div>
          <SfButton
            class="sf-button--text accordion__edit"
            @click="$emit('click:edit', 2)"
            >Edit</SfButton
          >
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Payment method">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">{{ paymentMethod.label }}</p>
          </div>
          <SfButton
            class="sf-button--text accordion__edit"
            @click="$emit('click:edit', 2)"
            >Edit</SfButton
          >
        </div>
      </SfAccordionItem>
    </SfAccordion>
    <SfTable class="sf-table--bordered table desktop-only">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">Item</SfTableHeader>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="table__header"
          >{{ tableHeader }}</SfTableHeader
        >
        <SfTableHeader class="table__action"></SfTableHeader>
      </SfTableHeading>
      <SfTableRow
        v-for="(product, index) in products"
        :key="index"
        class="table__row"
      >
        <SfTableData class="table__image">
          <SfImage :src="product.image" />
        </SfTableData>
        <SfTableData class="table__data table__data--left">
          <div class="product-title">{{ product.title }}</div>
          <div class="product-sku">{{ product.sku }}</div>
        </SfTableData>
        <SfTableData class="table__data">{{
          product.configuration[1].value
        }}</SfTableData>
        <SfTableData class="table__data">{{
          product.configuration[0].value
        }}</SfTableData>
        <SfTableData class="table__data">{{ product.qty }}</SfTableData>
        <SfTableData class="table__data">
          <SfPrice
            :regular="product.price.regular"
            :special="product.price.special"
            class="product-price"
          />
        </SfTableData>
        <SfTableData class="table__action">
          <SfIcon
            icon="cross"
            size="xxs"
            color="#BEBFC4"
            role="button"
            class="button"
            @click="removeProduct(index)"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <SfHeading
      title="Order details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="summary">
      <div class="summary__group">
        <div class="summary__total">
          <SfProperty
            name="Subtotal"
            :value="subtotal"
            class="sf-property--full-width property"
          >
            <template #name
              ><span class="property__name">Subtotal</span></template
            >
          </SfProperty>
          <SfProperty
            name="Shipping"
            :value="shippingMethod.price"
            class="sf-property--full-width property"
          >
            <template #name
              ><span class="property__name">Shipping</span></template
            >
          </SfProperty>
          <SfProperty
            name="Total"
            :value="total"
            class="sf-property--full-width property--huge summary__property-total"
          >
            <template #name>TOTAL</template>
          </SfProperty>
        </div>
        <SfCheckbox v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              I agree to <a href="#">Terms and conditions</a>
            </div>
          </template>
        </SfCheckbox>
      </div>
      <div class="summary__group">
        <SfButton class="sf-button--full-width summary__action-button"
          >Place my order</SfButton
        >
        <SfButton
          class="sf-button--full-width sf-button--text summary__action-button summary__action-button--secondary"
          @click="$emit('click:back')"
        >
          Go back to Payment
        </SfButton>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion
} from "@storefront-ui/vue";
export default {
  name: "ReviewOrder",
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion
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
  data() {
    return {
      terms: false,
      tableHeaders: ["Description", "Colour", "Size", "Quantity", "Amount"]
    };
  },
  computed: {
    products() {
      return this.order.products;
    },
    shipping() {
      return this.order.shipping;
    },
    shippingMethod() {
      const shippingMethod = this.shipping.shippingMethod;
      const method = this.shippingMethods.find(
        method => method.value === shippingMethod
      );
      return method ? method : { price: "$0.00" };
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
    },
    subtotal() {
      const products = this.products;
      const subtotal = products.reduce((previous, current) => {
        const qty = current.qty;
        const price = current.price.special
          ? current.price.special
          : current.price.regular;
        const total = qty * parseFloat(price.replace("$", ""));
        return previous + total;
      }, 0);
      return "$" + subtotal.toFixed(2);
    },
    total() {
      const subtotal = parseFloat(this.subtotal.replace("$", ""));
      const shipping = parseFloat(this.shippingMethod.price.replace("$", ""));
      const total = subtotal + (isNaN(shipping) ? 0 : shipping);
      return "$" + total.toFixed(2);
    }
  },
  methods: {
    removeProduct(index) {
      const order = { ...this.order };
      const products = [...order.products];
      products.splice(index, 1);
      order.products = products;
      this.$emit("update:order", order);
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
.title {
  margin-bottom: $spacer-extra-big;
}
.table {
  margin-bottom: $spacer-big;
  &__header {
    font-size: $font-size-regular-desktop;
    font-weight: $body-font-weight-primary;
    @include for-desktop {
      text-align: center;
    }
  }
  &__data {
    font-size: $font-size-small-desktop;
    text-align: center;
  }
  &__image {
    @include for-desktop {
      flex: 0 0 5.125rem;
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 2.5rem;
    }
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.accordion {
  margin: 0 0 $spacer-extra-big 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}
.summary {
  background-color: $c-light;
  margin: 0 -#{$spacer-big};
  padding: $spacer-big;
  @include for-desktop {
    background-color: transparent;
  }
  &__group {
    @include for-desktop {
      display: flex;
      margin: 0 0 $spacer-extra-big 0;
    }
  }
  &__terms {
    flex: 1;
    order: -1;
    margin-bottom: $spacer-big;
  }
  &__total {
    margin: 0 0 $spacer-extra-big 0;
    padding: 0 $spacer-big;
    flex: 0 0 16.875rem;
    @include for-desktop {
      padding: 0;
    }
  }
  &__action-button {
    flex: 1;
    &--secondary {
      margin: $spacer-big 0;
      @include for-desktop {
        order: -1;
        margin: 0;
        text-align: left;
      }
    }
  }
  &__property-total {
    margin: $spacer-big 0 0 0;
    text-transform: uppercase;
    font-size: $font-size-regular-desktop;
    line-height: 1.6;
    font-weight: 500;
  }
}
.button {
  cursor: pointer;
}
.property {
  margin: 0 0 $spacer 0;
  font-size: $font-size-small-desktop;
  line-height: 1.6;
  &__name {
    color: $c-text-muted;
  }
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
/* TABLE */
.product-title,
.product-sku {
  line-height: 1.6;
}
.product-title {
}
.product-sku {
  color: $c-text-muted;
  font-size: $font-size-extra-small-desktop;
}
.product-price {
  display: flex;
  flex-direction: column;
  font-size: $font-size-small-desktop;
  ::v-deep .sf-price__special {
    order: 1;
    color: $c-text;
  }
}
</style>
