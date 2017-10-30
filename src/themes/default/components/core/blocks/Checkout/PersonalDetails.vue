<template>
  <div class='personal-details'>
    Core personal details
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

// https://monterail.github.io/vuelidate/#sub-contextified-validators

export default {
  mixins: [coreComponent('core/blocks/Checkout/PersonalDetails')]
}
</script>

<style scoped>

</style>
