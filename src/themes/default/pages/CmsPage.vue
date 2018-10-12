<template>
  <div id="cms-page">
    <header class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs :routes="breadcrumbs.routes" :active-route="cmsPage.identifier" />
        <div class="row middle-sm">
          <h1 class="col-sm-9 category-title mb10"> {{ cmsPage.title }} </h1>
        </div>
      </div>
    </header>
    <div class="container pb60">
      {{ cmsPage.content }}
    </div>
  </div>
</template>

<script>
import CmsPage from '@vue-storefront/core/pages/CmsPage'
// import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'

export default {
  components: {
    Breadcrumbs
    // Sidebar
  },
  data () {
    return {
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    return new Promise((resolve, reject) => {
      // store.state.category.current_product_query = Object.assign(store.state.category.current_product_query, { // this is just an example how can you modify the search criteria in child components
      //   sort: 'updated_at:desc'
      //   searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
      // })
      resolve()
    })
  },
  methods: {
  },
  mixins: [CmsPage]
}
</script>
