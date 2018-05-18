<template>
  <div class="notification">
    <!--
        Notifications component storing notifications that can be triggered by sending event 'notification' to Event Bus
    -->
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data () {
    return {
      notifications: []
    }
  },
  created () {
    this.$bus.$on('notification', data => {
      data.timeout = setTimeout(() => {
        this.action('close', this.notifications.length - 1)
      }, data.timeToLive || 5000)
      this.notifications.push(data)
    })
  },
  methods: {
    action (action, id) {
      this.$bus.$emit('cart-after-' + action, id)
      switch (action) {
        case 'close':
          break
        case 'goToCheckout':
          this.$router.push('/checkout')
          break
      }
      const removedNotifications = this.notifications.splice(id, 1)
      removedNotifications.forEach(notification => {
        clearTimeout(notification.timeout)
      })
    }
  }
}
</script>
