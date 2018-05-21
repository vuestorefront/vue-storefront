import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isOpen: state => state.ui.newsletterPopup
    })
  },
  methods: {
    newsletterClick () {
      this.$store.commit('ui/setNewsletterPopup', !this.isOpen)
    }
  }
}
