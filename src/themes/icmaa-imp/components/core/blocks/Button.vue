<template>
  <button type="button" class="t-px-4 t-text-xs t-rounded-sm t-cursor-pointer t-leading-1-rem" :class="[ { 't-uppercase': type !== 'select' }, sizeClass, colorClass ]">
    <template v-if="iconOnly">
      <span class="t-sr-only">
        <slot />
      </span>
    </template>
    <template v-else>
      <slot />
    </template>
    <material-icon v-if="icon" :icon="icon" :icon-set="iconSet" :size="size === 'md' ? size : 'xs'" class="t-align-middle" :class="[{ 't-ml-4': !iconOnly }, { 't-float-right t-leading-1-rem': type === 'select' }, iconClass ]" />
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
        return ['primary', 'second', 'ghost', 'transparent'].includes(value)
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
    iconOnly: {
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
        'ghost-white': 't-border t-border-white t-bg-transparent t-text-white',
        'transparent': 't-bg-transparent',
        'transparent-white': 't-bg-transparent t-text-white',
        'transparent-primary': 't-bg-transparent t-text-base-darkest',
        'select': 't-border t-border-base-light t-bg-transparent t-text-base-tone t-text-left t-text-sm'
      }

      return map[this.type]
    }
  }
}
</script>
