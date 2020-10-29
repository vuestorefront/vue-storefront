<template>
  <SfProductCard
    data-sp="category-product-card"
    :style="{ '--index': productKey }"
    :title="
      productGetters.getName(product) +
        (productGetters.getStatus(product) ? '' : ' - Out of Stock')
    "
    :image="productGetters.getCoverImage(product)"
    :max-rating="5"
    :score-rating="false"
    :show-add-to-cart-button="true"
    :is-on-wishlist="productGetters.isOnWishlist(product)"
    :add-to-cart-disabled="productGetters.getStatus(product) ? false : true"
    @click:wishlist="toggleWishlist(productKey)"
    @click:add-to-cart="addToCart(product, parseInt(1))"
    :link="
      localePath(
        `/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`
      )
    "
    class="products__product-card"
  >
    <template slot="price">
      <SfPrice
        v-if="productGetters.hasSpecialPrice(product)"
        class="sf-product-card__price"
        :regular="
          productGetters.getFormattedPrice(
            productGetters.getPrice(product).regular
          )
        "
        :special="
          productGetters.getFormattedPrice(
            productGetters.getPrice(product).special
          )
        "
      />
      <SfPrice
        v-else
        class="sf-product-card__price"
        :regular="
          productGetters.getFormattedPrice(
            productGetters.getPrice(product).regular
          )
        "
      />
    </template>
  </SfProductCard>
</template>
<script>
import { SfProductCard, SfPrice } from '@storefront-ui/vue';
import { productGetters, useCart } from '@vue-storefront/shopify';

export default {
  components: {
    SfProductCard,
    SfPrice
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    productKey: {
      type: Number,
      default: () => 1
    }
  },
  setup() {
    const { isOnCart, addToCart } = useCart();

    function toggleWishlist() {
      this.product.isOnWishlist = !this.product.isOnWishlist;
    }

    return {
      productGetters,
      isOnCart,
      toggleWishlist,
      addToCart
    };
  }
};
</script>
