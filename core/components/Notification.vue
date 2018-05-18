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
      if (this.notifications.length > 0 && this.notifications[this.notifications.length - 1].message === data.message) {
        return
      }
      this.notifications.push(data)
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
          this.$router.push('/checkout')
          this.notifications.splice(id, 1)
          break
      }
    }
  }
}
</script>
