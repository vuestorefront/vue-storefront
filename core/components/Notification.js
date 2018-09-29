import { localizedRoute as localizedRouteHelper, currentStoreView } from '@vue-storefront/store/lib/multistore'

export default {
  name: 'Notification',
  data () {
    return {
      notifications: []
    }
  },
  created () {
    // TypeError: Cannot read property '$on' of undefined
    //
    // this.$bus.$on('notification', data => {
    //   if (this.notifications.length > 0 && this.notifications[this.notifications.length - 1].message === data.message) {
    //     return
    //   }
    //   this.notifications.push(data)
    //   setTimeout(() => {
    //     this.action('close', this.notifications.length - 1)
    //   }, data.timeToLive || 5000)
    // })
  },
  methods: {
    localizedRoute (routeObj) {
      const storeView = currentStoreView()
      return localizedRouteHelper(routeObj, storeView.storeCode)
    },
    action (action, id) {
      this.$bus.$emit('notification-after-' + action, id)
      switch (action) {
        case 'close':
          this.notifications.splice(id, 1)
          break
        case 'goToCheckout':
          this.$router.push(this.localizedRoute('/checkout'))
          this.notifications.splice(id, 1)
          break
      }
    }
  }
}
