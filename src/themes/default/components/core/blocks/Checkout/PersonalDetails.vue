<template>
  <div id='personal-details'>
    Core personal details
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

// https://monterail.github.io/vuelidate/#sub-contextified-validators

export default {
  mixins: [coreComponent('core/blocks/Checkout/PersonalDetails')],
  beforeMount () {
  },
  components: {
  }
}
</script>

<style scoped>

</style>
