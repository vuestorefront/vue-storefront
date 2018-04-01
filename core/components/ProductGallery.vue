<template>
  <!-- Move in default theme -->
  <div class="row">
    <div class="col-xs-2">
      <div
        v-for="(images, key) in gallery"
        :key="key">
        <transition name="fade" appear>
          <img v-lazy="images.path" class="mw-100" ref="images.path" @click="navigate(key)">
        </transition>
      </div>
    </div>
    <div class="col-xs-10">
      <carousel
        pagination-active-color="#828282"
        pagination-color="#fff"
        :per-page="1"
        mouse-drag="false"
        ref="carousel">
        <slide
          v-for="(images, key) in gallery"
          :key="key">
          <transition name="fade" appear>
            <!-- SSR support needed here -->
            <img class="product-image inline-flex mw-100" v-lazy="images.path" ref="images.path">
          </transition>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'ProductGallery',
  props: {
    gallery: {
      type: Array,
      required: true
    }
  },
  components: {
    Slide,
    Carousel
  },
  methods: {
    navigate (index) {
      this.$refs.carousel.goToPage(index)
    }
  }
}
</script>
