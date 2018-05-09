<template>
  <div class="media-gallery">
    <!-- SSR support needed here -->
    Core Media Gallery
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import VueOffline from 'vue-offline'
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
    },
    offline: {
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
    Carousel,
    VueOffline
  },
  methods: {
    navigate (index) {
      if (this.$refs.carousel) {
        this.$refs.carousel.goToPage(index)
      }
    },
    selectVariant () {
      let option = this.configuration[config.products.galleryVariantsGroupAttribute]
      if (typeof option !== 'undefined' && option !== null) {
        let index = this.gallery.findIndex(obj => obj.id && Number(obj.id) === Number(option.id))
        this.navigate(index)
      }
      this.$forceUpdate()
    },
    toggleZoom () {
      this.isZoomOpen ? this.isZoomOpen = false : this.isZoomOpen = true
      setTimeout(() => {
        this.navigate(this.$refs.carousel.currentPage)
      }, 1)
    }
  },
  created () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    setTimeout(() => {
      this.selectVariant()
      this.$forceUpdate()
    }, 0)
  }
}
</script>
