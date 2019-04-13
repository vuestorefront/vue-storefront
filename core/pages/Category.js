import i18n from '@vue-storefront/i18n'
import store from '@vue-storefront/core/store'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { baseFilterProductsQuery, isServer } from '@vue-storefront/core/helpers'
import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'
import { mapGetters, mapActions } from 'vuex'

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
      if (context) context.output.cacheTags.add(`category`)
      const defaultFilters = store.state.config.products.defaultFilters
      store.dispatch('category/resetFilters')
      EventBus.$emit('filter-reset')
      await store.dispatch('attribute/list', { // load filter attributes for this specific category
        filterValues: defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        includeFields: store.state.config.entities.optimize && isServer ? store.state.config.entities.attribute.includeFields : null
      })
      const parentCategory = await store.dispatch('category/single', { key: store.state.config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: route.params.slug })
      const query = await store.dispatch('category/initialProductsQuery', { route, defaultFilters, parentCategory })
      const subloaders = await store.dispatch('category/products', query)
      if (subloaders) {
        await Promise.all(subloaders)
        await EventBus.$emitFilter('category-after-load', { store: store, route: route })
      } else {
        throw new Error('Category query returned empty result')
      }
    } catch (err) {
      Logger.error(err)()
      throw err
    }
  },
  async beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading category products to cache on SSR render
      next(vm => {
        const defaultFilters = store.state.config.products.defaultFilters
        let parentCategory = store.getters['category/getCurrentCategory']
        let query = store.getters['category/getCurrentCategoryProductQuery']
        if (!query.searchProductQuery) {
          store.dispatch('category/mergeSearchOptions', {
            searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters)
          })
        }
        store.dispatch('category/products', query)
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
  beforeRouteUpdate (to, from, next) {
    this.validateRoute(to)
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
      this.$store.dispatch('category/updateProductsFilters', { filterOption })
    },
    onSortOrderChanged (param) {
      if (param.attribute) this.$store.dispatch('category/updateProductsFilters', { sortOption: param.attribute })
    },
    validateRoute (route = this.$route) { // TODO: Merge with asyncData
      this.$store.dispatch('category/resetFilters')
      this.$bus.$emit('filter-reset')

      this.$store.dispatch('category/single', { key: this.$store.state.config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: route.params.slug }).then(category => {
        if (!category) {
          this.$router.push(this.localizedRoute('/'))
        } else {
          this.pagination.current = 0
          let searchProductQuery = baseFilterProductsQuery(this.getCurrentCategory, store.state.config.products.defaultFilters)
          this.$bus.$emit('current-category-changed', this.getCurrentCategoryPath)
          this.mergeSearchOptions({ // base prototype from the asyncData is being used here
            current: this.pagination.current,
            perPage: this.pagination.perPage,
            store: this.$store,
            route: this.$route,
            append: false,
            populateAggregations: true
          })
          if (!this.getCurrentCategoryProductQuery.searchProductQuery) {
            this.mergeSearchOptions({
              searchProductQuery
            })
          }
          this.$store.dispatch('category/products', this.getCurrentCategoryProductQuery)
          this.$bus.$emitFilter('category-after-load', { store: this.$store, route: route })
        }
      }).catch(err => {
        if (err.message.indexOf('query returned empty result') > 0) {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t('The product, category or CMS page is not available in Offline mode. Redirecting to Home.'),
            action1: { label: i18n.t('OK') }
          })
          this.$router.push(localizedRoute('/', currentStoreView().storeCode))
        }
      })
    },
    onUserPricesRefreshed () { // TODO: Move to Vuex
      const defaultFilters = store.state.config.products.defaultFilters
      this.$store.dispatch('category/single', {
        key: this.$store.state.config.products.useMagentoUrlKeys ? 'url_key' : 'slug',
        value: this.$route.params.slug
      }).then((parentCategory) => {
        if (!this.getCurrentCategoryProductQuery.searchProductQuery) {
          this.mergeSearchOptions({
            searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters),
            skipCache: true
          })
        }
        this.$store.dispatch('category/products', this.getCurrentCategoryProductQuery)
      })
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
