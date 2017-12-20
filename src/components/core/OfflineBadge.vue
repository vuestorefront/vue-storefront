<template>
  <div class="offline-badge absolute bg-black c-white">
      You are offline
  </div>
</template>

<script>
export default {
  name: 'offline-badge',
  data () {
    return {
      isOnline: navigator.onLine
    }
  },
  created () {
    window.addEventListener('online', (e) => {
      this.isOnline = true
    })

    window.addEventListener('offline', (e) => {
      this.isOnline = false
    })
  }
}
</script>

<style scoped>
.offline-badge {
    width: 100%;
    bottom: 0;
    left: 0;
}
</style>
