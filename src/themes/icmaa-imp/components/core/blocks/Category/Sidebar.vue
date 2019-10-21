<template>
  <sidebar :title="$t('Filter')" :close-on-click="false">
    <template v-slot:top-after-title>
      <button-component v-if="hasActiveFilters" type="transparent" size="sm" icon="delete_sweep" :icon-only="true" @click="resetAllFilters">
        {{ $t('Clear filters') }}
      </button-component>
    </template>
    <div class="t-pb-20">
      <div v-for="(group, groupKey) in groupedFilters" :key="groupKey">
        <div v-if="groupKey === 1" :class="{ 't-border-t t-border-base-lighter t-mt-8 t-pt-6': groupedFilters[0].length > 0 }">
          <h4 class="t-text-sm t-mb-6">
            {{ $t('Productdetails') }}
          </h4>
        </div>
        <div v-for="filter in group" :key="filter.attributeKey" class="t-w-full" :data-attribute-key="filter.attributeKey">
          <template v-if="filter.submenu">
            <button-component icon="arrow_forward" type="select" class="t-w-full" :class="[ groupKey === 0 ? 't-mb-4' : 't-mb-6']" @click="openSubmenuFilter(filter)">
              <span>
                {{ filter.attributeLabel }}
                <span class="t-ml-2 t-text-xs t-text-base-light" v-if="isActiveFilterAttribute(filter.attributeKey)">
                  <material-icon class="t-align-middle" icon="check" size="xs" />
                  {{ currentFilters(filter.attributeKey) }}
                </span>
              </span>
            </button-component>
          </template>
          <template v-else>
            <h5 class="t-flex t-items-center t-text-xs t-text-base-tone t-mb-3">
              {{ filter.attributeLabel }}
              <button-component v-if="isActiveFilterAttribute(filter.attributeKey)" type="transparent" size="sm" icon="delete_sweep" :icon-only="true" @click="unsetFilter(filter.attributeKey)" class="t--my-4">
                {{ $t('Unset {label} filter', { label: filter.attributeLabel }) }}
              </button-component>
            </h5>
            <filter-wrapper :attribute-key="filter.attributeKey" :attribute-label="filter.attributeLabel" :options="filter.options" />
          </template>
        </div>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
import config from 'config'
import Sidebar from 'theme/components/theme/blocks/AsyncSidebar/Sidebar'
import FilterWrapper from 'theme/components/core/blocks/Category/Filter'
import ButtonComponent from 'theme/components/core/blocks/Button'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import sortBy from 'lodash-es/sortBy'

const AsyncFilter = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-category-filter" */ 'theme/components/core/blocks/Category/Filter')

export default {
  name: 'CategorySidebar',
  components: {
    Sidebar,
    FilterWrapper,
    ButtonComponent,
    MaterialIcon
  },
  computed: {
    ...mapGetters({
      filters: 'category-next/getAvailableFilters',
      hasActiveFilters: 'category-next/hasActiveFilters',
      getCurrentFilters: 'category-next/getCurrentFilters',
      isActiveFilterAttribute: 'category-next/isActiveFilterAttribute',
      getSystemFilterNames: 'category-next/getSystemFilterNames',
      isVisibleFilter: 'category-next/isVisibleFilter',
      attributeLabel: 'attribute/getAttributeLabel',
      attributes: 'attribute/getAttributeListByCode'
    }),
    availableFilters () {
      const submenuFilters = config.products.submenuFilters || []
      const singleOptionFilters = config.products.singleOptionFilters || []
      const attributes = this.attributes

      let filters = Object.entries(this.filters).map(v => { return { attributeKey: v[0], options: v[1] } })
      return filters
        .filter(f => (f.options.length > 1 || (f.options.length === 1 && singleOptionFilters.includes(f.attributeKey))) && !this.getSystemFilterNames.includes(f.attributeKey) && this.isVisibleFilter(f.attributeKey))
        .map(f => { return { ...f, submenu: submenuFilters.includes(f.attributeKey), attributeLabel: this.attributeLabel({ attributeKey: f.attributeKey }), position: attributes[f.attributeKey].position } })
    },
    groupedFilters () {
      let allAvailableFilters = sortBy(this.availableFilters, 'position', 'attributeLabel')
      const parentsOfNestedFilters = Object.keys(config.products.filterTree) || []

      return [
        allAvailableFilters.filter(f => parentsOfNestedFilters.includes(f.attributeKey)),
        allAvailableFilters.filter(f => !parentsOfNestedFilters.includes(f.attributeKey))
      ]
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
      let activeFilter = this.getCurrentFilters[attributeKey]
      if (!Array.isArray(activeFilter)) {
        activeFilter = [activeFilter]
      }

      activeFilter = activeFilter.map(f => f.label)
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
