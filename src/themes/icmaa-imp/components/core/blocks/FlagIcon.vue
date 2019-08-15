<template>
  <svg v-if="useSprite">
    <use :xlink:href="`${sprite}#${isoFileCode}`" />
  </svg>
  <img :src="image" :alt="iso" v-else>
</template>

<script>
import config from 'config'

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
    useSprite () {
      return config.useCountryFlagSprites || false
    },
    attributes () {
      return this.$attrs
    },
    sprite () {
      return require(`theme/assets/flags/${this.format}.svg`)
    },
    isoFileCode () {
      return this.iso.toLowerCase()
    },
    image () {
      return require(`theme/assets/flags/${this.format}/${this.isoFileCode}.svg`)
    }
  }
}
</script>
