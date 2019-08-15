<template>
  <img :src="src" :srcset="srcset">
</template>

<script>
export default {
  name: 'RetinaImage',
  props: {
    image: {
      type: String,
      required: true
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
  }
}
</script>
