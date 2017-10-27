<template>
  <div id='payment'>
    Core payment
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Checkout/Payment')],
  beforeMount () {
  },
  components: {
  }
}
</script>

<style scoped>

</style>
