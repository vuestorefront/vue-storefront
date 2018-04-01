<template>
  <div class="media-gallery" :class="{ open: isZoomOpen }">
    <div class="inner" :class="{ container: isZoomOpen }">
      <div :class="{ row: isZoomOpen }">
        <i v-if="isZoomOpen" class="material-icons modal-close p15 cl-bg-tertiary" @click="toggleZoom">close</i>
        <div class="col-xs-2 thumbnails"
             v-if="isZoomOpen">
          <div
            v-for="(images, key) in gallery"
            :key="key">
            <transition name="fade" appear>
              <img v-lazy="images.path" class="mw-100 pointer" ref="images.path" @click="navigate(key)">
            </transition>
          </div>
        </div>
        <div :class="{ 'col-xs-10' : isZoomOpen}">
          <carousel
            :per-page="1"
            mouse-drag="false"
            navigation-enabled="true"
            navigation-next-label="<i class='material-icons'>keyboard_arrow_right</i>"
            navigation-prev-label="<i class='material-icons'>keyboard_arrow_left</i>"
            ref="carousel">
            <slide
              v-for="(images, key) in gallery"
              :key="key">
              <transition name="fade" appear>
                <img
                  class="product-image inline-flex pointer"
                  v-lazy="images.path"
                  ref="images.path"
                  @dblclick="toggleZoom">
              </transition>
            </slide>
          </carousel>
          <i v-if="isZoomOpen==false" class="zoom-in material-icons p15 cl-bg-tertiary" @click="toggleZoom">zoom_in</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('ProductGallery')]
}
</script>

<style lang="scss" scoped>
.media-gallery {
  text-align: left;
  position: relative;
  &.open {
    position: fixed;
    text-align: center;
    background-color: white;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .zoom-in {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .thumbnails {
    padding-right: 30px;
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
    opacity: 0;
    transform: translateY(-50%) !important;
  }
  &:hover {
    .VueCarousel-navigation-button {
      opacity: .9;
      transition: opacity 3s;
    }
  }
}
</style>
