<template>
  <div id='hp'>
    Core Home
  </div>
</template>

<script>
import Meta from 'src/lib/meta'
import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'
import EventBus from 'src/event-bus/event-bus'

export default {
  name: 'Home',
  meta: {
    title: 'Home Page'
  },
  beforeMount () {
    this.$store.dispatch('category/reset')

    if (global.__DEMO_MODE__) {
      this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' }).then((onboardingClaim) => {
        if (!onboardingClaim) { // show onboarding info
          EventBus.$emit('notification', {
            type: 'success',
            message: 'Welcome to Vue Storefront v. ' + global.__VERSION__ + '! This is early PoC preview, please forgive us that not every feature is working yet :-)',
            action1: { label: 'OK', action: 'close' }
          })
          EventBus.$emit('notification', {
            type: 'success',
            message: 'Some features You should check: Category page, Product page, Shopping cart, Checkout, Offline support, Mobile version + PWA features (service workers, installing on Home Screen)',
            action1: { label: 'OK', action: 'close' }
          })
          EventBus.$emit('notification', {
            type: 'success',
            message: 'This demo is synchronized (products, categories and orders) with Magento2 instance: http://demo-magento2.vuestorefront.io',
            action1: { label: 'OK', action: 'close' }
          })

          this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
        }
      })
    }
  },
  components: {
    ProductTile,
    MainSlider
  },
  mixins: [Meta]
}
</script>

<style scoped>

</style>
