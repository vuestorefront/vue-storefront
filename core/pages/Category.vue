<template>
  <div id="Category">
    Core Category
  </div>
</template>

<script>
import config from 'config'
import Sidebar from 'core/components/blocks/Category/Sidebar.vue'
import ProductListing from 'core/components/ProductListing.vue'
import Breadcrumbs from 'core/components/Breadcrumbs.vue'
import { baseFilterProductsQuery, buildFilterProductsQuery } from '@vue-storefront/store/helpers'
import EventBus from 'core/plugins/event-bus'
import Composite from 'core/mixins/composite'
import _ from 'lodash'

export default {
  name: 'Category',
  metaInfo () {
    return {
      title: this.$route.meta.title || this.categoryName,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  mixins: [Composite],
  methods: {
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
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
    onFilterChanged (filterOption) {
      this.pagination.current = 0
      if (this.filters.chosen[filterOption.attribute_code] && ((_.toString(filterOption.id) === _.toString(this.filters.chosen[filterOption.attribute_code].id)) || filterOption.id === this.filters.chosen[filterOption.attribute_code].id)) { // for price filter it's a string
        delete this.filters.chosen[filterOption.attribute_code]
      } else {
        this.filters.chosen[filterOption.attribute_code] = filterOption
      }

      let filterQr = buildFilterProductsQuery(this.category, this.filters.chosen)

      const fsC = Object.assign({}, this.filters.chosen) // create a copy because it will be used asynchronously (take a look below)
      this.$store.dispatch('category/products', { populateAggregations: false, searchProductQuery: filterQr, route: this.$route, current: this.pagination.current, perPage: this.pagination.perPage, filters: config.products.defaultFilters, configuration: fsC }).then((res) => {
      }) // because already aggregated
    },
    validateRoute () {
      let self = this
      let store = self.$store
      let route = self.$route

      let slug = route.params.slug
      this.filters.chosen = {} // reset selected filters
      this.$bus.$emit('filter-reset')

      store.dispatch('category/single', { key: 'slug', value: slug }).then((category) => {
        if (!category) {
          self.$router.push('/')
        } else {
          this.pagination.current = 0
          let searchProductQuery = baseFilterProductsQuery(store.state.category.current, config.products.defaultFilters)
          self.$bus.$emit('current-category-changed', store.state.category.current_path)
          self.$store.dispatch('category/products', { searchProductQuery: searchProductQuery, populateAggregations: true, route: route, current: self.pagination.current, perPage: self.pagination.perPage, filters: config.products.defaultFilters })
          EventBus.$emitFilter('category-after-load', { store: store, route: route })
        }
      })
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
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Category root ' + new Date())
      const defaultFilters = config.products.defaultFilters
      store.dispatch('category/list', { includeFields: config.entities.optimize && global.$VS.isSSR ? config.entities.category.includeFields : null }).then((categories) => {
        store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
          includeFields: config.entities.optimize && global.$VS.isSSR ? config.entities.attribute.includeFields : null
        }).then((attrs) => {
          store.dispatch('category/single', { key: 'slug', value: route.params.slug }).then((parentCategory) => {
            store.dispatch('category/products', { searchProductQuery: baseFilterProductsQuery(parentCategory, defaultFilters), populateAggregations: true, store: store, route: route, current: 0, perPage: 50, filters: defaultFilters, includeFields: config.entities.optimize && global.$VS.isSSR ? config.entities.productList.includeFields : null, excludeFields: config.entities.optimize && global.$VS.isSSR ? config.entities.productList.excludeFields : null }).then((subloaders) => {
              Promise.all(subloaders).then((results) => {
                EventBus.$emitFilter('category-after-load', { store: store, route: route }).then((results) => {
                  return resolve()
                }).catch((err) => {
                  console.error(err)
                  return resolve()
                })
              })
            })
          }).catch(err => {
            console.error(err)
            reject(err)
          })
        })
      })
    })
  },
  created () {
    this.$bus.$on('filter-changed-category', this.onFilterChanged)
    if (!global.$VS.isSSR && this.lazyLoadProductsOnscroll) {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
    }
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-category', this.onFilterChanged)
  },
  computed: {
    products () {
      return this.$store.state.product.list.items
    },
    productsCounter () {
      return this.$store.state.product.list.items.length
    },
    productsTotal () {
      return this.$store.state.product.list.total
    },
    currentQuery () {
      return this.$store.state.product.current_query
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
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar
  }
}
</script>
