import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.component('WishlistIcon', {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.ui.wishlist
    })
  },
  methods: {
    toggleWishlistPanel () {
      this.$store.commit('ui/setWishlist', !this.isOpen)
    }
  }
})
