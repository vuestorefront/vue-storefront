<template>
  <div id="category">
    <header class="t-container">
      <div class="t-flex t-flex-wrap t-px-4 t-mb-8">
        <category-extras-header class="t-bg-white t--mx-4 md:t-mx-0 md:t-mt-4 lg:t-w-full">
          <div class="t-hidden lg:t-flex" v-if="viewport !== 'sm'">
            <button-component type="primary" icon="directions_bus" class="t-mr-2 t-font-bold" v-scroll-to="'#category-info-footer'">
              {{ $t('ON TOUR') }}
            </button-component>
            <button-component v-scroll-to="'#category-info-footer'">
              {{ $t('More info\'s') }}
            </button-component>
          </div>
        </category-extras-header>
        <breadcrumbs :routes="breadcrumbs" :active-route="getCurrentCategory.name" class="t-w-full t-my-8" />
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
              <presets class="t-hidden lg:t-flex t-items-center t-ml-2" />
            </div>
            <div class="t-w-1/2 lg:t-w-1/4 t-px-1 lg:t-px-2">
              <sort-by :has-label="true" @change="changeFilter" :value="getCurrentSearchQuery.sort" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="t-container">
      <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
        <product-listing :products="getCategoryProducts" />
      </lazy-hydrate>
      <product-listing v-else :products="getCategoryProducts" />
      <div class="t-flex t-items-center t-justify-center t-pb-8" v-if="moreProductsInSearchResults">
        <button-component type="ghost" @click.native="loadMoreProducts" :disabled="loadingProducts" class="t-w-2/3 lg:t-w-1/4" :class="{ 't-relative t-opacity-60': loadingProducts }">
          {{ $t('Load more') }}
          <loader-background v-if="loadingProducts" bar="t-bg-base-darkest" class="t-bottom-0" />
        </button-component>
      </div>
      <div class="t-pb-8">
        <div class="t-bg-white t-mx-4 t-p-4 t-py-10 t-text-center" v-if="isCategoryEmpty">
          <h4 class="t-text-base t-bold" data-testid="noProductsInfo">
            {{ $t('No products found!') }}
          </h4>
          <p class="t-text-sm t-text-base-light">
            {{ $t('Please change Your search criteria and try again.') }}
          </p>
        </div>
      </div>
      <lazy-hydrate when-visible>
        <category-extras-footer id="category-info-footer" class="t-pb-8" />
      </lazy-hydrate>
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
import LoaderBackground from 'theme/components/core/LoaderBackground'

import CategoryMixin from 'icmaa-catalog/components/Category'
import CategoryExtrasHeader from 'theme/components/core/blocks/CategoryExtras/Header'
import CategoryExtrasFooter from 'theme/components/core/blocks/CategoryExtras/Footer'
import CategoryExtrasMixin from 'icmaa-category-extras/mixins/categoryExtras'
import CategoryMetaMixin from 'icmaa-meta/mixins/categoryMeta'

const FilterSidebar = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-sidebar-categoryfilter" */ 'theme/components/core/blocks/Category/Sidebar')

const composeInitialPageState = async (store, route, forceLoad = false, pageSize) => {
  try {
    const filters = getSearchOptionsFromRouteParams(route.params)
    const cachedCategory = store.getters['category-next/getCategoryFrom'](route.path)
    const hasCategoryExtras = store.getters['icmaaCategoryExtras/getCategoryExtrasByUrlKey'](route.path)
    const currentCategory = cachedCategory && !forceLoad && hasCategoryExtras ? cachedCategory : await store.dispatch('category-next/loadCategoryWithExtras', { filters })
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
    LoaderBackground,
    Presets,
    ProductListing,
    Breadcrumbs,
    SortBy,
    CategoryExtrasHeader,
    CategoryExtrasFooter
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
      breadcrumbs: 'category-next/getBreadcrumbs',
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

<style lang="scss">

/** Only show cropped header on desktop */
@media (min-width: 1024px) {
  header .category-header {
    padding-top: calc(4%*100/19);
    overflow: hidden;

    & > img {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}

</style>
