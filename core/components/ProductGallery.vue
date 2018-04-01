<template>
  <div class="media-gallery">
    <!-- SSR support needed here -->
    Core Media Gallery
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
  data () {
    return {
      isZoomOpen: false
    }
  },
  components: {
    Slide,
    Carousel
  },
  methods: {
    navigate (index) {
      this.$refs.carousel.goToPage(index)
    },
    toggleZoom () {
      this.isZoomOpen ? this.isZoomOpen = false : this.isZoomOpen = true
    }
  }
}
</script>
