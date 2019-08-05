<template>
  <div id="home" class="t-container t-p-4">
    <div class="t-min-h-screen">
      <h1>Homepage</h1>
      <p>Work in progress …</p>
    </div>
  </div>
</template>

<script>
import config from 'config'
import { mapGetters } from 'vuex'
import { onlineHelper } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
  },
  created () {
    this.$store.dispatch('checkout/load')
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) this.$bus.$emit('modal-show', 'modal-signup')
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect')
      if (redirectObj) this.$router.push(redirectObj)
      localStorage.removeItem('redirect')
    }
  }
}
</script>
