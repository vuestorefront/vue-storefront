<template>
  <div>
    <img src="/assets/product-spacer.png" class="t-block t-w-full lg:t-w-2/3" v-if="!carouselLoaded">
    <div class="media-gallery">
      <div v-if="isOnline" class="t-relative t-w-full">
        <no-ssr>
          <product-gallery-carousel
            :gallery="gallery"
            :configuration="configuration"
            :product-name="product.name"
            @loaded="carouselLoaded = true"
          />
        </no-ssr>
      </div>
      <product-image v-else :image="offline" />
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery'
import ProductImage from './ProductImage'
import { onlineHelper } from '@vue-storefront/core/helpers'

const ProductGalleryCarousel = () => import(/* webpackChunkName: "vsf-product-gallery-carousel" */ './ProductGalleryCarousel')

export default {
  components: {
    'no-ssr': NoSSR,
    ProductGalleryCarousel,
    ProductImage
  },
  mixins: [
    ProductGallery
  ],
  watch: {
    '$route': 'validateRoute'
  },
  data () {
    return {
      currentSlide: 0,
      carouselLoaded: false
    }
  },
  computed: {
    isOnline (value) {
      return onlineHelper.isOnline
    }
  },
  methods: {
    validateRoute () {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-placeholder {
  height: 140vw;

  @media only screen and (min-width:1024px) {
    width: 95%;
    height: 66.6%;
  }
}

.media-gallery {
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  min-height: calc(90vw * 1.1);

  @media only screen and (min-width:768px) {
    min-height: inherit;
  }

  &--loaded {
    background-image: none;
  }
}
</style>
