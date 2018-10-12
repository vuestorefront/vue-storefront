import Vue from 'vue'
// import toString from 'lodash-es/toString'

import store from '@vue-storefront/store'
import EventBus from '@vue-storefront/core/plugins/event-bus'
import { baseFilterProductsQuery } from '@vue-storefront/store/helpers'
// import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
// import i18n from '@vue-storefront/i18n'

import Composite from '@vue-storefront/core/mixins/composite'

export default {
  name: 'CmsPage',
  mixins: [Composite],
  data () {
    return {
    }
  },
  computed: {
    cmsPage () {
      return this.$store.state.product.list.items
    },
    productsCounter () {
      return this.$store.state.product.list.items ? this.$store.state.product.list.items.length : 0
    },
    productsTotal () {
      return this.$store.state.product.list.total
    },
    currentQuery () {
      return this.$store.state.category.current_product_query
    },
    isCategoryEmpty () {
      return (!(this.$store.state.product.list.items) || this.$store.state.product.list.items.length === 0)
    },
    category () {
      return this.$store.state.category.current
    },
    categoryName () {
      return this.$store.state.category.current ? this.$store.state.category.current.name : ''
    },
    categoryId () {
      return this.$store.state.category.current ? this.$store.state.category.current.id : ''
    },
    filters () {
      return this.$store.state.category.filters
    },
    breadcrumbs () {
      return this.$store.state.category.breadcrumbs
    }
  },
  watch: {
    '$route': 'validateRoute',
    bottom (bottom) {
      if (bottom) {
        this.pullMoreProducts()
      }
    }
  },
  preAsyncData ({ store, route }) {
    console.log('preAsyncData query setup')
    store.state.category.current_product_query = {
      populateAggregations: true,
      store: store,
      route: route,
      current: 0,
      perPage: 50,
      sort: store.state.config.entities.productList.sort,
      filters: store.state.config.products.defaultFilters,
      includeFields: store.state.config.entities.optimize && Vue.prototype.$isServer ? store.state.config.entities.productList.includeFields : null,
      excludeFields: store.state.config.entities.optimize && Vue.prototype.$isServer ? store.state.config.entities.productList.excludeFields : null,
      append: false
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Category root ' + new Date())
      if (context) context.output.cacheTags.add(`category`)
      const defaultFilters = store.state.config.products.defaultFilters
      store.dispatch('category/list', { includeFields: store.state.config.entities.optimize && Vue.prototype.$isServer ? store.state.config.entities.category.includeFields : null }).then((categories) => {
        store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
          includeFields: store.state.config.entities.optimize && Vue.prototype.$isServer ? store.state.config.entities.attribute.includeFields : null
        }).catch(err => {
          console.error(err)
          reject(err)
        }).then((attrs) => {
          store.dispatch('category/single', { key: 'slug', value: route.params.slug }).then((parentCategory) => {
            let query = store.state.category.current_product_query
            if (!query.searchProductQuery) {
              query = Object.assign(query, { searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters) })
            }
            store.dispatch('category/products', query).then((subloaders) => {
              if (subloaders) {
                Promise.all(subloaders).then((results) => {
                  EventBus.$emitFilter('category-after-load', { store: store, route: route }).then((results) => {
                    return resolve()
                  }).catch((err) => {
                    console.error(err)
                    return resolve()
                  })
                }).catch(err => {
                  console.error(err)
                  reject(err)
                })
              } else {
                const err = new Error('Category query returned empty result')
                console.error(err)
                reject(err)
              }
            }).catch(err => {
              console.error(err)
              reject(err)
            })
          }).catch(err => {
            console.error(err)
            reject(err)
          })
        })
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  },
  beforeMount () {
    this.$bus.$on('filter-changed-category', this.onFilterChanged)
    this.$bus.$on('list-change-sort', this.onSortOrderChanged)
    if (store.state.config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.onUserPricesRefreshed)
      this.$bus.$on('user-after-logout', this.onUserPricesRefreshed)
    }
    if (!Vue.prototype.$isServer && this.lazyLoadProductsOnscroll) {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
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
  methods: {
    validateRoute () {
      this.filters.chosen = {} // reset selected filters
      this.$bus.$emit('filter-reset')

      this.$store.dispatch('category/single', { key: 'slug', value: this.$route.params.slug }).then(cmsPage => {
        if (!cmsPage) {
          this.$router.push('/')
        } else {
          this.pagination.current = 0
          let searchProductQuery = baseFilterProductsQuery(this.$store.state.category.current, store.state.config.products.defaultFilters)
          this.$bus.$emit('current-category-changed', this.$store.state.category.current_path)
          let query = this.$store.state.category.current_product_query
          query = Object.assign(query, { // base prototype from the asyncData is being used here
            current: this.pagination.current,
            perPage: this.pagination.perPage,
            store: this.$store,
            route: this.$route,
            append: false,
            populateAggregations: true
          })
          if (!query.searchProductQuery) {
            query.searchProductQuery = searchProductQuery
          }
          this.$store.dispatch('category/products', this.$store.state.category.current_product_query)
          EventBus.$emitFilter('category-after-load', { store: this.$store, route: this.$route })
        }
      })
    }
  },
  metaInfo () {
    // return {
    //  title: htmlDecode(this.$route.meta.title || this.categoryName),
    //  meta: this.$route.meta.description ? [{ vmid: 'description', description: htmlDecode(this.$route.meta.description) }] : []
    // }
  }
}
