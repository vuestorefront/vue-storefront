<template>
  <div class="newsletter">
    Core newsletter
  </div>
</template>
<script>
export default {
  name: 'newsletter-popup',
  methods: {
    closeNewsletter () {
      this.$store.commit('ui/setNewsletterPopup', false)
    }
  }
}
</script>
