import { mapActions, mapState } from 'vuex'
import onEscapePress from 'core/mixins/onEscapePress'

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
    onEscapePress () {
      this.closeWishlist()
    },
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
  },
  mixins: [onEscapePress]
}
