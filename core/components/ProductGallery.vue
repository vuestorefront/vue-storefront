<template>
  <div class="media-gallery">
    <!-- SSR support needed here -->
    Core Media Gallery
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import config from 'config'
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
      isZoomOpen: false
    }
  },
  components: {
    Slide,
    Carousel
  },
  methods: {
    navigate (index) {
      if (this.$refs.carousel && index) {
        this.$refs.carousel.goToPage(index)
      }
    },
    selectVariant () {
      let option = this.configuration[config.products.galleryVariantsGroupAttribute].id
      // let index = this.gallery.findIndex(obj => JSON.stringify(obj.options) === JSON.stringify(this.getCurrentOptions()))
      let index = this.gallery.findIndex(obj => Number(obj.id) === Number(option))
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
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    setTimeout(() => {
      this.selectVariant()
    }, 0)
  }
}
</script>
