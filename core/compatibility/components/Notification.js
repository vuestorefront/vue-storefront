// deprecated moved to store
export default {
  name: 'Notification',
  data () {
    return {
      notifications: []
    }
  },
  beforeMount () {
    this.$bus.$on('notification', this.onNotification)
  },
  beforeDestroy () {
    this.$bus.$off('notification', this.onNotification)
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
      this.$bus.$emit('notification-after-' + action, notification)
      switch (action) {
        case 'goToCheckout':
          this.$router.push(this.localizedRoute('/checkout'))
          this.notifications.splice(id, 1)
          break
        default:
          this.notifications.splice(id, 1)
      }
    }
  }
}
