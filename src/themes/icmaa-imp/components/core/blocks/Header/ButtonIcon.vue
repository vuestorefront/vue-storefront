<template>
  <button class="t-flex t-items-center t-cursor-pointer t-text-white t-relative" :aria-label="$t(title)" @click="$emit('click')">
    <material-icon :icon="icon" class="t-flex t-flex-fix" />
    <span class="qty t-flex t-justify-center t-items-center t-absolute t-bg-alt-3 t-border-2 t-border-base-darkest t-h-3-1/2 t-w-3-1/2 t-rounded-full t-font-mono" v-if="qty > 0" />
    <span v-html="$t(title)" class="t-hidden lg:t-flex-auto lg:t-flex t--ml-1 t-text-white t-text-sm" :class="[last ? 't-mr-4' : 't-mr-2']" />
  </button>
</template>

<script>
import inRange from 'lodash-es/inRange'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'ButtonIcon',
  components: {
    MaterialIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      default: 0
    },
    last: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

button {

  i {
    width: 50px;
    flex-basis: 50px;
  }

  .qty {
    top: 8px;
    left: 27px;
  }
}

</style>
