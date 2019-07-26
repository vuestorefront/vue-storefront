<template>
  <img :src="image" :alt="iso">
</template>

<script>
import { Logger } from '@vue-storefront/core/lib/logger';

export default {
  props: {
    iso: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: '1x1',
      validator: function (value) {
        return ['1x1', '4x3'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    attributes () {
      return this.$attrs
    },
    image () {
      return `assets/flags/${this.format}/${this.iso.toLowerCase()}.svg`
    }
  }
}
</script>
