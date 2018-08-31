<template>
  <div class="media-zoom">
    <i
      class="media-zoom__close material-icons p15 cl-bg-tertiary pointer"
      @click="$emit('close')"
    >close</i>
    <div class="media-zoom__container row flex">
      <ul class="media-zoom__thumbs m0 p0">
        <li class="media-zoom__thumb" v-for="(images, key) in gallery" :key="images.src">
          <span class="bg-cl-secondary block">
            <img :src="images.src" ref="images" @click="$refs.carousel.goToPage(key)" :alt="title | htmlDecode">
          </span>
        </li>
      </ul>
      <div class="media-zoom__gallery">
        <no-ssr>
          <carousel
            class="media-zoom__carousel"
            :per-page="1" :mouse-drag="false" :navigation-enabled="true" pagination-active-color="#828282" pagination-color="transparent" navigation-next-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_right</i>" navigation-prev-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_left</i>" ref="carousel">
            <slide v-for="images in gallery" :key="images.src">
              <div class="media-zoom__slide bg-cl-secondary">
                <img class="product-image pointer mw-100" :src="images.src" ref="images" :alt="title | htmlDecode" data-testid="productGalleryImage" itemprop="image">
              </div>
            </slide>
          </carousel>
        </no-ssr>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import NoSSR from 'vue-no-ssr'
export default {
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
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    'no-ssr': NoSSR,
    Carousel,
    Slide
  },
  mounted () {
    this.$store.commit('ui/setOverlay', true)
    this.$nextTick(() => {
      this.$refs.carousel.goToPage(this.current)
    })
  },
  destroyed () {
    this.$store.commit('ui/setOverlay', false)
  }
}
</script>
<style lang="scss">
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
    max-width: 750px;

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

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
