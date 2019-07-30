<template>
   <SfSidebar
      :visible="visible"
      @close="onClose"
      class="filters"
    >
      <h3 class="filters__title">
        Color
      </h3>
      <SfFilter 
        v-model="choosenFilters.color"
        @change="onFilterChange"
      >
        <SfFilterItem
          v-for="(filter, i) in filters.color"
          :key="i"
          :value="filter.id"
          :label="filter.label"
          :color="filter.label"
        />
      </SfFilter>
      <h3 class="filters__title">
        Size
      </h3>
      <SfFilter 
        v-model="choosenFilters.size"
        @change="onFilterChange"
      >
        <SfFilterItem
          v-for="(filter, i) in filters.size"
          :key="i"
          :value="filter.id"
          :label="filter.label"
        />
      </SfFilter>
      <h3 class="filters__title">
        Price
      </h3>
      <SfFilter 
        v-model="choosenFilters.price"
        @change="onFilterChange"
      >
        <SfFilterItem
          v-for="(filter, i) in filters.price"
          :key="i"
          :value="filter.id"
          :label="filter.label"
        />
      </SfFilter>
      <div class="filters__buttons">
        <SfButton
          @click="onClose"
          class="sf-button--full-width"
        >
          Done
        </SfButton>
        <SfButton
          class="sf-button--full-width filters__button-clear"
        >
          Clear all
        </SfButton>
      </div>
  </SfSidebar>
</template>

<script>
import { SfSidebar, SfButton, SfFilter } from '@storefrontui/vue'

export default {
  props: {
    filters: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      choosenFilters: {
        color: [],
        size: [],
        price: [],
      }
    }
  },
  methods: {
    onFilterChange (filters = this.choosenFilters) {
      this.$emit('filters-changed', filters)
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
@import "~@storefrontui/vue/src/css/variables";

.filters {
  &__title:not(:first-child),
  &__buttons {
    margin-top: $spacer-big * 3;
  }
  &__title {
    font-size: $font-size-big-desktop;
    line-height: 2.23;
  }
  &__button-clear {
    margin-top: 10px;
    background: $c-light-primary;
    color: #a3a5ad;
  }
}
</style>
