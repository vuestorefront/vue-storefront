<template>
  <div id="category">
    <div class="navbar">
      <div class="navbar__title desktop-only">
        <h2>Categories</h2>
      </div>
      <div class="navbar__controls">
        <SfButton
          class="navbar__filters-btn"
          :class="{ 'navbar__filters-btn--active': isFilterSidebarOpen }"
          @click="isFilterSidebarOpen = true"
        >
          <FiltersIcon />
          Filters
        </SfButton>
        <span class="navbar__products-count"><strong>{{ productsTotal }}</strong> items</span>
      </div>
    </div>

    <div class="main">
      <div class="sidebar desktop-only">
       <CategoriesSidebar :categories="categories"/>
      </div>
      <div class="products">
        <SfProductCard
          class="products__product-card"
          v-for="product in products"
          :key="product.id"
          :title="product.name"
          :price="{ regularPrice: formatPrice(product.priceInclTax), specialPrice: formatPrice(product.specialpriceInclTax) }"
          :image="getProductThumbnail(product)"
        />
      </div>
    </div>

     <SfSidebar
      :visible="isFilterSidebarOpen"
      @close="isFilterSidebarOpen = false"
      class="filters"
    >
      <div :key="title" v-for="(filtersEntity, title) in filters.available">
        <h3 class="filters__title">{{ title }}</h3>
        <SfFilter v-model="activeFilters[title]">
          <SfList>
            <SfListItem v-for="filter in filtersEntity" :key="filter.id">
              <SfFilterItem
                :label="filter.label"
                :value="filter.id"
                :color="title === 'color' ? filter.label : null"
              />
            </SfListItem>
          </SfList>
        </SfFilter>
      </div>
    </SfSidebar>
  </div>
</template>

<script>
import Category from "@vue-storefront/core/pages/Category.js"
import SfSidebar from "@storefrontui/vue/dist/SfSidebar.vue";
import SfButton from "@storefrontui/vue/dist/SfButton.vue";
import SfList from "@storefrontui/vue/dist/SfList.vue";
import SfFilter from "@storefrontui/vue/dist/SfFilter.vue";
import SfFilterItem from "@storefrontui/vue/dist/SfFilterItem.vue";
import SfAccordion from "@storefrontui/vue/dist/SfAccordion.vue";
import SfProductCard from "@storefrontui/vue/dist/SfProductCard.vue"
import FiltersIcon from "theme/components/category/FiltersIcon.vue"
import CategoriesSidebar from "theme/components/category/CategoriesSidebar"

import { mapGetters } from "vuex";
import { productThumbnailPath } from '@vue-storefront/core/helpers'
import { price } from "@vue-storefront/core/filters/price.js"

export default {
  mixins: [Category],
  data () {
    return {
      isFilterSidebarOpen: false,
      activeFilters: {
        color: [],
        erin_recommends: [],
        price: [],
        size: []
      }
    }
  },
  computed: {
    ...mapGetters("category", ["getCategories"]),
    categories() {
      return this.getCategories
    }
  },
  methods: {
    // TODO: Use productThumbnailPath in Vuex
    getProductThumbnail (product) {
      let thumbnail = productThumbnailPath(product)
      return this.getThumbnail(thumbnail, 300, 400)
    },
    formatPrice (toFormat) {
      return price(toFormat)
    }
  },
  components: {
    SfButton,
    SfList,
    SfFilter,
    SfFilterItem,
    SfSidebar,
    SfAccordion,
    SfProductCard,
    FiltersIcon,
    CategoriesSidebar
  }
}
</script>


<style lang="scss" scoped>
@import "~@storefrontui/vue/dist/css/_variables.scss";

#category {
  box-sizing: border-box;
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
}

.navbar {
  border-top: 1px solid $c-border;
  border-bottom: 1px solid $c-border;
  padding: $spacer 0;
  &__title {
    display: inline-flex;
    align-items: center;
    border-right: 1px solid $c-border;
    width: 20%;
    box-sizing: border-box;
  }
  &__controls {
    display: inline-flex;
    padding-left: $spacer-big;
    padding-right: $spacer-big;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    @media (min-width: $desktop-min) {
      padding-left: $spacer-extra-big;
      padding-right: $spacer-extra-big;
      height: 75px;
      width: calc(80% - 4px)
    }
  }
  &__filters-btn {
    color: white;
    color: inherit;
    font-size: $font-size-small-desktop;
    text-transform: none;
    background: transparent;
    padding: 0;
    align-items: center;
    display: flex;
    svg {
      margin-right: 10px;
      fill: $c-gray-secondary;
    }
    &:hover,
    &--active {
      color: $c-accent-primary;
      svg {
        fill: $c-accent-primary;
      }
    }
  }
  @media (min-width: $desktop-min) {
    height: 75px;
    padding: 0;
  }
}

.main {
  display: flex;
}

.sidebar {
  border-right: 1px solid $c-border;
  padding-right: $spacer-extra-big;
  width: 20%;
  box-sizing: border-box;
  &__category-list li:hover,
  &__category-item--active {
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
  }
}

.products {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: space-between;
  &__product-card {
    width: 50%;
    @media (min-width: $tablet-min) {
      width: 25%;
    }
  }
  &__pagination {
    @media (min-width: $desktop-min) {
      padding-top: $spacer-extra-big;
    }
  }
  @media (min-width: $desktop-min) {
    width: 80%;
    padding: $spacer-big;
  }
}

.filters {
  &__title:first-letter  {
    text-transform: uppercase
  }
}
</style>
