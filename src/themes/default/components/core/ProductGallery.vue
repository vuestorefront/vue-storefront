<template>
  <div class="media-gallery">
    <div v-show="OfflineOnly">
      <img class="offline-image" v-lazy="offline" :src="offline.src" ref="offline" alt="">
    </div>
    <div v-show="OnlineOnly">
      <div class="relative">
        <div v-if="gallery.length === 1">
          <img
            :src="defaultImage.src"
            v-lazy="defaultImage"
            class="mw-100 pointer"
            ref="defaultImage"
            :alt="product.name | htmlDecode"
            itemprop="image"
          >
        </div>
        <div v-else>
          <product-gallery-overlay
            v-if="isZoomOpen"
            :current-slide="currentSlide"
            :product-name="product.name"
            :gallery="gallery"
            @close="toggleZoom"/>
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

<style lang="scss">
.media-gallery {
  text-align: center;
  height: 100%;
  &.open {
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .product-zoom {
      @media (max-width: 767px) {
        position: absolute;
        top: 50%;
        transform: translate(0,-50%);
        -webkit-transform: translate(0,-50%);
        -moz-transform: translate(0,-50%);
        -ms-transform: translate(0,-50%);
        -o-transform: translate(0,-50%);
      }
    }
  }
}
.offline-image {
  width: 100%;
}
.zoom-in {
  position: absolute;
  bottom: 0;
  right: 0;
}
img {
  opacity: 0.9;
  mix-blend-mode: multiply;
  vertical-align: top;
  &:hover {
    opacity: 1;
  }
}
img[lazy=error] {
  width: 100%;
}
img[lazy=loading] {
  width: 100%;
}

.thumbnails {
  div {
    margin: 0 20px 20px 0;
  }
}
</style>
