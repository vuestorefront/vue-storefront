<template>
  <div class="notification">
    <!--
        Notifications component storing notifications that can be triggered by sending event 'notification' to Event Bus
    -->
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
    EventBus.$on('notification', data => {
      this.notifications.push(data)
    })
  },
  methods: {
    action (action, id) {
      switch (action) {
        case 'close':
          this.notifications.splice(id, 1)
      }
    }
  }
}
</script>
