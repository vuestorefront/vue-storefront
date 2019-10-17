<template>
  <div id="category">
    <header class="t-container">
      <div class="t-flex t-flex-wrap t-px-4 t-mb-8">
        <breadcrumbs :routes="getBreadcrumbs" :active-route="getCurrentCategory.name" class="t-w-full t-my-8" />
        <category-extras-header />
        <div class="t-w-full">
          <div class="t-flex t-flex-wrap t-items-center t--mx-1 lg:t--mx-2">
            <h1 class="category-title t-hidden lg:t-block t-w-3/4 t-px-1 lg:t-px-2 t-mb-4 t-font-light t-text-2xl t-text-base-dark" v-text="title" />
            <div class="t-hidden lg:t-block t-w-1/4 t-px-1 lg:t-px-2 t-text-sm t-text-base-dark t-text-right">
              <span class="t-font-bold">{{ getCategoryProductsTotal }}</span> {{ $t('items') }}
              <span class="t-mx-2 t-text-base-lighter">|</span>
              <dropdown @change="changePageSize" :options="pageSizeOptions" :current="parseInt(pageSize)" position="right" name="pagesize" class="t-inline-block" :dropdown-class="{ 't-w-32 t-mt-2': true }">
                {{ pageSize }} {{ $t('items per page') }}
                <material-icon icon="keyboard_arrow_down" size="xs" class="t-align-middle t-text-primary" />
              </dropdown>
            </div>
            <div class="t-w-1/2 lg:t-w-3/4 t-px-1 lg:t-px-2 t-flex t-items-center">
              <button-component style="second" align="stretch" icon="filter_list" @click.native="openFilters" class="t-w-full lg:t-w-auto">
                {{ $t('Filters') }}
              </button-component>
              <presets @change="changeFilter" class="t-hidden lg:t-flex t-items-center t-ml-2" />
            </div>
            <div class="t-w-1/2 lg:t-w-1/4 t-px-1 lg:t-px-2">
              <sort-by :has-label="true" @change="changeFilter" :value="getCurrentSearchQuery.sort" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="t-container t-pb-8">
      <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
        <product-listing :products="getCategoryProducts" />
      </lazy-hydrate>
      <product-listing v-else :products="getCategoryProducts" />
      <div class="t-flex t-items-center t-justify-center" v-if="moreProductsInSearchResults">
        <button-component type="ghost" @click.native="loadMoreProducts" :disabled="loadingProducts">
          {{ loadingProducts ? $t('Patience please ...') : $t('More products') }}
        </button-component>
      </div>
      <div class="t-bg-white t-mx-4 t-p-4 t-py-10 t-text-center" v-if="isCategoryEmpty">
        <h4 class="t-text-base t-bold" data-testid="noProductsInfo">
          {{ $t('No products found!') }}
        </h4>
        <p class="t-text-sm t-text-base-light">
          {{ $t('Please change Your search criteria and try again.') }}
        </p>
      </div>
    </div>

    <async-sidebar
      :async-component="FilterSidebar"
      :is-open="isSidebarOpen"
      @close="$store.commit('ui/setCategoryfilter')"
      direction="left"
    />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

import config from 'config'
import rootStore from '@vue-storefront/core/store'
import { mapGetters, mapState } from 'vuex'
import { isServer } from '@vue-storefront/core/helpers'
import { catalogHooksExecutors } from '@vue-storefront/core/modules/catalog-next/hooks'
import { getSearchOptionsFromRouteParams } from '@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers'

import AsyncSidebar from 'theme/components/theme/blocks/AsyncSidebar/AsyncSidebar.vue'
import Sidebar from 'theme/components/core/blocks/Category/Sidebar'
import SortBy from 'theme/components/core/blocks/Category/SortBy'
import Presets from 'theme/components/core/blocks/Category/Presets'
import ProductListing from 'theme/components/core/ProductListing'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import Dropdown from 'theme/components/core/blocks/Dropdown'
import ButtonComponent from 'theme/components/core/blocks/Button'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

import CategoryMixin from 'icmaa-catalog/components/Category'
import CategoryExtrasHeader from 'theme/components/core/blocks/CategoryExtras/Header'
import CategoryExtrasMixin from 'icmaa-category-extras/mixins/categoryExtras'
import CategoryMetaMixin from 'icmaa-meta/mixins/categoryMeta'

