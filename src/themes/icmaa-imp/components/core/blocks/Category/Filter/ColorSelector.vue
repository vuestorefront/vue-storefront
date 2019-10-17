<template>
  <button class="t-flex t-items-center t-justify-center t-border t-border-base-lighter t-rounded-full t-w-10 t-h-10 t-mr-4 t-mb-2 hover:t-border-base-tone" @click="$emit('change', option)" :aria-label="option.label" :style="colorFrom(option)">
    <span class="t-sr-only">{{ option.label }}</span>
    <material-icon icon="check" size="sm" class="t-bg-white t-rounded-full t-p-1" v-if="isActive" />
  </button>
</template>

<script>
import config from 'config'
import filterMixin from 'theme/mixins/filterMixin'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'ColorSelector',
  mixins: [ filterMixin ],
  components: {
    MaterialIcon
  },
  methods: {
    colorFrom (option) {
      if (config.products.colorMappings && typeof config.products.colorMappings[option.id] !== 'undefined') {
        return 'background: ' + config.products.colorMappings[option.id]
      }
      return ''
    }
  }
}
</script>
