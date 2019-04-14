import i18n from '@vue-storefront/i18n'
import store from '@vue-storefront/core/store'
import { isServer } from '@vue-storefront/core/helpers'
import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'
import { mapGetters, mapActions } from 'vuex'
import { buildFilterQueryString } from '@vue-storefront/core/modules/catalog/helpers/url'

export default {
  name: 'Category',
  mixins: [Composite],
  data () {
    return {
      bottom: false,
      lazyLoadProductsOnscroll: true
    }
  },
  computed: {
    ...mapGetters('category', ['getCurrentCategory', 'getCurrentCategoryProductQuery', 'getAllCategoryFilters', 'getCategoryBreadcrumbs', 'getCurrentCategoryPath', 'getCurrentPagination']),
    products () {
      return this.$store.state.product.list.items
    },
    productsCounter () {
      return this.$store.state.product.list.items ? this.$store.state.product.list.items.length : 0
    },
    productsTotal () {
      return this.$store.state.product.list.total
    },
    pagination () {
      return this.getCurrentPagination
    },
    currentQuery () {
      return this.getCurrentCategoryProductQuery
    },
    isCategoryEmpty () {
      return (!(this.$store.state.product.list.items) || this.$store.state.product.list.items.length === 0)
    },
    category () {
      return this.getCurrentCategory
    },
    categoryName () {
      return this.getCurrentCategory ? this.getCurrentCategory.name : ''
    },
    categoryId () {
      return this.getCurrentCategory ? this.getCurrentCategory.id : ''
    },
    filters () {
      return this.getAllCategoryFilters
    },
    breadcrumbs () {
      return this.getCategoryBreadcrumbs
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        this.pullMoreProducts()
      }
    }
  },
  preAsyncData ({ store, route }) {
    Logger.log('preAsyncData query setup')()
    store.dispatch('category/setSearchOptions', {
      populateAggregations: true,
      store: store,
      route: route,
      current: 0,
      perPage: 50,
      sort: store.state.config.entities.productList.sort,
      filters: store.state.config.products.defaultFilters,
      includeFields: store.state.config.entities.optimize && isServer ? store.state.config.entities.productList.includeFields : null,
      excludeFields: store.state.config.entities.optimize && isServer ? store.state.config.entities.productList.excludeFields : null,
      append: false
    })
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    Logger.info('Entering asyncData in Category Page (core)')()
    try {
      return store.dispatch('category/fetchAsync', { slug: route.params.slug, route: route, ssrContext: context })
    } catch (err) {
      Logger.error(err)()
      throw err
    }
  },
  async beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading category products to cache on SSR render
      next(vm => {
        store.dispatch('category/fetchAsync', { route: to, context: null, slug: to.params.slug, cacheOnly: true })
      })
    } else {
      next()
    }
  },
  beforeMount () {
    this.$bus.$on('filter-changed-category', this.onFilterChanged)
    this.$bus.$on('list-change-sort', this.onSortOrderChanged)
    if (store.state.config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.onUserPricesRefreshed)
      this.$bus.$on('user-after-logout', this.onUserPricesRefreshed)
    }
    if (!isServer && this.lazyLoadProductsOnscroll) {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      }, {passive: true})
    }
  },
  beforeDestroy () {
    this.$bus.$off('list-change-sort', this.onSortOrderChanged)
    this.$bus.$off('filter-changed-category', this.onFilterChanged)
    if (store.state.config.usePriceTiers) {
      this.$bus.$off('user-after-loggedin', this.onUserPricesRefreshed)
      this.$bus.$off('user-after-logout', this.onUserPricesRefreshed)
    }
  },
  async beforeRouteUpdate (to, from, next) {
    if (from.path !== to.path) { // category changed - not just filters
      try {
        await this.$store.dispatch('category/fetchAsync', { route: to, context: null, slug: to.params.slug })
      } catch (err) {
        if (err.message.indexOf('query returned empty result') > 0) {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t('The product, category or CMS page is not available in Offline mode. Redirecting to Home.'),
            action1: { label: i18n.t('OK') }
          })
          this.$router.push(localizedRoute('/', currentStoreView().storeCode))
        }
      }
    }
    next()
  },
  methods: {
    ...mapActions('category', ['mergeSearchOptions']),
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    pullMoreProducts () {
      if (typeof navigator !== 'undefined' && !navigator.onLine) return
      this.$store.dispatch('category/pullMoreProducts', { route: this.$route, store: this.$store })
    },
    onFilterChanged (filterOption) {
      this.$store.dispatch('category/updateProductsFilters', { filterOption, fetchProducts: !store.state.config.filters.deepLinking })
      if (store.state.config.filters.deepLinking) {
        this.$router.push({ query: buildFilterQueryString({ route: this.$route, filters: this.filters }) }) // will execute asyncData anyway
      }
    },
    onSortOrderChanged (param) {
      if (param.attribute) this.$store.dispatch('category/updateProductsFilters', { sortOption: param.attribute })
    },
    onUserPricesRefreshed () {
      this.$store.dispatch('category/fetchAsync', { route: this.$route, context: null, slug: this.$route.params.slug, skipCache: true })
    }
  },
  metaInfo () {
    const storeView = currentStoreView()
    return {
      link: [
        { rel: 'amphtml',
          href: this.$router.resolve(localizedRoute({
            name: 'category-amp',
            params: {
              slug: this.category.slug
            }
          }, storeView.storeCode)).href
        }
      ],
      title: htmlDecode(this.category.meta_title || this.categoryName),
      meta: this.category.meta_description ? [{ vmid: 'description', description: htmlDecode(this.category.meta_description) }] : []
    }
  }
}
