<template>
  <div class="wishlist cl-accent">
    <div class="row">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 pointer cl-accent" @click="closeWishlist">close</i>
      </div>
    </div>
    <h2 v-if="productsInWishlist.length" class="cl-accent ml30">
      {{ $t('Wishlist') }}
    </h2>
    <h4 v-if="!productsInWishlist.length" class="cl-accent ml30">
      {{ $t('Your wishlist is empty.') }}
    </h4>
    <div v-if="!productsInWishlist.length" class="ml30">
      {{ $t("Don't hesitate and") }}
      <router-link :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
    <ul class="products">
      <product v-for="product in productsInWishlist" :key="product.id" :product="product" />
    </ul>
  </div>
</template>

<script>
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist'
import Product from 'theme/components/core/blocks/Wishlist/Product'

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  components: {
    Product
  },
  mixins: [Wishlist]
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
  i {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
</style>
