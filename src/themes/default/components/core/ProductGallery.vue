<template>
  <div class="media-gallery relative" :class="{ 'open fixed bg-cl-primary': isZoomOpen }">
    <div v-show="OfflineOnly">
      <transition name="fade" appear>
        <img class="offline-image" v-lazy="offline" ref="offline">
      </transition>
    </div>
    <i v-if="isZoomOpen" v-show="OnlineOnly" class="material-icons modal-close p15 cl-bg-tertiary pointer" @click="toggleZoom">close</i>
    <div v-show="OnlineOnly" :class="{ 'container product-zoom py40': isZoomOpen }">
      <div :class="{ row: isZoomOpen }">
        <div class="scroll col-md-2  p0" v-if="isZoomOpen">
          <div class="thumbnails">
            <div
              class="bg-cl-secondary"
              v-for="(images, key) in gallery"
              :key="key">
              <transition name="fade" appear>
                <img v-lazy="images" class="mw-100 pointer" ref="images" @click="navigate(key)">
              </transition>
            </div>
          </div>
        </div>
        <div v-if="gallery.length === 1">
          <transition name="fade" appear>
            <img v-lazy="gallery[0].src" class="mw-100 pointer" ref="gallery[0].src">
          </transition>
        </div>
        <div v-else :class="{ 'col-md-10' : isZoomOpen}">
          <no-ssr>
            <carousel
              :per-page="1"
              :mouse-drag="false"
              :navigation-enabled="true"
              pagination-active-color="transparent"
              pagination-color="#828282"
              navigation-next-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_right</i>"
              navigation-prev-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_left</i>"
              ref="carousel">
              <slide
                v-for="(images, key) in gallery"
                :key="key">
                <div class="bg-cl-secondary">
                  <img
                    class="product-image inline-flex pointer mw-100"
                    v-lazy="images"
                    ref="images"
                    @dblclick="toggleZoom">
                </div>
              </slide>
            </carousel>
          </no-ssr>
          <i v-if="isZoomOpen === false" class="zoom-in material-icons p15 cl-bg-tertiary pointer" @click="toggleZoom">zoom_in</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGallery from 'core/components/ProductGallery'
import NoSSR from 'vue-no-ssr'

export default {
  mixins: [ProductGallery],
  components: {
    'no-ssr': NoSSR
  },
  data () {
    return {
      loaded: true
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
.product-zoom {
  max-width: 750px;
}
.zoom-in {
  position: absolute;
  bottom: 0;
  right: 0;
}
img {
  opacity: 0.9;
  mix-blend-mode: multiply;
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
.scroll {
  height: 747px;
  overflow: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
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
