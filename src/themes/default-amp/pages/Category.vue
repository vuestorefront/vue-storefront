<template>
  <div id="category">
    <header class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs />
        <div class="row middle-sm">
          <h1 class="col-sm-9 category-title mb10">
            {{ category.name }}
          </h1>
        </div>
      </div>
    </header>
    <div class="container pb60">
      <div class="row m0 pt15">
        <p class="col-xs-12 hidden-md m0 px20 cl-secondary">
          {{ productsCounter }} items
        </p>
        <div class="col-md-9 pt20 px10 border-box products-list block-center">
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h4 data-testid="noProductsInfo">
              {{ $t('No products found!') }}
            </h4>
            <p>{{ $t('Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!') }}</p>
          </div>
          <product-listing columns="4" :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Category from '@vue-storefront/core/pages/Category' // theme = default/base theme
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductListing from '../components/core/ProductListing.vue'

export default {
  components: {
    ProductListing,
    Breadcrumbs
  },
  data () {
    return {
      mobileFilters: false
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    context.output.template = 'amp'
    context.output.appendHead = (context) => {
      return '<script async src="https://cdn.ampproject.org/v0.js"><' + '/script>'
    }
    return new Promise((resolve, reject) => {
      store.dispatch('category/mergeSearchOptions', { // this is just an example how can you modify the search criteria in child components
        sort: 'updated_at:desc'
        // searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
      })
      resolve()
    })
  },
  methods: {
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    }
  },
  mixins: [Category]
}
</script>

<style lang="scss" scoped>
  .category-filters {
    width: 242px;
  }

  .mobile-filters {
    display: none;
    overflow: auto;
  }

  .mobile-filters-button {
    display: none;
  }

  .mobile-sorting {
    display: none;
  }

  .category-title {
    line-height: 65px;
  }

  @media (max-width: 64em) {
    .products-list {
      max-width: 530px;
    }
  }

  @media (max-width: 770px) {
    .category-title {
      margin: 0;
      font-size: 36px;
      line-height: 40px;
    }

    .products-list {
      width: 100%;
      max-width: none;
    }

    .mobile-filters {
      display: block;
    }

    .mobile-filters-button {
      display: block;
      height: 45px;
    }

    .sorting {
      display: none;
    }

    .mobile-sorting {
      display: block;
    }

    .category-filters {
      display: none;
    }

    .product-listing {
      justify-content: center;;
    }

    .mobile-filters {
      position: fixed;
      background-color: #F2F2F2;
      z-index: 5;
      padding: 0 40px;
      left: 0;
      width: 100vw;
      height: 100vh;
      top: 0;
      box-sizing: border-box;
    }

    .mobile-filters-body {
      padding-top: 50px;
    }
  }

  .close-container {
    left: 0;
  }

  .close {
    margin-left: auto;
  }

  .block-center {
    margin: 0 auto;
  }
</style>
