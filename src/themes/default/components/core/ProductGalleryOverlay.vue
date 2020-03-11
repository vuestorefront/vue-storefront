<template>
  <div class="media-zoom">
    <i
      class="media-zoom__close material-icons p15 cl-bg-tertiary pointer"
      @click="$emit('close')"
    >close</i>
    <no-ssr>
      <product-gallery-zoom-carousel
        v-if="showProductGalleryZoomCarousel"
        :current-slide="currentSlide"
        :gallery="gallery"
        :product-name="productName"
      />
    </no-ssr>
  </div>
</template>
<script>
import NoSSR from 'vue-no-ssr'
import ProductGalleryZoomCarousel from './ProductGalleryZoomCarousel.vue'

export default {
  name: 'ProductGalleryOverlay',
  props: {
    currentSlide: {
      type: Number,
      required: false,
      default: 0
    },
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      showProductGalleryZoomCarousel: false
    }
  },
  components: {
    'no-ssr': NoSSR,
    ProductGalleryZoomCarousel
  },
  mounted () {
    this.$store.commit('ui/setOverlay', true)
    this.showProductGalleryZoomCarousel = true
  },
  destroyed () {
    this.$store.commit('ui/setOverlay', false)
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$z-index-gallery: map-get($z-index, overlay) + 1;

.media-zoom {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index-gallery;
  background: #fff;

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
