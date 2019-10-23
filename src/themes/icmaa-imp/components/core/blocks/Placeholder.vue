<template>
  <div class="t-relative t-w-full" :class="{ 't-bg-white': !plain }" :style="{ paddingTop: `${height}%` }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    ratio: {
      type: String,
      required: true
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    height () {
      const ratio = this.ratio.split(':')
      return ratio[1] * 100 / ratio[0]
    }
  }
}
</script>
