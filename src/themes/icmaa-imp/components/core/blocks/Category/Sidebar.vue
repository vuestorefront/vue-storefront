<template>
  <sidebar :title="$t('Filter')" :close-on-click="false" class="t-pb-16">
    <button-component @click="resetAllFilters" v-if="hasActiveFilters" v-text="$t('Clear filters')" class="t-w-full t-mb-6" />
    <div v-for="filter in availableFilters" :key="filter.attributeKey" class="t-w-full" :data-attribute-key="filter.attributeKey">
      <template v-if="filter.submenu">
        <button-component icon="arrow_forward" type="select" class="t-w-full t-mb-6" @click="openSubmenuFilter(filter)">
          <span>
            {{ $t('All {label}', { label: filter.attributeLabel }) }}
            <span class="t-ml-2 t-text-xs t-text-base-light" v-if="isCurrentFilterAttribute(filter.attributeKey)" v-text="currentFilters(filter.attributeKey)" />
          </span>
        </button-component>
      </template>
      <template v-else>
        <h5 class="t-flex t-items-center t-text-xs t-text-base-tone t-mb-3">
          {{ filter.attributeLabel }}
          <button-component v-if="isCurrentFilterAttribute(filter.attributeKey)" type="transparent" size="sm" icon="delete_sweep" :icon-only="true" @click="unsetFilter(filter.attributeKey)" class="t--my-4">
            {{ $t('Unset {label} filter', { label: filter.attributeLabel }) }}
          </button-component>
        </h5>
        <filter-wrapper :attribute-key="filter.attributeKey" :attribute-label="filter.attributeLabel" :options="filter.options" />
      </template>
    </div>
  </sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
import config from 'config'
import Sidebar from 'theme/components/theme/blocks/AsyncSidebar/Sidebar'
import FilterWrapper from 'theme/components/core/blocks/Category/Filter'
import ButtonComponent from 'theme/components/core/blocks/Button'
import pickBy from 'lodash-es/pickBy'

const AsyncFilter = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-category-filter" */ 'theme/components/core/blocks/Category/Filter')

export default {
  components: {
    Sidebar,
    FilterWrapper,
    ButtonComponent
  },
  computed: {
    ...mapGetters({
      filters: 'category-next/getAvailableFilters',
      hasActiveFilters: 'category-next/hasActiveFilters',
      getCurrentFilters: 'category-next/getCurrentFilters',
      isCurrentFilterAttribute: 'category-next/isCurrentFilterAttribute',
      attributeLabel: 'attribute/getAttributeLabel'
    }),
    availableFilters () {
      const submenuFilters = config.products.submenuFilters || []
      let filters = Object.entries(this.filters).map(v => { return { attributeKey: v[0], options: v[1] } })
      return filters
        .filter(f => f.options.length && !this.$store.getters['category-next/getSystemFilterNames'].includes(f.attributeKey))
        .map(f => { return { ...f, submenu: submenuFilters.includes(f.attributeKey), attributeLabel: this.attributeLabel({ attributeKey: f.attributeKey }) } })
    }
  },
  methods: {
    resetAllFilters () {
      this.$store.dispatch('category-next/resetSearchFilters')
    },
    unsetFilter (attributeKey) {
      this.$store.dispatch('category-next/unsetSearchFilterForAttribute', attributeKey)
    },
    currentFilters (attributeKey) {
      let activeFilter = this.getCurrentFilters[attributeKey].map(f => f.label)
      if (activeFilter.length > 3) {
        activeFilter = activeFilter.slice(0, 3)
        activeFilter.push('...')
      }

      return activeFilter.join(', ')
    },
    openSubmenuFilter (filter) {
      if (filter.submenu) {
        this.$store.dispatch('ui/addSidebarPath', { component: AsyncFilter, title: filter.attributeLabel, props: filter })
      }
    }
  }
}
</script>
