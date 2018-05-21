import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.component('Newsletter', {
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
})
