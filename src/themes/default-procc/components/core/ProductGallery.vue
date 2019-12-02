<template>
  <div class="media-gallery" :class="{'media-gallery--loaded': carouselLoaded}">
    <div v-if="isOnline" class="card relative w-100">
      <!--        // Changes Vinod-->
      <div class="row card-header" v-if="isCCStore">
        <img
          :src="product.brand_logo"
          width="100"
          height="100"
        >
      </div>
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
    <product-image v-else :image="offline" />
  </div>
</template>

<script>
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery.ts'
import ProductGalleryOverlay from './ProductGalleryOverlay'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import NoSSR from 'vue-no-ssr'
import ProductImage from './ProductImage'
import { onlineHelper } from '@vue-storefront/core/helpers'
import { mapGetters } from 'vuex'

const ProductGalleryCarousel = () => import(/* webpackChunkName: "vsf-product-gallery-carousel" */ './ProductGalleryCarousel.vue')

export default {
  components: {
    ProductGalleryCarousel,
    'no-ssr': NoSSR,
    ProductGalleryOverlay,
    ProductImage
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
      carouselLoaded: false,
      isCCStore: false
    }
  },
  mounted () {
    this.showProductGalleryCarousel = true
  },
  computed: {
    ...mapGetters({
      currentImage: 'procc/getHeadImage'
    }),
    isOnline (value) {
      return onlineHelper.isOnline
    }
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

  .card {
    border:none;
  }
  .card-header {
    border-radius: 50%;
    margin: auto;
    padding-bottom: 5%;
    float:end;
  }
  .card-header > img {
    border-radius: 50%;
  }
}
</style>
