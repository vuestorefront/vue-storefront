export default {
  name: 'Notification',
  data () {
    return {
      notifications: []
    }
  },
  beforeMount () {
    this.$bus.$on('notification', data => {
      if (this.notifications.length > 0 && this.notifications[this.notifications.length - 1].message === data.message) {
        return
      }
      this.notifications.push(data)
      // @todo: add clearTimeout
      setTimeout(() => {
        this.action('close', this.notifications.length - 1)
      }, data.timeToLive || 5000)
    })
  },
  methods: {
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
