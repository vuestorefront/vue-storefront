<template>
  <button type="button" class="inline-flex brdr-none" @click="returnHome" data-testid="returnButton">
    <i class="material-icons">keyboard_backspace</i>
  </button>
</template>

<script>
import ReturnIcon from '@vue-storefront/core/components/blocks/Header/ReturnIcon'

export default {
  mixins: [ReturnIcon],
  methods: {
    returnHome () {
      document.location = '/'
    }
  }
}
</script>
