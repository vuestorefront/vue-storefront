<template>
  <div class="media-gallery relative" :class="{ 'open fixed bg-cl-primary': isZoomOpen }">
    <div :class="{ 'container product-zoom py40': isZoomOpen }">
      <div :class="{ row: isZoomOpen }">
        <i v-if="isZoomOpen" class="material-icons modal-close p15 cl-bg-tertiary pointer" @click="toggleZoom">close</i>
        <div class="col-md-2 thumbnails p0"
             v-if="isZoomOpen">
          <div
            class="bg-cl-secondary"
            v-for="(images, key) in gallery"
            :key="key">
            <transition name="fade" appear>
              <img v-lazy="images.path" class="mw-100 pointer" ref="images.path" @click="navigate(key)">
            </transition>
          </div>
        </div>
        <div :class="{ 'col-md-10' : isZoomOpen}">
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
                    v-lazy="images.path"
                    ref="images.path"
                    @dblclick="toggleZoom">
                </div>
              </slide>
            </carousel>
          </no-ssr>
          <i v-if="isZoomOpen==false" class="zoom-in material-icons p15 cl-bg-tertiary pointer" @click="toggleZoom">zoom_in</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import NoSSR from 'vue-no-ssr'

export default {
  mixins: [coreComponent('ProductGallery')],
  components: {
    'no-ssr': NoSSR
  }
}
</script>

<style lang="scss" scoped>
.media-gallery {
  text-align: center;
  &.open {
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
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
.thumbnails {
  div {
    margin: 0 20px 30px 0;
  }
  @media (max-width: 767px) {
    display: none;
  }
}
</style>
<style lang="scss">
.media-gallery {
  .VueCarousel-pagination {
    position: absolute;
    bottom: 0;
  }
  .VueCarousel-navigation-button {
    margin: 0;
    transform: translateY(-50%) !important;
  }
  .VueCarousel-navigation {
    opacity: 0;
  }

  .VueCarousel-dot--active .VueCarousel-dot-inner {
    border: 2px solid #828282;
    margin-top: -2px;
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
