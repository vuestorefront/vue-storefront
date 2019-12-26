import Vue from 'vue'
import toString from 'lodash-es/toString'
import config from 'config'

import i18n from '@vue-storefront/i18n'
import store from '@vue-storefront/core/store'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { baseFilterProductsQuery, buildFilterProductsQuery, isServer } from '@vue-storefront/core/helpers'
import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'
import { mapGetters, mapActions } from 'vuex'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'

export default {
  name: 'Category',
  mixins: [Composite, onBottomScroll],
  data () {
    return {
      pagination: {
        perPage: 50,
        current: 0,
        enabled: false
      },
      lazyLoadProductsOnscroll: true
    }
  },
  computed: {
    ...mapGetters('category', ['getCurrentCategory', 'getCurrentCategoryProductQuery', 'getAllCategoryFilters', 'getCategoryBreadcrumbs', 'getCurrentCategoryPath']),
    ...mapGetters('tax', ['getIsUserGroupedTaxActive']),
    products () {
      return this.$store.getters['product/list']
    },
    productsCounter () {
      return this.products ? this.products.length : 0
    },
    productsTotal () {
      return this.$store.state.product.list.total
    },
    currentQuery () {
      return this.getCurrentCategoryProductQuery
    },
    isCategoryEmpty () {
      return (!(this.products) || this.products.length === 0)
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
  preAsyncData ({ store, route }) {
    Logger.log('preAsyncData query setup')()
    const currentProductQuery = store.getters['category/getCurrentCategoryProductQuery']
    const sort = currentProductQuery && currentProductQuery.sort ? currentProductQuery.sort : config.entities.productList.sort
    store.dispatch('category/setSearchOptions', {
      populateAggregations: true,
      store: store,
      route: route,
      current: 0,
      perPage: 50,
      sort,
      filters: config.products.defaultFilters,
      includeFields: config.entities.optimize && isServer ? config.entities.productList.includeFields : null,
      excludeFields: config.entities.optimize && isServer ? config.entities.productList.excludeFields : null,
      append: false
    })
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    Logger.info('Entering asyncData in Category Page (core)')()
    try {
      if (context) context.output.cacheTags.add(`category`)
      const defaultFilters = config.products.defaultFilters
      store.dispatch('category/resetFilters')
      EventBus.$emit('filter-reset')
      await store.dispatch('attribute/list', { // load filter attributes for this specific category
        filterValues: defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        includeFields: config.entities.optimize && isServer ? config.entities.attribute.includeFields : null
      })
      const parentCategory = await store.dispatch('category/single', { key: config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: route.params.slug })
      let query = store.getters['category/getCurrentCategoryProductQuery']
      if (!query.searchProductQuery) {
        store.dispatch('category/mergeSearchOptions', {
          searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters)
        })
      }
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
        const defaultFilters = config.products.defaultFilters
        let parentCategory = store.getters['category/getCurrentCategory']
        let query = store.getters['category/getCurrentCategoryProductQuery']
        if (!query.searchProductQuery) {
          store.dispatch('category/mergeSearchOptions', {
            searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters),
            cacheOnly: true// this is cache only request
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
    if (config.usePriceTiers || this.getIsUserGroupedTaxActive) {
      this.$bus.$on('user-after-loggedin', this.onUserPricesRefreshed)
      this.$bus.$on('user-after-logout', this.onUserPricesRefreshed)
    }
  },
  beforeDestroy () {
    this.$bus.$off('list-change-sort', this.onSortOrderChanged)
    this.$bus.$off('filter-changed-category', this.onFilterChanged)
    if (config.usePriceTiers || this.getIsUserGroupedTaxActive) {
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
    onBottomScroll () {
      this.pullMoreProducts()
    },
    bottomVisible () {
      const scrollY = Math.ceil(window.scrollY)
      const visible = window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    pullMoreProducts () {
      if (typeof navigator !== 'undefined' && !navigator.onLine) return
      let current = this.getCurrentCategoryProductQuery.current + this.getCurrentCategoryProductQuery.perPage
      this.mergeSearchOptions({
        append: true,
        route: this.$route,
        store: this.$store,
        current
      })
      this.pagination.current = this.getCurrentCategoryProductQuery.current
      this.pagination.perPage = this.getCurrentCategoryProductQuery.perPage
      if (this.getCurrentCategoryProductQuery.current <= this.productsTotal) {
        this.mergeSearchOptions({
          searchProductQuery: buildFilterProductsQuery(this.category, this.filters.chosen)
        })
        return this.$store.dispatch('category/products', this.getCurrentCategoryProductQuery)
      }
    },
    onFilterChanged (filterOption) {
      this.pagination.current = 0
      if (this.filters.chosen[filterOption.attribute_code] && ((toString(filterOption.id) === toString(this.filters.chosen[filterOption.attribute_code].id)) || filterOption.id === this.filters.chosen[filterOption.attribute_code].id)) { // for price filter it's a string
        Vue.delete(this.filters.chosen, filterOption.attribute_code)
      } else {
        Vue.set(this.filters.chosen, filterOption.attribute_code, filterOption)
      }

      let filterQr = buildFilterProductsQuery(this.category, this.filters.chosen)

      const filtersConfig = Object.assign({}, this.filters.chosen) // create a copy because it will be used asynchronously (take a look below)
      this.mergeSearchOptions({
        populateAggregations: false,
        searchProductQuery: filterQr,
        current: this.pagination.current,
        perPage: this.pagination.perPage,
        configuration: filtersConfig,
        append: false,
        includeFields: null,
        excludeFields: null
      })
      this.$store.dispatch('category/products', this.getCurrentCategoryProductQuery).then((res) => {
      }) // because already aggregated
    },
    onSortOrderChanged (param) {
      this.pagination.current = 0
      if (param.attribute) {
        const filtersConfig = Object.assign({}, this.filters.chosen) // create a copy because it will be used asynchronously (take a look below)
        let filterQr = buildFilterProductsQuery(this.category, this.filters.chosen)
        this.mergeSearchOptions({
          sort: param.attribute,
          searchProductQuery: filterQr,
          current: this.pagination.current,
          perPage: this.pagination.perPage,
          configuration: filtersConfig,
          append: false,
          includeFields: null,
          excludeFields: null
        })
        this.$store.dispatch('category/products', this.getCurrentCategoryProductQuery).then((res) => {
        })
      } else {
        this.notify()
      }
    },
    validateRoute (route = this.$route) {
      this.$store.dispatch('category/resetFilters')
      this.$bus.$emit('filter-reset')

      this.$store.dispatch('category/single', { key: config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: route.params.slug }).then(category => {
        if (!category) {
          this.$router.push(this.localizedRoute('/'))
        } else {
          this.pagination.current = 0
          let searchProductQuery = baseFilterProductsQuery(this.getCurrentCategory, config.products.defaultFilters)
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
    onUserPricesRefreshed () {
      const defaultFilters = config.products.defaultFilters
      this.$store.dispatch('category/single', {
        key: config.products.useMagentoUrlKeys ? 'url_key' : 'slug',
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
      meta: this.category.meta_description ? [{ vmid: 'description', name: 'description', content: htmlDecode(this.category.meta_description) }] : []
    }
  }
}
