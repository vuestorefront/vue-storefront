import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.component('Wishlist', {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  created () {
    this.$store.dispatch('wishlist/load') // Load wishlist from the indexedDb
  },
  methods: {
    closeWishlist () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setWishlist', false)
    },
    ...mapActions({ 'removeFromWishlist': 'wishlist/removeItem' })
  },
  computed: {
    items () {
      return this.$store.state.wishlist.itemsWishlist
    },
    ...mapState({
      isOpen: state => state.ui.wishlist
    })
  }
})
