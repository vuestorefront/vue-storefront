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
      if (this.$refs.carousel) {
        this.$refs.carousel.goToPage(index)
      }
    },
    selectVariant () {
      console.log(this.gallery)
      let option = this.configuration[config.products.galleryVariantsGroupAttribute].id
      let index = this.gallery.findIndex(obj => Number(obj.id) === Number(option))
      this.navigate(index)
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
