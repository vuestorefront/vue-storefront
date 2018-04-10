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
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isZoomOpen: false,
      singlePhoto: this.gallery.length === 1,
      slideOptions: [],
      currentOptions: this.getCurrentOptions()
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
    selectVariant () {
      this.currentOptions = this.getCurrentOptions()
      let index = this.gallery.findIndex(obj => JSON.stringify(obj.options) === JSON.stringify(this.currentOptions))
      this.navigate(index)
    },
    getCurrentOptions () {
      let options = []
      Object.keys(this.configuration).forEach((e) => {
        options.push(String(this.configuration[e].id))
      })
      return options
    },
    toggleZoom () {
      this.isZoomOpen ? this.isZoomOpen = false : this.isZoomOpen = true
      this.navigate(this.$refs.carousel.currentPage)
    }
  },
  created () {
    console.log(this.gallery)
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  }
}
</script>
