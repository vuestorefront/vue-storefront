<template>
  <div class="product-tile py10-md">
    <div class="row center-xs fs-medium-small" :class="{ 'middle-xs p10' : mobileHorizontalMode, p30 : !mobileHorizontalMode}">
      <div class="col-md-12" :class="{ 'col-xs-4' : mobileHorizontalMode}">
          <figure class="image center-xs middle-xs flex m0 mt10" :class="{ 'image-horizontal' : mobileHorizontalMode }">
              <img :src="thumbnail()" :alt="product.name">
          </figure>
        </div>
        <div class="col-md-12 center-md" :class="{ 'col-xs-8 middle-xs start-xs' : mobileHorizontalMode}">
          <div class="c-secondary" :class="{ mt20 : !mobileHorizontalMode }"> {{ product.name | htmlDecode }}</div>
          <div class="bold c-on-light mt10"> {{ product.price | price }}</div>
        </div>
    </div>
  </div>
</template>

<script>
import { thumbnail } from 'src/lib/filters'

export default {
  props: {
    product: {
      require: true,
      default: {}
    },
    // desktopHorizontalMode: Boolean, - will be available soon
    mobileHorizontalMode: Boolean
  },
  methods: {
    thumbnail () {
      return thumbnail(this.product.image, 230, 250)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/additional';
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
  height: 250px;
}

@media ( max-width: $md ) {
  .image-horizontal {
    height: 80px;
  }
  .image-horizontal img {
    height: 80px;
  }
}

</style>

