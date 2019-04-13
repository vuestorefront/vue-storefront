<template>
  <div class="sidebar">
    <h4 class="sidebar__header">
      <span> {{ $t('Filter') }} </span>
      <button
        class="no-outline brdr-none py15 px40 bg-cl-mine-shaft :bg-cl-th-secondary ripple h5 cl-white sans-serif"
        @click="resetAllFilters"
        v-show="hasActiveFilters"
      >
        {{ $t('Clear') }}
      </button>
    </h4>
    <div
      v-for="(filter, filterIndex) in availableFilters"
      :key="filterIndex"
    >
      <h5>
        {{ $t(filterIndex + '_filter') }}
      </h5>

      <div v-if="filterIndex==='color'">
        <color-selector
          context="category"
          code="color"
          v-for="(color) in filter"
          :key="color.id"
          :id="color.id"
          :checked="activeFilters[filterIndex] && (activeFilters[filterIndex].id.indexOf(color.id)>=0 || activeFilters[filterIndex].id === color.id)"
          :label="color.label"
        />
      </div>
      <div v-else-if="filterIndex==='size'">
        <size-selector
          context="category"
          code="size"
          class="size-select mr10 mb10"
          v-for="(size) in sortById(filter)"
          :key="size.id"
          :id="size.id"
          :checked="activeFilters[filterIndex] && (activeFilters[filterIndex].id.indexOf(size.id)>=0 || activeFilters[filterIndex].id === size.id)"
          :label="size.label"
        />
      </div>
      <div v-else-if="filterIndex==='price'">
        <price-selector
          context="category"
          class="price-select mb10 block"
          code="price"
          v-for="(price) in filter"
          :key="price.id"
          :id="price.id"
          :from="price.from"
          :to="price.to"
          :content="price.label"
          :checked="activeFilters[filterIndex] && (activeFilters[filterIndex].id.indexOf(price.id)>=0 || activeFilters[filterIndex].id === price.id)"
        />
      </div>
      <div v-else class="sidebar__inline-selecors">
        <generic-selector
          context="category"
          class="mr10 mb10 block"
          :code="filterIndex"
          v-for="(option) in filter"
          :key="option.id"
          :id="option.id"
          :checked="activeFilters[filterIndex] && (activeFilters[filterIndex].id.indexOf(option.id)>=0 || activeFilters[filterIndex].id === option.id)"
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

<style lang="scss" scoped>
.sidebar {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 47px;
  }

  &__inline-selecors {
    display: flex;
  }
}
</style>
