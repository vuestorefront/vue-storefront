import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.component('SearchIcon', {
  computed: {
    ...mapState({
      isOpen: state => state.ui.searchpanel
    })
  },
  methods: {
    toggleSearchpanel () {
      this.$bus.$emit('focusSearchInput')
      this.$store.commit('ui/setSearchpanel', !this.isOpen)
    }
  }
})
