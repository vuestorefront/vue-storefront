<template>
  <div class="hamburger-icon inline-flex" @click="goBack">
    <i class="material-icons md-18">keyboard_backspace</i>
  </div>
</template>

<script>
  import { coreComponent } from 'lib/themes'

  export default {
    mixins: [coreComponent('core/blocks/Header/ReturnIcon')]
  }
</script>
