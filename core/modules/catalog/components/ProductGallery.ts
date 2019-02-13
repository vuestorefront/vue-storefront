import VueOffline from 'vue-offline'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'

export const ProductGallery = {
  name: 'ProductGallery',
  components: {
    VueOffline
  },
  mixins: [onEscapePress],
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
  computed: {
    defaultImage () {
      return this.gallery.length ? this.gallery[0] : false
    }
  },
  methods: {
    toggleZoom () {
      this.isZoomOpen = !this.isZoomOpen
    },
    onEscapePress () {
      if (this.isZoomOpen) {
        this.toggleZoom()
      }
    }
  }
}
