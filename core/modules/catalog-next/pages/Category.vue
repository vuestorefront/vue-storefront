<template>
  <div id="category-page">
    <slot v-bind="{ 
      currentSearchQuery, 
      categoryProducts, 
      currentCategory, 
      categoryProductsTotal, 
      currentFilters,
      availableFilters,
      categories,
      isCategoryEmpty,
      breadcrumbs,
      changeFilter,
      loading,
      sortBy
    }"/>
  </div>
</template>

<script>
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import { mapGetters } from 'vuex'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'

export const composeInitialPageState = async (store, route) => {
  try {
    await store.dispatch('attribute/list', { // load filter attributes for this specific category
      filterValues: config.products.defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
      includeFields: config.entities.optimize && isServer ? config.entities.attribute.includeFields : null
    })
    const searchPath = route.path.substring(1) // TODO change in mage2vuestorefront to url_paths starts with / sign
    const categoryFilters = { 'url_path': searchPath }
    // const categoryFilters = { 'slug': route.params.slug } // If you have disabled config.products.useMagentoUrlKeys in your project then use this way
    const currentCategory = await store.dispatch('category-next/loadCategory', {filters: categoryFilters})
    await store.dispatch('category-next/loadCategoryProducts', {route, category: currentCategory})
    await store.dispatch('category-next/loadCategoryBreadcrumbs', currentCategory)
  } catch (e) {
    console.error('Problem with setting Category initial data!', e)
  }
}

export default {
  name: 'CategoryPage',
  mixins: [onBottomScroll],
  data () {
    return {
      sortBy: 'updated_at',
      loading: {
        categories: true,
        products: false
      }
    }
  },
  computed: {
    ...mapGetters({
      currentSearchQuery: 'category-next/getCurrentSearchQuery',
      categoryProducts: 'category-next/getCategoryProducts',
      currentCategory: 'category-next/getCurrentCategory',
      categoryProductsTotal: 'category-next/getCategoryProductsTotal',
      currentFilters: 'category-next/getCurrentFilters',
      availableFilters: 'category-next/getAvailableFilters',
      categories: 'category-next/getCategories'
    }),
    isCategoryEmpty () {
      return this.categoryProductsTotal === 0
    },
    breadcrumbs () {
      return this.$store.getters['category-next/getBreadcrumbs'].filter(breadcrumb => breadcrumb.name !== this.currentCategory.name)
    }
  },
  methods: {
    async changeFilter (filterVariant) {
      this.$store.dispatch('category-next/switchSearchFilter', filterVariant).then(() => {
        console.info('changed')
      })
    },
    async onBottomScroll () {
      if (this.loading.products) return
      this.loading.products = true
      try {
        await this.$store.dispatch('category-next/loadMoreCategoryProducts')
      } catch (e) {
        console.error('Problem with fetching more products', e)
      } finally {
        this.loading.products = false
      }
    }
  },
  async beforeRouteEnter (to, from, next) {
    if (isServer) next() // SSR no need to invoke SW caching here
    else if (from.name) { // SSR but client side invocation, we need to cache products
      next(async vm => {
        await vm.$store.dispatch('category-next/cacheProducts', { route: to })
        // Fetch only on CSR
        await vm.$store.dispatch('category-next/loadCategories')
      })
    } else { // Pure CSR, with no initial category state
      next(async vm => {
        await composeInitialPageState(vm.$store, to)
        await vm.$store.dispatch('category-next/cacheProducts', { route: to })
        // Fetch only on CSR
      })
    }
  },
  created () {
    this.$store.dispatch('category-next/loadCategories').then(() => {
      this.loading.categories = false
    })
  }
}
</script>