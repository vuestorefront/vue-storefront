<template>
  <div class="media-zoom">
    <div class="media-zoom__container row flex">
      <div class="h-100">
        <ul class="media-zoom__thumbs m0 p0">
          <li class="media-zoom__thumb" v-for="(images, key) in gallery" :key="images.src" :style="thumbStyle">
            <span class="bg-cl-secondary block h-100">
              <img v-lazy="images" ref="images" @click="navigate(key)" :alt="product.name | htmlDecode">
            </span>
          </li>
        </ul>
      </div>
      <div class="media-zoom__gallery">
        <no-ssr>
          <carousel
            class="media-zoom__carousel"
            :per-page="1" :mouse-drag="false" :navigation-enabled="true" pagination-active-color="#828282" pagination-color="transparent" navigation-next-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_right</i>" navigation-prev-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_left</i>" ref="carousel">
            <slide v-for="images in gallery" :key="images.src">
              <div class="media-zoom__slide bg-cl-secondary">
                <img class="product-image pointer mw-100" v-lazy="images" ref="images" @dblclick="toggleZoom" :alt="product.name | htmlDecode" data-testid="productGalleryImage" itemprop="image">
              </div>
            </slide>
          </carousel>
        </no-ssr>
      </div>
    </div>
  </div>
</template>
<script>
import ProductGallery from '@vue-storefront/core/components/ProductGallery'
import NoSSR from 'vue-no-ssr'
export default {
  mixins: [ProductGallery],
  components: {
    'no-ssr': NoSSR
  },
  computed: {
    thumbStyle () {
      return {
        height: `${100 / this.gallery.length}%`
      }
    }
  },
  mounted () {
    this.$store.commit('ui/setOverlay', true)
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
    // max-height: 750px;
    height: 750px;
    max-height: 100%;
    max-width: 750px;
  }

  &__thumbs {
    margin: -10px 0;
    list-style: none;
    padding-right: 20px;
    max-width: 160px;
  }

  &__thumb {
    padding: 10px 0;
    max-width: 100%;
    // height: 100%;
    // max-height: 150px;

    img {
      height: 100%;
      mix-blend-mode: multiply;
    }
  }

  &__gallery {
    height: 100%;
    flex: 1;
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
    // display: inline-flex;

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
