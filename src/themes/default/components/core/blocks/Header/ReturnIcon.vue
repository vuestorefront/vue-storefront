<template>
  <button type="button" class="inline-flex brdr-none" @click="goBack">
    <i class="material-icons md-18">keyboard_backspace</i>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Header/ReturnIcon')]
}
</script>
