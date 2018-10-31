<template>
  <!-- Examples of usage -->
  <div>
    <button id="spawn-notification-button" @click="notify">Button</button>
    <button id="spawn-notification-button2" @click="notifyWithLimitedTime">Button2</button>
  </div>
</template>

<script>
export default {
  methods: {
    notify () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: 'Test message',
        action1: { label: 'OK' }
      })
    },
    notifyWithLimitedTime () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: 'Test message',
        timeToLive: 2000,
        action1: { label: 'OK' }
      })
    },
  }
}
</script>
