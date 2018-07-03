import { Carousel, Slide } from 'vue-carousel'
import VueOffline from 'vue-offline'
import config from 'config'

export default {
  name: 'ProductGallery',
  components: {
    Slide,
    Carousel,
    VueOffline
  },
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
  created () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    setTimeout(() => {
      this.selectVariant()
      this.$forceUpdate()
    }, 0)
    document.addEventListener('keydown', this.handleEscKey)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.handleEscKey)
  },
  computed: {
    defaultImage () {
      return this.gallery.length ? this.gallery[0] : false
    }
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
    },
    handleEscKey (event) {
      if (this.isZoomOpen && event.keyCode === 27) {
        this.toggleZoom()
      }
    }
  }
}
