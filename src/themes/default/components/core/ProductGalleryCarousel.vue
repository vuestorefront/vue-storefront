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
        <div class="bg-cl-secondary" :class="{'video-container h-100 flex relative': images.video}">
          <img
            v-show="hideImageAtIndex !== index"
            class="product-image inline-flex pointer mw-100"
            v-lazy="images"
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
      carouselTransitionSpeed: 0,
      currentPage: 0,
      hideImageAtIndex: null
    }
  },
  components: {
    Carousel,
    Slide,
    ProductVideo
  },
  beforeMount () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    this.selectVariant()
    if (this.$refs.carousel) {
      let navigation = this.$refs.carousel.$children.find(c => c.$el.className === 'VueCarousel-navigation')
      let pagination = this.$refs.carousel.$children.find(c => c.$el.className === 'VueCarousel-pagination')
      if (navigation !== undefined) {
        navigation.$on('navigationclick', this.increaseCarouselTransitionSpeed)
      }
      if (pagination !== undefined) {
        pagination.$on('paginationclick', this.increaseCarouselTransitionSpeed)
      }
    }
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
    increaseCarouselTransitionSpeed () {
      this.carouselTransitionSpeed = 500
    },
    pageChange (index) {
      this.currentPage = index
      this.hideImageAtIndex = null
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
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
