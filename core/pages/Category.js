import Vue from 'vue'
// import toString from 'lodash-es/toString'

import store from '@vue-storefront/store'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { baseFilterProductsQuery, buildFilterProductsQuery } from '@vue-storefront/store/helpers'
import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import { currentStoreView, localizedRoute } from '@vue-storefront/store/lib/multistore'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'Category',
  mixins: [Composite],
  data () {
    return {
      pagination: {
        perPage: 50,
        current: 0,
        enabled: false
      },
      bottom: false,
      lazyLoadProductsOnscroll: true
    }
  },
  computed: {
    products () {
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
    categorySlug () {
      return this.$store.state.category.current ? this.$store.state.category.current.slug : ''
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
    console.log('ASYNC$$$$')
    return new Promise((resolve, reject) => {
      Logger.info('Entering asyncData in Category Page (core)')()
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
              if (store.state.config.filters.deepLinking) {
                if (route.query) {
                  for (const prop in route.query) {
                    let filterObject = {}
                    if (defaultFilters.indexOf(prop) !== -1) {
                      if (prop === 'price') {
                        let range = route.query[prop].split('-')

                        filterObject = {
                          attribute_code: prop,
                          id: [range[0] + '-' + range[1]],
                          label: '$' + range[0] + ' - ' + '$' + range[1]
                        }
                      } else {
                        filterObject = {
                          attribute_code: prop,
                          id: route.query[prop].split(',')
                        }
                      }
                      Vue.set(store.state.category.filters.chosen, prop, filterObject)
                    }
                  }
                }
                let hasFilters = !(Object.keys(store.state.category.filters.chosen).length === 0 && store.state.category.filters.chosen.constructor === Object)
                if (hasFilters) {
                  const fsC = Object.assign({}, store.state.category.filters.chosen) // create a copy because it will be used asynchronously (take a look below)
                  const filterQr = buildFilterProductsQuery(parentCategory, store.state.category.filters.chosen, defaultFilters)

                  query = Object.assign(query, {
                    searchProductQuery: filterQr,
                    configuration: fsC
                  })
                } else {
                  query = Object.assign(query, { searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters) })
                }
              } else {
                query = Object.assign(query, { searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters) })
              }
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
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    pullMoreProducts () {
      let currentQuery = this.currentQuery
      currentQuery.append = true
      currentQuery.route = this.$route
      currentQuery.store = this.$store
      currentQuery.current = currentQuery.current + currentQuery.perPage
      this.pagination.current = currentQuery.current
      this.pagination.perPage = currentQuery.perPage
      if (currentQuery.current <= this.productsTotal) {
        currentQuery.searchProductQuery = buildFilterProductsQuery(this.category, this.filters.chosen)
        return this.$store.dispatch('category/products', currentQuery)
      }
    },
    setFilterQueryString () {
      let queryString = {}
      for (let prop in this.filters.chosen) {
        if (prop === 'price') {
          let range = this.filters.chosen[prop].id[0].split('-')
          queryString[prop] = range[0] + '-' + range[1]
        } else {
          queryString[prop] = this.filters.chosen[prop].id.join(',')
        }
      }
      let currentQuery = {}
      if (this.$route.query.page) {
        currentQuery.page = this.$route.query.page
      }
      if (this.$route.query.dir) {
        currentQuery.dir = this.$route.query.dir
      }
      if (this.$route.query.order) {
        currentQuery.order = this.$route.query.order
      }
      if (this.$route.query.referral) {
        currentQuery.referral = this.$route.query.referral
      }
      let query = Object.assign({}, currentQuery, queryString)
      console.log('## query ', query)
      this.$router.push({ query: query })
    },
    deletePageFromQueryString () {
      let query = this.$route.query
      delete query['page']
      this.$router.push({query})
    },
    onFilterChanged (filterOption) {
      this.deletePageFromQueryString() // if there is any 'page' get param, delete it
      if (!filterOption.attribute_code || !filterOption.id) {
        return
      }

      this.pagination.current = 0
      let filterIdsArray = []
      let filterObject = {
        attribute_code: filterOption.attribute_code,
        id: filterIdsArray,
        label: filterOption.label
      }
      if (store.state.config.filters.multipleSelect) {
        if (this.filters.chosen[filterOption.attribute_code]) { // if there is something in vuex filters.choosen add it to local object
          filterObject.id = this.filters.chosen[filterOption.attribute_code].id
        }
        if (filterObject.id.includes(filterOption.id)) { // means that user want to deactivate filter, so delete this array element
          this.clearStoreCurrentFilters(filterOption.attribute_code)
          if (filterObject.id.length > 1) {
            let index = filterObject.id.indexOf(filterOption.id)
            if (index > -1) {
              filterObject.id.splice(index, 1)
              this.setStoreCurrentFilter(filterOption.attribute_code, filterObject)
            }
          }
        } else {
          filterObject.id.push(filterOption.id)
          this.setStoreCurrentFilter(filterOption.attribute_code, filterObject)
        }
      } else {
        if (this.filters.chosen[filterOption.attribute_code] &&
          ((filterOption.id === this.filters.chosen[filterOption.attribute_code].id[0]) ||
            filterOption.id === this.filters.chosen[filterOption.attribute_code].id)) {
          this.clearStoreCurrentFilters(filterOption.attribute_code)
        } else {
          filterObject.id.push(filterOption.id)
          this.setStoreCurrentFilter(filterOption.attribute_code, filterObject)
        }
      }
      if (store.state.config.filters.instantFiltering) {
        this.setFilters()
      } else {
        this.$bus.$on('filter-form-send', this.setFilters())
      }
      this.setFilterQueryString()
    },
    setStoreCurrentFilter (attributeCode, filterObject) {
      Vue.set(this.filters.chosen, attributeCode, filterObject) // TODO change vue.set to commit, make new mutation
    },
    clearStoreCurrentFilters (attributeCode) {
      Vue.delete(this.filters.chosen, attributeCode) // TODO change vue.delete to commit, make new mutation
    },
    setFilters () {
      let filterQr = buildFilterProductsQuery(this.category, this.filters.chosen, this.$store.state.category.current_product_query.filters)
      let hasFilters = !(Object.keys(this.filters.chosen).length === 0 && this.filters.chosen.constructor === Object)
      let fsC = null
      if (hasFilters) {
        fsC = Object.assign({}, this.filters.chosen) // create a copy because it will be used asynchronously (take a look below)
      }

      this.$store.state.category.current_product_query = Object.assign(this.$store.state.category.current_product_query, {
        populateAggregations: false,
        searchProductQuery: filterQr,
        current: this.pagination.current,
        perPage: this.pagination.perPage,
        configuration: fsC,
        append: false,
        includeFields: null,
        excludeFields: null
      })
      this.$store.dispatch('category/products', this.$store.state.category.current_product_query).then((res) => {
      }) // because already aggregated
    },
    onSortOrderChanged (param) {
      this.pagination.current = 0
      if (param.attribute) {
        const filtersConfig = Object.assign({}, this.filters.chosen) // create a copy because it will be used asynchronously (take a look below)
        let filterQr = buildFilterProductsQuery(this.category, this.filters.chosen)
        this.$store.state.category.current_product_query = Object.assign(this.$store.state.category.current_product_query, {
          sort: param.attribute,
          searchProductQuery: filterQr,
          current: this.pagination.current,
          perPage: this.pagination.perPage,
          configuration: filtersConfig,
          append: false,
          includeFields: null,
          excludeFields: null
        })
        this.$store.dispatch('category/products', this.$store.state.category.current_product_query).then((res) => {
        })
      } else {
        this.notify()
      }
    },
    validateRoute () {
      if (this.$route.params.slug !== this.categorySlug) {
        this.filters.chosen = {} // reset selected filters
        this.$bus.$emit('filter-reset')

        this.$store.dispatch('category/single', { key: 'slug', value: this.$route.params.slug }).then(category => {
          if (!category) {
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
    onUserPricesRefreshed () {
      const defaultFilters = store.state.config.products.defaultFilters
      this.$store.dispatch('category/single', {
        key: 'slug',
        value: this.$route.params.slug
      }).then((parentCategory) => {
        let query = this.$store.state.category.current_product_query
        if (!query.searchProductQuery) {
          query = Object.assign(query, {
            searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters),
            skipCache: true
          })
        }
        this.$store.dispatch('category/products', query)
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
      title: htmlDecode(this.$route.meta.title || this.categoryName),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: htmlDecode(this.$route.meta.description) }] : []
    }
  }
}
