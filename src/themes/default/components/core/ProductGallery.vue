<template>
  <div class="media-gallery">
    <div v-show="OfflineOnly">
      <img class="offline-image" v-lazy="offline" :src="offline.src" ref="offline" alt="">
    </div>
    <div v-show="OnlineOnly">
      <div class="relative">
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
            @toggle="openOverlay"/>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery.ts'
import ProductGalleryOverlay from './ProductGalleryOverlay'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoSSR from 'vue-no-ssr'
import VueOfflineMixin from 'vue-offline/mixin'
const ProductGalleryCarousel = () => import(/* webpackChunkName: "vsf-product-gallery-carousel" */ './ProductGalleryCarousel.vue')

export default {
  components: {
    ProductGalleryCarousel,
    'no-ssr': NoSSR,
    ProductGalleryOverlay
  },
  mixins: [
    ProductGallery,
    VueOfflineMixin,
    onEscapePress
  ],
  watch: {
    '$route': 'validateRoute'
  },
  data () {
    return {
      isZoomOpen: false,
      showProductGalleryCarousel: false,
      currentSlide: 0
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
  height: 100%;
  background-image: url('/assets/placeholder.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40% auto;
}
.offline-image {
  width: 100%;
}
</style>
