<template>
  <button type="button" class="t-px-4 t-text-xs t-rounded-sm t-cursor-pointer t-leading-1-rem" :class="[ { 't-uppercase': type !== 'select' }, sizeClass, colorClass ]">
    <template v-if="onlyIcon">
      <span class="t-sr-only">
        <slot />
      </span>
    </template>
    <template v-else>
      <slot />
    </template>
    <material-icon v-if="icon" :icon="icon" :icon-set="iconSet" :size="size === 'md' ? size : 'xs'" class="t-align-middle" :class="[{ 't-ml-4': !onlyIcon }, { 't-float-right': type === 'select' }, iconClass ]" />
  </button>
</template>

<script>
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'Button',
  components: {
    MaterialIcon
  },
  props: {
    size: {
      type: String,
      default: 'md',
      validation: (value) => {
        return ['md', 'sm'].indexOf(value) !== -1
      }
    },
    type: {
      type: String,
      default: 'second',
      validation: (value) => {
        return ['primary', 'second', 'ghost', 'transparent'].indexOf(value) !== -1
      }
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    iconSet: {
      type: [String, Boolean],
      default: 'material'
    },
    iconClass: {
      type: [String, Boolean],
      default: false
    },
    onlyIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeClass () {
      return this.size === 'md' ? 't-h-10' : 't-h-8'
    },
    colorClass () {
      const map = {
        'primary': 't-bg-primary t-text-white',
        'second': 't-bg-base-darkest t-text-white',
        'ghost': 't-border t-border-base-darkest t-bg-transparent t-text-base-darkest',
        'transparent': 't-bg-transparent t-text-primary',
        'select': 't-border t-border-base-light t-bg-transparent t-text-base-tone t-text-left t-text-sm'
      }

      return map[this.type]
    }
  }
}
</script>
