<template>
  <div class="media-gallery-carousel">
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
      @pageChange="pageChange"
    >
      <slide
        v-for="(images, index) in gallery"
        :key="images.src">
        <div class="product-image-container bg-cl-secondary" :class="{'video-container w-100 h-100 flex relative': images.video}">
          <img
            v-show="placeholderImagesMap[index]"
            key="placeholderImage"
            class="inline-flex mw-100"
            src="/assets/placeholder.svg"
            ref="images"
            :alt="productName | htmlDecode"
          >
          <img
            v-if="!lowerQualityImagesErrorsMap[index] || isOnline"
            v-show="lowerQualityImagesMap[index]"
            key="lowQualityImage"
            class="product-image inline-flex mw-100"
            :src="images.loading"
            @load="lowerQualityImageLoaded(index, true)"
            @error="lowerQualityImageLoaded(index, false)"
            ref="images"
            :alt="productName | htmlDecode"
            data-testid="productGalleryImage"
            itemprop="image"
          >
          <img
            v-if="!highQualityImagesErrorsMap[index] || isOnline"
            v-show="highQualityImagesLoadedMap[index]"
            key="highQualityImage"
            :src="images.src"
            @load="highQualityImageLoaded(index, true)"
            @error="highQualityImageLoaded(index, false)"
            class="product-image inline-flex pointer mw-100"
            ref="images"
            @dblclick="openOverlay"
            :alt="productName | htmlDecode"
            data-testid="productGalleryImage"
            itemprop="image"
          >
          <product-video
            v-if="images.video && (index === currentPage)"
            v-bind="images.video"
            :index="index"
            @video-started="onVideoStarted"/>
        </div>
      </slide>
    </carousel>
    <i
      class="zoom-in material-icons p15 cl-bgs-tertiary pointer"
      @click="openOverlay"
    >zoom_in</i>
  </div>
</template>

<script>
import store from '@vue-storefront/core/store'
import { Carousel, Slide } from 'vue-carousel'
import ProductVideo from './ProductVideo'
import { onlineHelper } from '@vue-storefront/core/helpers'

export default {
  name: 'ProductGalleryCarousel',
  components: {
    Carousel,
    Slide,
    ProductVideo
  },
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
      carouselTransition: true,
      carouselTransitionSpeed: 0,
      currentColor: 0,
      currentPage: 0,
      hideImageAtIndex: null,
      lowerQualityImagesLoadedMap: {},
      highQualityImagesLoadedMap: {},
      lowerQualityImagesErrorsMap: {},
      highQualityImagesErrorsMap: {}
    }
  },
  watch: {
    configuration: {
      handler (value) {
        this.carouselTransition = false
      },
      deep: true
    }
  },
  computed: {
    placeholderImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !this.lowerQualityImagesLoadedMap[index] && !this.highQualityImagesLoadedMap[index]
      })
      return visibilityMap
    },
    lowerQualityImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !!this.lowerQualityImagesLoadedMap[index] && !this.highQualityImagesLoadedMap[index] && this.hideImageAtIndex !== index
      })
      return visibilityMap
    },
    highQualityImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !!this.highQualityImagesLoadedMap[index] && this.hideImageAtIndex !== index
      })
      return visibilityMap
    },
    isOnline () {
      return onlineHelper.isOnline
    }
  },
  beforeMount () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    this.selectVariant()

    const {color} = this.configuration
    this.currentColor = color.id

    this.$emit('loaded')
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-product', this.selectVariant)
    this.$bus.$off('product-after-load', this.selectVariant)
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
    openOverlay () {
      const currentSlide = this.$refs.carousel.currentPage
      this.$emit('toggle', currentSlide)
    },
    switchCarouselSpeed () {
      const {color} = this.configuration
      if (color && this.currentColor !== color.id) {
        this.currentColor = color.id
        this.carouselTransitionSpeed = 0
      } else {
        this.carouselTransitionSpeed = 500
      }
    },
    pageChange (index) {
      this.switchCarouselSpeed()

      this.currentPage = index
      this.hideImageAtIndex = null
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    },
    lowerQualityImageLoaded (index, success = true) {
      this.$set(this.lowerQualityImagesLoadedMap, index, success)
      this.$set(this.lowerQualityImagesErrorsMap, index, !success)
    },
    highQualityImageLoaded (index, success = true) {
      this.$set(this.highQualityImagesLoadedMap, index, success)
      this.$set(this.highQualityImagesErrorsMap, index, !success)
    }
  }
}
</script>

<style lang="scss" scoped>
.media-gallery-carousel {
  position: relative;
  text-align: center;
  height: 100%;
}
.zoom-in {
  position: absolute;
  bottom: 0;
  right: 0;
}
.product-image-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.product-image {
  width: 100%;
  height: auto;
}
img {
  opacity: 1;
  mix-blend-mode: multiply;
  vertical-align: top;
  &:hover {
    opacity: 0.9;
  }
}
img[lazy=error] {
  width: 100%;
}
img[lazy=loading] {
  width: 100%;
}
img[lazy=loaded] {
  -webkit-animation: none;
  animation: none;
}

.video-container {
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
.media-gallery-carousel,
.media-zoom-carousel {
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
