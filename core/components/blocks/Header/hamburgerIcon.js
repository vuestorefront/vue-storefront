import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.component('HamburgerIcon', {
  name: 'HamburgerIcon',
  computed: mapState({
    isOpen: state => state.ui.sidebar
  }),
  methods: {
    openSidebarMenu () {
      this.$store.commit('ui/setSidebar', !this.isOpen)
    }
  }
})
