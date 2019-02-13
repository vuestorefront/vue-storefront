import VueOffline from 'vue-offline'
import store from '@vue-storefront/store'

export const ProductGallery = {
  name: 'ProductGallery',
  components: {
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
    },
    product: {
      type: Object,
      required: true
    }
  },
  beforeMount () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    this.$forceUpdate()
    document.addEventListener('keydown', this.handleEscKey)
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-product', this.selectVariant)
    this.$bus.$off('product-after-load', this.selectVariant)
    document.removeEventListener('keydown', this.handleEscKey)
  },
  computed: {
    defaultImage () {
      return this.gallery.length ? this.gallery[0] : false
    }
  },
  methods: {
    toggleZoom () {
      this.isZoomOpen = !this.isZoomOpen
    },
    handleEscKey (event) {
      if (this.isZoomOpen && event.keyCode === 27) {
        this.toggleZoom()
      }
    }    
  }
}
