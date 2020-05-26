<template>
  <div class="media-zoom-carousel">
    <div class="media-zoom-carousel__container row flex">
      <ul class="media-zoom-carousel__thumbs m0 p0" ref="thumbs">
        <li class="media-zoom-carousel__thumb bg-cl-secondary" v-for="(images, index) in gallery" :key="images.src">
          <product-image
            @click="navigate(index)"
            :image="images"
            :alt="productName | htmlDecode"
          />
        </li>
      </ul>
      <div class="media-zoom-carousel__gallery">
        <carousel
          :per-page="1"
          :mouse-drag="false"
          :navigation-enabled="true"
          pagination-active-color="#828282"
          pagination-color="transparent"
          navigation-next-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_right</i>"
          navigation-prev-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_left</i>"
          ref="zoomCarousel"
          class="media-zoom-carousel__carousel"
          :speed="carouselTransitionSpeed"
          @pageChange="pageChange"
          :navigate-to="currentPage"
        >
          <slide
            v-for="(images, index) in gallery"
            :key="images.src"
          >
            <div class="media-zoom-carousel__slide bg-cl-secondary"
                 :class="{'video-container h-100 flex relative': images.video}"
            >
              <product-gallery-image
                v-show="hideImageAtIndex !== index"
                :image="images"
                :alt="productName | htmlDecode"
                :is-active="index === currentPage"
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
      </div>
    </div>
  </div>
</template>

<script>
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import ProductImage from './ProductImage'
import ProductGalleryImage from './ProductGalleryImage'
import ProductVideo from './ProductVideo'

export default {
  name: 'ProductGalleryZoomCarousel',
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
      required: true
    }
  },
  data () {
    return {
      carouselTransitionSpeed: 300,
      currentPage: 0,
      hideImageAtIndex: null
    }
  },
  components: {
    'Carousel': () => import(/* webpackChunkName: "vue-carousel" */ 'vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import(/* webpackChunkName: "vue-carousel" */ 'vue-carousel').then(Slider => Slider.Slide),
    ProductImage,
    ProductGalleryImage,
    ProductVideo
  },
  mounted () {
    this.$nextTick(() => {
      disableBodyScroll(this.$refs.thumbs)
    })
    this.navigate(this.currentSlide)
    if (this.$refs.zoomCarousel) {
      let navigation = this.$refs.zoomCarousel.$children.find(c => c.$el.className === 'VueCarousel-navigation')
      let pagination = this.$refs.zoomCarousel.$children.find(c => c.$el.className === 'VueCarousel-pagination')
      if (navigation !== undefined) {
        navigation.$on('navigationclick', this.increaseCarouselTransitionSpeed)
      }
      if (pagination !== undefined) {
        pagination.$on('paginationclick', this.increaseCarouselTransitionSpeed)
      }
    }
  },
  beforeDestroy () {
    clearAllBodyScrollLocks()
  },
  methods: {
    navigate (index) {
      this.currentPage = index
    },
    increaseCarouselTransitionSpeed () {
      this.carouselTransitionSpeed = 500
    },
    pageChange (index) {
      this.hideImageAtIndex = null
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/animations/transitions';
.media-zoom-carousel {
  * {
    box-sizing: border-box;
  }

  &__container{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    padding: 20px;
    height: 750px;
    max-height: 100%;
    justify-content: space-evenly;

    @media (max-width: 767px){
      top: 50%;
      bottom: auto;
      height: auto;
      transform: translate3d(0, -50%, 0);
    }
  }

  &__thumbs{
    list-style: none;
    padding-right: 20px;
    width:100%;
    max-width: 140px;
    height: 100%;
    overflow: auto;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__thumb{
    margin-bottom: 20px;
    max-width: 100%;
    cursor: pointer;

    &:last-of-type {
      margin-bottom: 0;
    }

    & > *{
      opacity: .9;
      will-change: opacity;
      transition: .3s opacity $motion-main;

      &:hover{
        opacity: 1;
      }
    }
  }

  &__gallery{
    max-width: 600px;
    height: 100%;
    flex: 1;
    @media (max-width: 767px) {
      height: auto;
    }
  }

  &__carousel {
    height: 100%;
  }

  &__slide{
    height: 100%;
    max-height: 100%;
  }
}
.thumb-video{
  padding-bottom: calc(319% / (568 / 100));
}
.video-container {
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
.media-zoom-carousel {
  .VueCarousel-wrapper,
  .VueCarousel-inner,
  .VueCarousel-slide {
    height: 100%;
  }
}
</style>
