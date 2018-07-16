<template>
  <button type="button" class="inline-flex brdr-none" @click="goBack">
    <i class="material-icons">keyboard_backspace</i>
  </button>
</template>

<script>
import ReturnIcon from 'core/components/blocks/Header/ReturnIcon'

export default {
  mixins: [ReturnIcon]
}
</script>
