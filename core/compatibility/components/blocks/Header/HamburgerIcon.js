import { mapState } from 'vuex'

// deprecated as theme specific
export default {
  name: 'HamburgerIcon',
  computed: mapState({
    isOpen: state => state.ui.sidebar
  }),
  methods: {
    openSidebarMenu () {
      this.$store.commit('ui/setSidebar', !this.isOpen)
    }
  }
}