const FilterSidebar = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-sidebar-categoryfilter" */ 'theme/components/core/blocks/Category/Sidebar')

const composeInitialPageState = async (store, route, forceLoad = false, pageSize) => {
  try {
    const filters = getSearchOptionsFromRouteParams(route.params)
    const cachedCategory = store.getters['category-next/getCategoryFrom'](route.path)
    const currentCategory = cachedCategory && !forceLoad ? cachedCategory : await store.dispatch('category-next/loadCategory', { filters })

    await store.dispatch('category-next/loadCategoryProducts', { route, category: currentCategory, pageSize })

    const breadCrumbsLoader = store.dispatch('category-next/loadCategoryBreadcrumbs', currentCategory)
    if (isServer) {
      await breadCrumbsLoader
    }

    catalogHooksExecutors.categoryPageVisited(currentCategory)
  } catch (e) {
    console.error('Problem with setting Category initial data!', e)
  }
}

export default {
  components: {
    AsyncSidebar,
    LazyHydrate,
    Dropdown,
    ButtonComponent,
    MaterialIcon,
    Presets,
    ProductListing,
    Breadcrumbs,
    SortBy,
    CategoryExtrasHeader
  },
  mixins: [ CategoryMixin, CategoryExtrasMixin, CategoryMetaMixin ],
  data () {
    return {
      pageSizes: [24, 48, 60, 100],
      pageSize: this.$route && this.$route.query.pagesize ? this.$route.query.pagesize : 24,
      mobileFilters: false,
      loadingProducts: false,
      loading: true,
      FilterSidebar
    }
  },
  computed: {
    ...mapState({
      isSidebarOpen: state => state.ui.categoryfilter
    }),
    ...mapGetters({
      getCurrentSearchQuery: 'category-next/getCurrentSearchQuery',
      getCategoryProducts: 'category-next/getCategoryProducts',
      getCurrentCategory: 'category-next/getCurrentCategory',
      getCategoryProductsTotal: 'category-next/getCategoryProductsTotal',
      getProductsStats: 'category-next/getCategorySearchProductsStats'
    }),
    isLazyHydrateEnabled () {
      return config.ssr.lazyHydrateFor.includes('category-next.products')
    },
    isCategoryEmpty () {
      return this.getCategoryProductsTotal === 0
    },
    getBreadcrumbs () {
      return this.$store.getters['category-next/getBreadcrumbs'].filter(breadcrumb => breadcrumb.name !== this.getCurrentCategory.name)
    },
    pageSizeOptions () {
      return this.pageSizes.map(s => { return { value: s, label: s } })
    },
    moreProductsInSearchResults () {
      const { perPage, start, total } = this.getProductsStats
      return (start + perPage < total)
    }
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    const { pageSize } = this.data()
    await composeInitialPageState(store, route, false, route.params.pagesize || pageSize)
  },
  async beforeRouteEnter (to, from, next) {
    if (isServer) next() // SSR no need to invoke SW caching here
    else if (!from.name) { // SSR but client side invocation, we need to cache products and invoke requests from asyncData for offline support
      next(async vm => {
        vm.loading = true
        await composeInitialPageState(vm.$store, to, true, vm.pageSize)
        await vm.$store.dispatch('category-next/cacheProducts', { route: to }) // await here is because we must wait for the hydration
        vm.loading = false
      })
    } else { // Pure CSR, with no initial category state
      next(async vm => {
        vm.loading = true
        vm.$store.dispatch('category-next/cacheProducts', { route: to })
        vm.loading = false
      })
    }
  },
  methods: {
    async changeFilter (filterVariants) {
      if (!Array.isArray(filterVariants)) {
        filterVariants = [filterVariants]
      }

      this.$store.dispatch('category-next/switchSearchFilters', filterVariants)
    },
    openFilters () {
      this.$store.dispatch('ui/setCategoryfilter')
    },
    changePageSize (size) {
      this.pageSize = size
      this.$store.dispatch('category-next/switchSearchFilters', [ { type: 'pagesize', id: size } ])
    },
    async loadMoreProducts () {
      if (this.loadingProducts) {
        return
      }

      try {
        this.loadingProducts = true
        await this.$store.dispatch('category-next/loadMoreCategoryProducts')
      } catch (e) {
        console.error('Problem with fetching more products', e)
      } finally {
        this.loadingProducts = false
      }
    }
  }
}
</script>
