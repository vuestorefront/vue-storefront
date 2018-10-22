<template>
  <div class="media-gallery">
    <product-gallery-zoom
      v-if="isZoomOpen"
      :current="$refs.carousel.currentPage"
      :title="product.name"
      :gallery="gallery"
      @close="toggleZoom"/>
    <div v-show="OfflineOnly">
      <transition name="fade" appear>
        <img class="offline-image" v-lazy="offline" :src="offline.src" ref="offline" alt="">
      </transition>
    </div>
    <div v-show="OnlineOnly">
      <div class="relative">
        <div v-if="gallery.length === 1">
          <transition name="fade" appear>
            <img
              :src="defaultImage.src"
              v-lazy="defaultImage"
              class="mw-100 pointer"
              ref="defaultImage"
              :alt="product.name | htmlDecode"
              itemprop="image"
            >
          </transition>
        </div>
        <div v-else>
          <no-ssr>
            <carousel
              :per-page="1"
              :mouse-drag="false"
              :navigation-enabled="true"
              pagination-active-color="#828282"
              pagination-color="transparent"
              navigation-next-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_right</i>"
              navigation-prev-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_left</i>"
              ref="carousel"
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
                    :alt="product.name | htmlDecode"
                    data-testid="productGalleryImage"
                    itemprop="image"
                  >
                </div>
              </slide>
            </carousel>
          </no-ssr>
          <i
            class="zoom-in material-icons p15 cl-bgs-tertiary pointer"
            @click="toggleZoom"
          >zoom_in</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGallery from '@vue-storefront/core/components/ProductGallery'
import ProductGalleryZoom from './ProductGalleryZoom'
import NoSSR from 'vue-no-ssr'
import VueOfflineMixin from 'vue-offline/mixin'

export default {
  components: {
    'no-ssr': NoSSR,
    ProductGalleryZoom
  },
  mixins: [ProductGallery, VueOfflineMixin],
  watch: {
    '$route': 'validateRoute'
  },
  data () {
    return {
      loaded: true
    }
  },
  methods: {
    validateRoute () {
      this.$forceUpdate()
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
