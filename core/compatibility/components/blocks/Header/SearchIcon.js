import { mapState } from 'vuex'

export default {
  name: 'SearchIcon',
  computed: {
    ...mapState({
      isOpen: state => state.ui.searchpanel
    })
  },
  methods: {
    toggleSearchpanel () {
      this.$store.commit('ui/setSearchpanel', !this.isOpen)
    }
  }
}
