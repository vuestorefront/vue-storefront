<template>
  <div class="media-zoom-carousel__container row flex">
    <ul class="media-zoom-carousel__thumbs m0 p0">
      <li class="media-zoom-carousel__thumb" v-for="(images, key) in gallery" :key="images.src">
        <span class="bg-cl-secondary block">
          <img :src="images.src" ref="images" @click="navigate(key)" :alt="productName | htmlDecode">
        </span>
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
              :alt="productName | htmlDecode"
              data-testid="productGalleryImage"
              itemprop="image"
            >
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'ProductGalleryZoomCarousel',
  props: {
    current: {
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
      carouselTransitionSpeed: 300
    }
  },
  components: {
    Carousel,
    Slide
  },
  mounted () {
    this.navigate(this.current)
  },
  methods: {
    navigate (key) {
      this.$refs.zoomCarousel.goToPage(key)
    }
  }
}
</script>

<style lang="scss">
@import '~theme/css/base/global_vars';

.media-zoom-carousel {
  * {
    box-sizing: border-box;
  }

  &__container {
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

    @media (max-width: 767px) {
      top: 50%;
      transform: translateY(-50%);
      bottom: auto;
      height: auto;
    }
  }

  &__thumbs {
    list-style: none;
    padding-right: 20px;
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

  &__thumb {
    margin-bottom: 20px;
    max-width: 100%;
    cursor: pointer;

    &:last-of-type {
      margin-bottom: 0;
    }

    img {
      display: block;
      max-width: 100%;
      width: auto;
      mix-blend-mode: multiply;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__gallery {
    max-width: 600px;
    height: 100%;
    flex: 1;

    @media (max-width: 767px) {
      height: auto;
    }
  }

  &__carousel,
  .VueCarousel-wrapper,
  .VueCarousel-inner,
  .VueCarousel-slide {
    height: 100%;
  }

  &__slide {
    height: 100%;
    max-height: 100%;

    img {
      max-height: 100%;
      mix-blend-mode: multiply;
      max-width: 100%;
      height: auto;
      align-self: center;
      margin: 0 auto;
    }
  }

}
</style>
