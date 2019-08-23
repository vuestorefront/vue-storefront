<template>
  <SfSidebar
    :visible="visible"
    @close="onClose"
    class="filters"
  >
    <template v-for="(filter, filterName) in availableFilters">
      <h3 class="filters__title" :key="filter.id">
        {{ filterName.replace('_',' ') }}
      </h3>
      <SfFilter
        v-for="filterOption in filter"
        :key="filterOption.id"
        :label="filterOption.label"
        :color="filterOption.type == 'color' ? filterOption.label : null"
        @click.native="applyFilter(filterOption)"
        :selected="isActiveFilter(filterOption)"
      />
    </template>
    <div class="filters__buttons">
      <SfButton
        class="sf-button--full-width filters__button-clear"
      >
        Clear all
      </SfButton>
    </div>
  </SfSidebar>
</template>

<script>
import { SfSidebar, SfButton, SfFilter } from '@storefront-ui/vue'
import omit from 'lodash-es/omit'

export default {
  props: {
    availableFilters: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    activeFilters: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    isActiveFilter (filter) {
      let isActive = false
      Object.entries(this.activeFilters).forEach(activeFilterTuple => {
        if (activeFilterTuple[1].find(singleFilter => singleFilter.id === filter.id)) {
          isActive = true
        }
      })
      return isActive
    },
    applyFilter (filter) {
      this.$emit('filter-changed', filter)
    },
    onClose () {
      this.$emit('close')
    }
  },
  components: {
    SfSidebar,
    SfButton,
    SfFilter
  }
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/src/css/variables";

.filters {
  &__title:not(:first-child),
  &__buttons {
    margin-top: $spacer-big * 3;
  }
  &__title {
    font-size: $font-size-big-desktop;
    line-height: 2.23;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__button-clear {
    margin-top: 10px;
    background: $c-light-primary;
    color: #a3a5ad;
  }
}
</style>
