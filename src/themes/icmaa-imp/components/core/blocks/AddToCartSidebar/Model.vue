<template>
  <div v-if="isVisible" v-text="text" />
</template>

<script>
import i18n from '@vue-storefront/i18n'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    isVisible () {
      return this.name && this.height && this.size
    },
    name () {
      if (this.product.name === 'Das Model') {
        return i18n.t('The Model')
      }

      return this.product.model_name
    },
    height () {
      return this.product.model_height
    },
    size () {
      return this.product.model_size
    },
    text () {
      return i18n.t(
        '{name} is {height} tall and wears size {size}.',
        {
          name: this.name,
          height: this.height,
          size: this.size
        }
      )
    }
  }
}
</script>
