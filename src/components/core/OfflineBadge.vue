<template>
  <div>
    Core OfflineBadge
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
