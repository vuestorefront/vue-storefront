import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
// deprecated moved to store
export default {
  name: 'Notification',
  data () {
    return {
      notifications: []
    }
  },
  beforeMount () {
    EventBus.$on('notification', this.onNotification)
  },
  beforeDestroy () {
    EventBus.$off('notification', this.onNotification)
  },
  methods: {
    onNotification (data) {
      if (this.notifications.length > 0 && this.notifications[this.notifications.length - 1].message === data.message) {
        return
      }
      this.notifications.push(data)

      if (!data.hasNoTimeout) {
        setTimeout(() => {
          this.action('close', this.notifications.length - 1)
        }, data.timeToLive || 5000)
      }
    },
    action (action, id, notification) {
      EventBus.$emit('notification-after-' + action, notification)
      switch (action) {
        case 'goToCheckout':
          this.$router.push(this.localizedRoute({ name: 'checkout' }))
          this.notifications.splice(id, 1)
          break
        default:
          this.notifications.splice(id, 1)
      }
    }
  }
}
