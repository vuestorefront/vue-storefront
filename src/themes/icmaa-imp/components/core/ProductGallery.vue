<template>
  <div>
    <div class="media-gallery">
      <div v-if="isOnline" class="t-relative t-w-full">
        <no-ssr>
          <product-gallery-carousel
            v-if="showProductGalleryCarousel"
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
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery.ts'
import ProductImage from './ProductImage'
import { onlineHelper } from '@vue-storefront/core/helpers'

const ProductGalleryCarousel = () => import(/* webpackChunkName: "vsf-product-gallery-carousel" */ './ProductGalleryCarousel.vue')

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
      showProductGalleryCarousel: false,
      currentSlide: 0,
      carouselLoaded: false
    }
  },
  mounted () {
    this.showProductGalleryCarousel = true
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
