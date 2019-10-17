<template>
  <div class="filter">
    <div class="t-flex t-flex-wrap t-mb-4" v-if="getType(attributeKey) === 'color'">
      <color-selector v-for="(option, index) in options" :key="index" :option="option" @change="changeFilter" />
    </div>
    <div class="t-flex t-mb-6 t--mx-1" v-else-if="getType(attributeKey) === 'gender'">
      <gender-selector v-for="(option, index) in options" :key="index" :option="option" @change="changeFilter" />
    </div>
    <div class="t-mb-4" v-else-if="getType(attributeKey) === 'list'">
      <list-selector v-bind="$props" @change="changeFilter" />
    </div>
    <div class="t-flex t-flex-wrap t-mb-4" v-else>
      <generic-selector v-for="(option, index) in options" :key="index" :option="option" @change="changeFilter" class="t-mb-2" :class="{ 't-mr-2': index !== option.length - 1 }" />
    </div>
  </div>
</template>

<script>
import config from 'config'
import GenericSelector from 'theme/components/core/blocks/Category/Filter/GenericSelector'
import ColorSelector from 'theme/components/core/blocks/Category/Filter/ColorSelector'
import GenderSelector from 'theme/components/core/blocks/Category/Filter/GenderSelector'
import ListSelector from 'theme/components/core/blocks/Category/Filter/ListSelector'

export default {
  name: 'CategoryFilter',
  components: {
    GenericSelector,
    ColorSelector,
    GenderSelector,
    ListSelector
  },
  props: {
    attributeKey: {
      type: String,
      required: true
    },
    attributeLabel: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    async changeFilter (filterVariant) {
      this.$store.dispatch('category-next/switchSearchFilters', [ filterVariant ])
    },
    getType (attributeKey) {
      const map = Object.entries(config.products.filterTypeMapping).find(f => f[1].includes(attributeKey))
      return map ? map[0] : false
    }
  }
}
</script>
