<template>
  <div class="product-tile center-xs fs-medium-small p30">
        <img :src="thumbnail()" alt="">
        <div class="c-secondary mt30"> {{ product.name }}</div>
        <div class="bold c-on-light mt10"> {{ product.price | price }}</div>
  </div>
</template>

<script>
import { thumbnail } from 'src/lib/filters'

export default {
  props: {
    product: {
      require: true,
      default: {}
    }
  },
  methods: {
    thumbnail () {
      return thumbnail(this.product.image, 310, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/mixins/transitions';

.product-tile img {
    @include transition-long;
}
.product-tile:hover img {
    transform: scale(1.05);
}
</style>

