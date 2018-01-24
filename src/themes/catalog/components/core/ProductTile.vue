<template>
  <div class="product-tile center-xs fs-medium-small p30">
      <figure class="image center-xs middle-xs flex m0 mt10">
          <img :src="thumbnail()" :alt="product.name">
      </figure>
      <div class="c-secondary mt50"> {{ product.name }}</div>
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
      return thumbnail(this.product.image, 220, 300)
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
.image {
  height: 270px;
      mix-blend-mode: multiply;

}
.image img {
  overflow: hidden;
  max-height: 250px;
}
</style>

