import { Search } from '@vue-storefront/core/modules/catalog/components/Search'

// Moved to search module
export default {
  mixins: [Search],
  data () {
    return {
      componentLoaded: false
    }
  },
  computed: {
    showPanel () {
      return this.isOpen && this.componentLoaded
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  }
}
