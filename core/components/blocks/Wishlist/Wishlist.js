import { mapActions, mapState } from 'vuex'

export default {
  name: 'Wishlist',
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
    ...mapState('wishlist', [
      'items'
    ]),
    ...mapState({
      isOpen: state => state.ui.wishlist
    })
  }
}
