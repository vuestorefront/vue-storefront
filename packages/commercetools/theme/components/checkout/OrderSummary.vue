<template>
  <div>
    <div class="highlighted">
      <SfHeading
        title="Order summary"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <div class="total-items">
        <h3>Total items: {{ totalItems }}</h3>
        <SfButton class="sf-button--text" @click="listIsHidden = !listIsHidden"
          >{{ listIsHidden ? "Show" : "Hide" }} items list</SfButton
        >
      </div>
      <transition name="fade">
        <div v-if="!listIsHidden" class="collected-product-list">
          <SfCollectedProduct
            v-for="(product, index) in products"
            :key="index"
            v-model="product.qty"
            :image="product.image"
            :title="product.title"
            :regular-price="product.price.regular"
            :special-price="product.price.special"
            :stock="product.stock"
            class="collected-product"
            @click:remove="removeProduct(index)"
          >
            <template #configuration>
              <div class="product__properties">
                <SfProperty
                  v-for="(property, key) in product.configuration"
                  :key="key"
                  :name="property.name"
                  :value="property.value"
                  class="product__property"
                />
              </div>
            </template>
            <template #actions>
              <div>
                <div class="product__action">{{ product.sku }}</div>
                <div class="product__action">
                  Quantity: <span class="product__qty">{{ product.qty }}</span>
                </div>
              </div>
            </template>
            <template #input>
              <!--              <div></div>-->
            </template>
          </SfCollectedProduct>
        </div>
      </transition>
    </div>
    <div class="highlighted highlighted--total">
      <SfProperty
        name="Products"
        :value="totalItems"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Subtotal"
        :value="subtotal"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Shipping"
        :value="shippingMethod.price"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Total"
        :value="total"
        class="sf-property--full-width property-total"
      />
    </div>
    <div class="highlighted promo-code">
      <SfButton
        class="promo-code__button"
        @click="showPromoCode = !showPromoCode"
        >{{ showPromoCode ? "-" : "+" }} Promo Code</SfButton
      >
      <transition name="fade">
        <div v-if="showPromoCode">
          <SfInput
            v-model="promoCode"
            name="promoCode"
            label="Enter promo code"
            class="promo-code__input"
          />
          <SfButton class="sf-button--full-width">Apply code</SfButton>
        </div>
      </transition>
    </div>
    <div class="highlighted">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfButton,
  SfCollectedProduct,
  SfProperty,
  SfCharacteristic,
  SfInput
} from "@storefront-ui/vue";
export default {
  name: "OrderSummary",
  components: {
    SfHeading,
    SfButton,
    SfCollectedProduct,
    SfProperty,
    SfCharacteristic,
    SfInput
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
      promoCode: "",
      showPromoCode: false,
      listIsHidden: false,
      characteristics: [
        {
          title: "Safety",
          description: "It carefully packaged with a personal touch",
          icon: "safety"
        },
        {
          title: "Easy shipping",
          description:
            "You’ll receive dispatch confirmation and an arrival date",
          icon: "shipping"
        },
        {
          title: "Changed your mind?",
          description: "Rest assured, we offer free returns within 30 days",
          icon: "return"
        }
      ]
    };
  },
  computed: {
    products() {
      return this.order.products;
    },
    totalItems() {
      return (
        "" +
        this.products.reduce((previous, current) => {
          return previous + current.qty;
        }, 0)
      );
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
}
.title {
  margin-bottom: $spacer-extra-big;
}
.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacer-big;
}
.property {
  margin-bottom: $spacer;
  ::v-deep .sf-property__name {
    text-transform: unset;
  }
}
.property-total {
  margin-top: $spacer-extra-big;
  font-size: $font-size-extra-big-desktop;
  font-weight: 500;
  ::v-deep .sf-property__name {
    color: $c-text;
  }
}
.collected-product-list {
  margin: 0 -20px;
}
.collected-product {
  &:not(:last-child) {
    margin-bottom: $spacer-big;
  }
}
.characteristic {
  &:not(:last-child) {
    margin-bottom: $spacer-big;
  }
}
.promo-code {
  &__button {
    padding: 0;
    background-color: transparent;
    color: $c-primary;
    font-size: $font-size-big-desktop;
  }
  &__input {
    margin: $spacer-big 0;
    ::v-deep input {
      border-color: $c-gray-variant;
    }
  }
}
.product {
  &__properties {
    margin: $spacer-big 0 0 0;
  }
  &__property,
  &__action {
    font-size: $font-size-extra-small-desktop;
  }
  &__action {
    color: $c-gray-variant;
    font-size: $font-size-extra-small-desktop;
    margin: 0 0 $spacer-small 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: $c-text;
  }
}
</style>
