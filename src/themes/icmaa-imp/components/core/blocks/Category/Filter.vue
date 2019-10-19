<template>
  <div class="filter">
    <div class="t-flex t-flex-wrap t-mb-4" v-if="getType(attributeKey) === 'color'">
      <color-selector v-for="(option, index) in options" :key="index" :option="option" @change="changeFilter" />
    </div>
    <div class="t-flex t-flex-wrap t-mb-4 t--mx-1" v-else-if="getType(attributeKey) === 'gender'">
      <gender-selector v-for="(option, index) in options" :key="index" :option="option" @change="changeFilter" />
    </div>
    <div class="t-mb-12 t-px-2" v-else-if="getType(attributeKey) === 'price'">
      <price-selector v-bind="$props" @change="changeFilter" class="t-cursor-pointer" />
    </div>
    <div class="t-flex t-flex-wrap t-mb-4" v-else-if="getType(attributeKey) === 'sale'">
      <sale-selector v-for="(option, index) in options" :key="index" :option="option" @change="changeFilter" class="t-mb-2" />
    </div>
    <div class="t-mb-4" v-else-if="['list', 'searchableList'].includes(getType(attributeKey))">
      <list-selector v-bind="$props" @change="changeFilter" :searchable="getType(attributeKey) === 'searchableList'" />
    </div>
    <div class="t-flex t-flex-wrap t-mb-4" v-else>
      <generic-selector v-for="(option, index) in options" :key="index" :option="option" @change="changeFilter" class="t-mb-2" :class="{ 't-mr-2': index !== option.length - 1 }" />
    </div>
  </div>
</template>

<script>
import config from 'config'
import GenericSelector from 'theme/components/core/blocks/Category/Filter/GenericSelector'
import ListSelector from 'theme/components/core/blocks/Category/Filter/ListSelector'
import PriceSelector from 'theme/components/core/blocks/Category/Filter/PriceSelector'
import ColorSelector from 'theme/components/core/blocks/Category/Filter/ColorSelector'
import GenderSelector from 'theme/components/core/blocks/Category/Filter/GenderSelector'
import SaleSelector from 'theme/components/core/blocks/Category/Filter/SaleSelector'

export default {
  name: 'CategoryFilter',
  components: {
    GenericSelector,
    ListSelector,
    PriceSelector,
    ColorSelector,
    GenderSelector,
    SaleSelector
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
