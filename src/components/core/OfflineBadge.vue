<template>
  <div v-show="!isOnline" class="offline-badge fixed p10 c-white center-xs">
    You are offline, some of the functionalities are limited
  </div>
</template>

<script>
export default {
  name: 'OfflineBadge',
  data () {
    return {
      isOnline: true
    }
  },
  mounted () {
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
    window.addEventListener('online', (e) => {
      console.log('on')
      this.isOnline = true
    })

    window.addEventListener('offline', (e) => {
      console.log('off')
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
    background: #e63030;
}
</style>
