<template>
  <div class="media-gallery" :class="{'media-gallery--loaded': carouselLoaded}">
    <div class="relative w-100">
      <product-gallery-overlay
        v-if="isZoomOpen"
        :current-slide="currentSlide"
        :product-name="product.name"
        :gallery="gallery"
        @close="toggleZoom"
      />
      <no-ssr>
        <product-gallery-carousel
          v-if="showProductGalleryCarousel"
          :gallery="gallery"
          :configuration="configuration"
          :product-name="product.name"
          @toggle="openOverlay"
          @loaded="carouselLoaded = true"
        />
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery.ts'
import ProductGalleryOverlay from './ProductGalleryOverlay'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoSSR from 'vue-no-ssr'
const ProductGalleryCarousel = () => import(/* webpackChunkName: "vsf-product-gallery-carousel" */ './ProductGalleryCarousel.vue')

export default {
  components: {
    ProductGalleryCarousel,
    'no-ssr': NoSSR,
    ProductGalleryOverlay
  },
  mixins: [
    ProductGallery,
    onEscapePress
  ],
  watch: {
    '$route': 'validateRoute'
  },
  data () {
    return {
      isZoomOpen: false,
      showProductGalleryCarousel: false,
      currentSlide: 0,
      carouselLoaded: false
    }
  },
  mounted () {
    this.showProductGalleryCarousel = true
  },
  methods: {
    openOverlay (currentSlide) {
      this.currentSlide = currentSlide
      this.toggleZoom()
    },
    validateRoute () {
      this.$forceUpdate()
    },
    toggleZoom () {
      this.isZoomOpen = !this.isZoomOpen
    },
    onEscapePress () {
      if (this.isZoomOpen) {
        this.toggleZoom()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.media-gallery {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  min-height: calc(90vw * 1.1);
  background-image: url('/assets/placeholder.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40% auto;

  @media only screen and (min-width:768px) {
    min-height: inherit;
  }

  &--loaded {
    background-image: none;
  }
}
</style>
