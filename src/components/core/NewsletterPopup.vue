<template>
  <div class="newsletter">
    Core newsletter
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'newsletter-popup',
  computed: {
    ...mapState({
      isOpen: state => state.ui.newsletterPopup
    })
  },
  methods: {
    closeNewsletter () {
      this.$store.commit('ui/setNewsletterPopup', false)
    }
  }
}
</script>
