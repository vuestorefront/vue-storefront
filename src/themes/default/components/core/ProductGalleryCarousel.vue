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
      :navigate-to="currentPage"
    >
      <slide
        v-for="(images, index) in gallery"
        :key="images.src"
      >
        <div
          class="product-image-container bg-cl-secondary"
          :class="{'video-container w-100 h-100 flex relative': images.video}"
        >
          <product-image
            v-show="hideImageAtIndex !== index"
            @dblclick="openOverlay"
            class="pointer image"
            :image="images"
            :alt="productName | htmlDecode"
          />
          <product-video
            v-if="images.video && (index === currentPage)"
            v-bind="images.video"
            :index="index"
            @video-started="onVideoStarted"
          />
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
import config from 'config'
import ProductImage from './ProductImage'
import ProductVideo from './ProductVideo'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'

export default {
  name: 'ProductGalleryCarousel',
  components: {
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
    ProductImage,
    ProductVideo
  },
  props: {
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      default: ''
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
      hideImageAtIndex: null
    }
  },
  computed: {},
  beforeMount () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    this.selectVariant()

    if (this.configuration.color) {
      const { color } = this.configuration
      this.currentColor = color.id
    }

    this.$emit('loaded')
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-product', this.selectVariant)
    this.$bus.$off('product-after-load', this.selectVariant)
  },
  methods: {
    navigate (index) {
      this.currentPage = index
    },
    async selectVariant (configuration) {
      await this.$nextTick()
      if (config.products.gallery.mergeConfigurableChildren) {
        const option = reduce(map(this.configuration, 'attribute_code'), (result, attribute) => {
          result[attribute] = this.configuration[attribute].id
          return result
        }, {})
        if (option) {
          let index = this.gallery.findIndex(
            obj => obj.id && Object.entries(obj.id).toString() === Object.entries(option).toString(), option)
          if (index < 0) index = this.gallery.findIndex(obj => obj.id && obj.id.color === option.color)
          this.navigate(index)
        }
      }

      this.$emit('close')
    },
    openOverlay () {
      const currentSlide = this.$refs.carousel.currentPage
      this.$emit('toggle', currentSlide)
    },
    switchCarouselSpeed () {
      const { color } = this.configuration
      if (color && this.currentColor !== color.id) {
        this.currentColor = color.id
        this.carouselTransitionSpeed = 0
      } else {
        this.carouselTransitionSpeed = 500
      }
    },
    pageChange (index) {
      this.switchCarouselSpeed()
      this.hideImageAtIndex = null
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
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
.image{
  opacity: 1;
  will-change: opacity;
  transition: .3s opacity $motion-main;
  &:hover{
    opacity: .9;
  }
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
      display: none;
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
