<template>
  <div class="notification" style="display: none">
  </div>
</template>

<script>
import EventBus from 'src/event-bus/event-bus'

export default {
  name: 'notification',
  data () {
    return {
      notifications: []
    }
  },
  created () {
    EventBus.$on('notification', function (data) {
      this.notifications.push(data)
    })
  }
}
</script>
