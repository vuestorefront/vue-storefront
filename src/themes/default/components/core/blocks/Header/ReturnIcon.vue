<template>
  <button type="button" class="inline-flex brdr-none" @click="goBack">
    <i class="material-icons">keyboard_backspace</i>
  </button>
</template>

<script>
import returnIcon from 'core/components/blocks/Header/ReturnIcon'

export default {
  mixins: [returnIcon]
}
</script>
