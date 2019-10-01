<template>
  <i :class="[ iconClass, sizeClass, rootLineHeightClass ]">{{ icon }}</i>
</template>

<script>
export default {
  name: 'MaterialIcon',
  props: {
    icon: {
      type: String,
      default: 'favorite_border'
    },
    iconSet: {
      type: String,
      default: 'material',
      validation: (value) => {
        return ['material', 'icmaa'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      default: 'md',
      validation: (value) => {
        return ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'icon'].includes(value)
      }
    },
    rootLineHeight: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass () {
      const map = {
        'material': 'material-icons',
        'icmaa': 'icmaa-icons'
      }

      return map[this.iconSet]
    },
    sizeClass () {
      const map = {
        'icon': 't-text-icon',
        'xxs': 't-text-xs',
        'xs': 't-text-base',
        'sm': 't-text-lg',
        'md': 't-text-2xl',
        'lg': 't-text-4xl',
        'xl': 't-text-5xl'
      }

      return map[this.size]
    },
    rootLineHeightClass () {
      return { 't-leading-1-rem': this.rootLineHeight }
    }
  }
}
</script>
