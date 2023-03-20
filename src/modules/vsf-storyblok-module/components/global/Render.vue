<template>
  <component
    v-if="component"
    v-editable="item"
    :is="component"
    :item="item"
    @content-change="$emit('content-change', $event)"
  />
</template>

<script>
import { components } from '../'

export default {
  name: 'RenderBlok',
  computed: {
    component: function () {
      return components[this.item.component] || components.debug
    },
    components: function () {
      return components
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
