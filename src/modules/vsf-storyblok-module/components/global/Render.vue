<template>
  <component v-if="component" v-editable="item" :is="component" :item="item" />
</template>

<script>
import { components } from '../'

export default {
  name: 'RenderBlok',
  computed: {
    component: function () {
      return components[this.item.component] || components.debug
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
