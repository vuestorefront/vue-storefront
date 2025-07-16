<template>
  <div v-if="div" :style="{ backgroundImage: `url('${image}')` }">
    <slot />
  </div>
  <img v-else :src="image" alt="name">
</template>

<script>
import get from 'lodash-es/get'
import config from 'config'

export default {
  name: 'StoryblokImage',
  computed: {
    computedFilters () {
      return [...this.filters, 'format(webp)']
    },
    image () {
      if (!this.src.includes('/a.storyblok.com')) {
        return this.src
      }
      const [, resource] = this.src.split('/a.storyblok.com')
      let mod = '/m'

      if (this.height > 0 || this.width > 0) {
        if (this.fitIn) {
          mod += '/fit-in'
        }
        mod += `/${this.width}x${this.height}`
        if (this.smart) {
          mod += '/smart'
        }
      }

      if (this.computedFilters.length) {
        mod += '/filters:' + this.computedFilters.join(':')
      }

      return 'https://sb-assets.budsies.com' + resource + mod
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    detectWebp: {
      type: Boolean,
      default: get(config, 'storyblok.imageService.defaultWebp', true)
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      required: true
    },
    div: {
      type: Boolean,
      default: false
    },
    smart: {
      type: Boolean,
      default: false
    },
    fitIn: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Array,
      default: () => []
    }
  }
}
</script>
