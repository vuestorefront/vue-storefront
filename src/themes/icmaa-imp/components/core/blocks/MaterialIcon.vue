<template>
  <i :class="[ iconClass, sizeClass ]">{{ icon }}</i>
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
        return ['xs', 'md', 'lg', 'xl'].indexOf(value) !== -1
      }
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
        'xs': 't-text-lg',
        'md': 't-text-2xl',
        'lg': 't-text-4xl',
        'xl': 't-text-5xl'
      }

      return map[this.size]
    }
  }
}
</script>
