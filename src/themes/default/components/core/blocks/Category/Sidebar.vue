<template>
  <div class="sidebar">
    <h4 class="sidebar__header relative mt35 mb20 flex">
      <span> {{ $t('Filter') }} </span>
      <span
        class="weight-400 sidebar__header__clear pointer sans-serif flex lh25"
        @click="resetAllFilters"
        v-show="hasActiveFilters"
      >
        <i class="material-icons cl-accent mr5">
          cancel
        </i>
        {{ $t('Clear filters') }}
      </span>
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
          v-for="(color, index) in filter"
          :key="index"
          :variant="color"
          :selected-filters="getCurrentFilters"
          @change="$emit('changeFilter', $event)"
        />
      </div>
      <div v-else-if="filterIndex==='size'">
        <size-selector
          context="category"
          code="size"
          class="size-select mr10 mb10"
          v-for="(size, index) in sortById(filter)"
          :key="index"
          :variant="size"
          :selected-filters="getCurrentFilters"
          @change="$emit('changeFilter', $event)"
        />
      </div>
      <div v-else-if="filterIndex==='price'">
        <price-selector
          context="category"
          class="price-select mb10 block"
          code="price"
          v-for="(price, index) in filter"
          :key="index"
          :id="price.id"
          :from="price.from"
          :to="price.to"
          :content="price.label"
          :variant="price"
          :selected-filters="getCurrentFilters"
          @change="$emit('changeFilter', $event)"
        />
      </div>
      <div v-else class="sidebar__inline-selecors">
        <generic-selector
          context="category"
          class="mr10 mb10 block"
          :code="filterIndex"
          v-for="(option, index) in filter"
          :key="index"
          :variant="option"
          :selected-filters="getCurrentFilters"
          @change="$emit('changeFilter', $event)"
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
import ColorSelector from 'theme/components/core/ColorSelector'
import SizeSelector from 'theme/components/core/SizeSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import GenericSelector from 'theme/components/core/GenericSelector'
import pickBy from 'lodash-es/pickBy'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector
  },
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasActiveFilters () {
      return this.$store.getters['category-next/hasActiveFilters']
    },
    getCurrentFilters () {
      return this.$store.getters['category-next/getCurrentFilters']
    },
    availableFilters () {
      return pickBy(this.filters, (filter, filterType) => { return (filter.length && !this.$store.getters['category-next/getSystemFilterNames'].includes(filterType)) })
    }
  },
  methods: {
    resetAllFilters () {
      this.$store.dispatch('category-next/resetSearchFilters')
    },
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  &__header {
    justify-content: space-between;
    min-height: 47px;
    flex-wrap: wrap;
    &__clear {
      font-size: .8em;
      min-width: 102px;
      @media only screen and (min-width: 768px) and (max-width: 770px) {
        margin-top: 20px;
      }
    }
  }

  &__inline-selecors {
    display: flex;
  }
}
</style>
