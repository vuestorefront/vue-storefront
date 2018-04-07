<template>
  <button type="button" class="inline-flex brdr-none" @click="goBack">
    <i class="material-icons">keyboard_backspace</i>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/ReturnIcon')]
}
</script>
