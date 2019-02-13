<template>
  <div class="media-gallery-carousel">
    <product-gallery-overlay
      v-if="isZoomOpen"
      :current="$refs.carousel.currentPage"
      :product-name="productName"
      :gallery="gallery"
      @close="toggleZoom" />
    <carousel
      :per-page="1"
      :mouse-drag="false"
      :navigation-enabled="true"
      pagination-active-color="#828282"
      pagination-color="transparent"
      navigation-next-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_right</i>"
      navigation-prev-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_left</i>"
      ref="carousel"
      :speed="carouselTransitionSpeed"
    >
      <slide
        v-for="images in gallery"
        :key="images.src">
        <div class="bg-cl-secondary">
          <img
            class="product-image inline-flex pointer mw-100"
            v-lazy="images"
            ref="images"
            @dblclick="toggleZoom"
            :alt="productName | htmlDecode"
            data-testid="productGalleryImage"
            itemprop="image"
          >
        </div>
      </slide>
    </carousel>
    <i
      class="zoom-in material-icons p15 cl-bgs-tertiary pointer"
      @click="toggleZoom"
    >zoom_in</i>
  </div>
</template>

<script>
import store from '@vue-storefront/store'
import { Carousel, Slide } from 'vue-carousel'
import ProductGalleryOverlay from './ProductGalleryOverlay'

export default {
  name: 'ProductGalleryCarousel',
  props: {
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      carouselTransitionSpeed: 300,
      isZoomOpen: false
    }
  },
  components: {
    Carousel,
    Slide,
    ProductGalleryOverlay
  },
  beforeMount () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    this.selectVariant()
    document.addEventListener('keydown', this.handleEscKey)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.handleEscKey)
  },
  methods: {
    navigate (index) {
      if (this.$refs.carousel) {
        this.$refs.carousel.goToPage(index)
      }
    },
    selectVariant () {
      if (store.state.config.products.gallery.mergeConfigurableChildren) {
        let option = this.configuration[store.state.config.products.gallery.variantsGroupAttribute]
        if (typeof option !== 'undefined' && option !== null) {
          let index = this.gallery.findIndex(obj => obj.id && Number(obj.id) === Number(option.id))
          this.navigate(index)
        }
      }
    },
    toggleZoom () {
      this.isZoomOpen = !this.isZoomOpen
    },
    handleEscKey (event) {
      if (this.isZoomOpen && event.keyCode === 27) {
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
<style lang="scss">
.media-gallery {
  .VueCarousel-pagination {
    position: absolute;
    bottom: 15px;
    @media (max-width: 767px) {
      display: none;
    }
  }
  .VueCarousel-navigation-button {
    margin: 0;
    transform: translateY(-50%) !important;
  }
  .VueCarousel-slide {
    backface-visibility: unset;
  }
  .VueCarousel-navigation {
    opacity: 0;
    &--disabled {
      opacity: 0.3;
    }
  }
  .VueCarousel-dot {
    padding: 8px !important;
    button {
      border: 2px solid #828282;
    }
  }
  &:hover {
    .VueCarousel-navigation {
      opacity: .9;
    }
    .VueCarousel-navigation-button {
      transition: opacity 3s;
      &:after {
        background-color: transparent;
      }
    }
  }
}
</style>
