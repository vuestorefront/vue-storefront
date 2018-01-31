<template>
  <div class="newsletter">
    Core newsletter
  </div>
</template>
<script>
export default {
  name: 'NewsletterPopup',
  methods: {
    closeNewsletter () {
      this.$store.commit('ui/setNewsletterPopup', false)
    }
  }
}
</script>
