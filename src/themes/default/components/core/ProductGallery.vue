<template>
  <div class="media-gallery">
    <product-gallery-zoom
      v-if="isZoomOpen"
      :current="$refs.carousel.currentPage"
      :title="product.name"
      :gallery="gallery"
      @close="toggleZoom"/>
    <div v-show="OfflineOnly">
      <img class="offline-image" v-lazy="offline" :src="offline.src" ref="offline" alt="">
    </div>
    <div v-show="OnlineOnly">
      <div class="relative">
        <div v-if="gallery.length === 1">
          <img
            :src="defaultImage.src"
            v-lazy="defaultImage"
            class="mw-100 pointer"
            ref="defaultImage"
            :alt="product.name | htmlDecode"
            itemprop="image"
          >
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
              :speed="carouselTransitionSpeed"
              @pageChange="clearVideo"
            >
              <slide
                v-for="(images, index) in gallery"
                :key="images.src">
                <div class="bg-cl-secondary" :class="{'video-container h-100 flex relative': images.video}">
                  <img
                    v-show="videoStarted !== index"
                    class="product-image inline-flex pointer mw-100"
                    v-lazy="images"
                    ref="images"
                    @dblclick="toggleZoom"
                    :alt="product.name | htmlDecode"
                    data-testid="productGalleryImage"
                    itemprop="image"
                  >
                  <div
                    v-if="images.video"
                    v-show="videoStarted !== index"
                    class="gallery-video absolute w-100 h-100"
                    @click="videoStarted = index"
                  >
                    <i class="material-icons absolute">play_circle_outline</i>
                  </div>
                  <div v-if="videoStarted === index" class="iframe-wrapper absolute w-100">
                    <LoaderScoped v-if="!iframeLoaded"/>
                    <div class="iframe-container w-100">
                      <iframe
                        v-if="images.video.type === 'vimeo'"
                        class="absolute w-100 h-100"
                        :src="`https://player.vimeo.com/video/${images.video.id}?autoplay=1`"
                        webkitallowfullscreen mozallowfullscreen allowfullscreen
                        @load="iframeIsLoaded()"/>
                      <iframe
                        v-else-if="images.video.type === 'youtube'"
                        class="absolute w-100 h-100"
                        :src="`https://www.youtube.com/embed/${images.video.id}?autoplay=1`"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        webkitallowfullscreen mozallowfullscreen allowfullscreen
                        @load="iframeIsLoaded()"/>
                    </div>
                  </div>
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
import LoaderScoped from 'theme/components/core/LoaderScoped.vue'
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery.ts'
import ProductGalleryZoom from './ProductGalleryZoom'
import NoSSR from 'vue-no-ssr'
import VueOfflineMixin from 'vue-offline/mixin'

export default {
  components: {
    'no-ssr': NoSSR,
    ProductGalleryZoom,
    LoaderScoped
  },
  mixins: [ProductGallery, VueOfflineMixin],
  watch: {
    '$route': 'validateRoute'
  },
  data () {
    return {
      loaded: true,
      carouselTransitionSpeed: 0,
      videoStarted: null,
      iframeLoaded: false
    }
  },
  methods: {
    validateRoute () {
      this.$forceUpdate()
    },
    initVideo (index) {
      this.videoStarted = index
    },
    clearVideo () {
      this.videoStarted = null
      this.iframeLoaded = false
    },
    iframeIsLoaded () {
      this.iframeLoaded = true
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

.video-container {
  align-items: center;
  justify-content: center;

  .gallery-video {
    top: 0;

    > .material-icons {
      left: 0;
      right: 0;
      color: #fff;
      font-size: 120px;
      top: calc( 50% - 60px);
      transition: transform ease 0.3s;
    }

    &:hover {
      cursor: pointer;

      > .material-icons {
        transform: scale(1.1);
      }
    }
  }

  .iframe-wrapper {
    left: 0;

    .iframe-container {
      padding-top: 56.25%;

      iframe {
        top: 0;
        left: 0;
        border: none;
      }
    }
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
