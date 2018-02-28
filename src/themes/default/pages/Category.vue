<template>
  <div id="category">
    <header class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />
        <h1 class="category-title mb10"> {{ category.name }} </h1>
      </div>
      <div class="container">
        <div class="row m0">
          <button
            class="col-xs-5 mt25 p15 mobile-filters-button bg-cl-th-accent brdr-none cl-white h5 weight-300 sans-serif"
            @click="openFilters"
          >
            {{ $t('Filters') }}
          </button>
        </div>
      </div>
    </header>
    <div class="container pb60">
      <div class="row m0 pt15 center-md">
        <div class="col-md-3 start-xs category-filters">
          <sidebar :filters="filters.available"/>
        </div>
        <div class="col-md-3 start-xs mobile-filters" v-if="mobileFilters">
          <div class="close-container absolute w-100">
            <i class="material-icons p15 close cl-accent" @click="closeFilters">close</i>
          </div>
          <sidebar class="mobile-filters-body" :filters="filters.available"/>
        </div>
        <p class="col-xs-12 hidden-md m0 px20 cl-secondary">{{ productsCounter }} items</p>
        <div class="col-md-9 pt20 px10 border-box products-list">
          <div v-if="isCategoryEmpty" class="hidden-xs">
            {{ $t('No products found!') }}
          </div>
          <product-listing columns="3" :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'core/lib/themes'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductListing from '../components/core/ProductListing.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'

export default {
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar
  },
  data () {
    return {
      mobileFilters: false
    }
  },
  methods: {
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    }
  },
  mixins: [corePage('Category')]
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

  @media (max-width: 64em) {
    .products-list {
      max-width: 530px;
    }
  }

  @media (max-width: 770px) {
    .category-title {
      margin: 0;
      font-size: 36px;
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
</style>
