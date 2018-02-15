<template>
  <div>
    Core ThankYouPage
  </div>
</template>

<script>
export default {
  name: 'ThankYouPage',
  data () {
    return {
      isOnline: (typeof navigator !== 'undefined' ? navigator.isOnline : true)
    }
  }
}
</script>
