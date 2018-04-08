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
    reset () {
      this.navigate(0)
    },
    toggleZoom () {
      this.isZoomOpen ? this.isZoomOpen = false : this.isZoomOpen = true
      this.navigate(this.$refs.carousel.currentPage)
    },
    selectVariant (option) {
      for (let prop of this.gallery) {
        if (prop.options) {
          let index = this.gallery.findIndex(obj => parseInt(obj.options[option.attribute_code]) === option.id)
          this.navigate(index)
        }
      }
    }
  },
  created () {
    this.$bus.$on('filter-changed-product', this.selectVariant.bind(this))
    this.$bus.$on('product-after-load', this.reset)
  }
}
</script>
