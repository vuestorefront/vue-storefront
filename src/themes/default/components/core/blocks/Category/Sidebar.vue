<template>
  <div class="sidebar">
    <h4>
      {{ $t('Filter') }}
    </h4>
    <button
      class="visible-xs no-outline brdr-none py15 px40 bg-cl-mine-shaft :bg-cl-th-secondary ripple h5 cl-white sans-serif"
      @click="resetAllFilters"
      :class="{'button-disabled': Object.keys(activeFilters).length === 0}"
      :disabled="Object.keys(activeFilters).length === 0"
    >
      {{ $t('Clear') }}
    </button>
    <div
      v-for="(filter, filterIndex) in filters"
      :key="filterIndex"
      v-if="filter.length"
    >
      <h5>
        {{ $t(filterIndex + '_filter') }}
      </h5>

      <div v-if="filterIndex==='color'">
        <color-selector
          context="category"
          :attribute_code="color"
          code="color"
          v-for="(color, index) in filter"
          :key="index"
          :id="color.id"
          :label="color.label"
        />
      </div>
      <div v-else-if="filterIndex==='size'">
        <size-selector
          context="category"
          :attribute_code="size"
          code="size"
          class="size-select mr10 mb10"
          v-for="(size, index) in sortById(filter)"
          :key="index"
          :id="size.id"
          :label="size.label"
        />
      </div>
      <div v-else-if="filterIndex==='price'">
        <price-selector
          context="category"
          :attribute_code="price"
          class="price-select mb10 block"
          code="price"
          v-for="(price, index) in filter"
          :key="index"
          :id="price.id"
          :from="price.from"
          :to="price.to"
          :content="price.label"
          :label="price.label"
        />
      </div>
      <div v-else>
        <generic-selector
          context="category"
          :attribute_code="filter.attribute_code"
          class="price-select mb10 block"
          :code="filterIndex"
          v-for="(option, index) in filter"
          :key="index"
          :id="option.id"
          :label="option.label"
        />
      </div>
    </div>
    <!-- add the custom controls to other available filters set in config.products.defaultFilters; must be numeric field in ES
    <div v-if="filters.erin_recommends && filters.erin_recommends.length">
      <h5>
        {{ $t('Erin recommends') }}
      </h5>
      <div
        class="size-select mr10 mb10"
        v-for="(er, index) in filters.erin_recommends"
        :key="index"
        :id="er.id"
        :label="er.label"
      >{{ er.label }}</div>
    </div>
    -->
  </div>
</template>

<script>
import Sidebar from '@vue-storefront/core/compatibility/components/blocks/Category/Sidebar'

import ColorSelector from 'theme/components/core/ColorSelector'
import SizeSelector from 'theme/components/core/SizeSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import GenericSelector from 'theme/components/core/GenericSelector'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector
  },
  mixins: [Sidebar]
}
</script>
