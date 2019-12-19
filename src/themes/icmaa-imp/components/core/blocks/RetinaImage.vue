<template>
  <div v-if="placeholder && loading">
    <placeholder :ratio="ratio" />
    <img :src="src" :srcset="srcset" @load="loaded" @error="error" class="t-hidden">
  </div>
  <img :src="src" :srcset="srcset" @load="loaded" @error="error" v-else>
</template>

<script>
import Placeholder from 'theme/components/core/blocks/Placeholder'

export default {
  name: 'RetinaImage',
  components: {
    Placeholder
  },
  props: {
    image: {
      type: String,
      required: true
    },
    placeholder: {
      type: Boolean,
      default: false
    },
    ratio: {
      type: String,
      default: '3:4'
    }
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    src () {
      return `${this.image}`
    },
    srcset () {
      return `${this.image} 1x, ${this.retinaImage} 2x`
    },
    retinaImage () {
      return this.image.replace(/(\.\w{3,4})(\?\w*)?$/gm, '@2x$1$2')
    }
  },
  methods: {
    loaded () {
      this.event('load')
    },
    error () {
      this.event('error')
    },
    event (action = 'load') {
      if (this.loading) {
        this.loading = true
        this.$emit(action)
      }
    }
  }
}
</script>
