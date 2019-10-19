<template>
  <vue-slider v-model="value" :data="values" :marks="true" :enable-cross="false" :fixed="true" :lazy="true" :silent="true" :drag-on-click="true" tooltip="none" dot-size="24" :dot-style="{ boxShadow: 'none', border: '1px solid #999' }" :process-style="{ background: '#999' }" :label-style="{ fontSize: '.75rem', color: '#999', marginTop: '1rem' }" :label-active-style="{ color: '#000' }" />
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin'

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'PriceSelector',
  mixins: [filterMixin],
  components: {
    VueSlider
  },
  data () {
    return {
      value: []
    }
  },
  mounted () {
    this.value = [this.startFromValue, this.startToValue]
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    attributeKey: {
      type: String,
      default: ''
    },
    attributeLabel: {
      type: String,
      default: ''
    }
  },
  computed: {
    curFilter () {
      const filter = this.selectedFilters[this.attributeKey] || false
      return Array.isArray(filter) ? filter.slice(0).pop() : filter
    },
    startFromValue () {
      if (this.curFilter) {
        return this.curFilter.from
      }

      return this.firstOption.from
    },
    startToValue () {
      if (this.curFilter) {
        return this.curFilter.to || this.values.slice(0).pop()
      }

      return this.firstOption.to
    },
    firstOption () {
      const options = this.options.slice(0, 1)
      return options.shift()
    },
    minValue () {
      return Math.min(...this.options.map(o => parseInt(o.from)))
    },
    maxValue () {
      return Math.max(...this.options.map(o => parseInt(o.from)))
    },
    values () {
      return [...this.options.map(o => parseInt(o.from)), '∞']
    }
  },
  watch: {
    value (v, ov) {
      if (ov.length === 0) {
        return
      }

      const filter = this.options.find(f => f.from === v[0])
      if (filter) {
        this.$emit('change', filter)
      }
    }
  }
}
</script>
