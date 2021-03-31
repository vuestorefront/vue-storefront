<template>
  <div v-if="div && lazy" v-lazy:background-image="image" :style="{ backgroundImage: `url('${placeholder}')` }">
    <slot />
  </div>
  <div v-else-if="div" :style="{ backgroundImage: `url('${image}')` }">
    <slot />
  </div>
  <img v-else-if="lazy" v-lazy="image" :src="placeholder">
  <img v-else :src="image">
</template>

<script>
import get from 'lodash-es/get'
import config from 'config'
import { mapGetters } from 'vuex'

export default {
  name: 'StoryblokImage',
  computed: {
    ...mapGetters({
      supportsWebp: 'storyblok/supportsWebp'
    }),
    computedFilters () {
      if (this.detectWebp && this.supportsWebp) {
        return [...this.filters, 'format(webp)']
      }
      return this.filters
    },
    image () {
      if (!this.src.includes('//a.storyblok.com')) {
        return this.src
      }
      const [, resource] = this.src.split('//a.storyblok.com')
      let mod = ''
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
      return 'https://img2.storyblok.com' + mod + resource
    }
  },
  props: {
    placeholder: {
      type: String,
      default: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
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
    lazy: {
      type: Boolean,
      default: true
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
