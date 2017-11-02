<template>
  <div class="notification" style="display: none">
  </div>
</template>

<script>
import EventBus from 'src/event-bus/event-bus'

export default {
  name: 'notification',
  created () {
    EventBus.$on('notification', function (data) {
      console.log(data)
    })
  }
}
</script>
