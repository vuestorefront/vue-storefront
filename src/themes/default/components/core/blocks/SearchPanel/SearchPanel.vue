<template>
  <div
    class="searchpanel fixed mw-100 bg-cl-primary cl-accent"
    data-testid="searchPanel"
  >
    <div class="close-icon-row">
      <i
        class="material-icons pointer cl-accent close-icon"
        @click="closeSearchpanel"
        data-testid="closeSearchPanel"
      >
        close
      </i>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 end-xs">
          <label for="search" class="visually-hidden">
            {{ $t('Search') }}
          </label>
          <div class="search-input-group">
            <i class="material-icons search-icon">search</i>
            <input
              ref="search"
              id="search"
              v-model="search"
              @input="makeSearch"
              @blur="$v.search.$touch()"
              class="search-panel-input"
              :placeholder="$t('Type what you are looking for...')"
              type="search"
              autofocus="true"
            >
          </div>
        </div>
      </div>
      <div v-if="visibleProducts.length && categories.length > 1" class="categories">
        <category-panel :categories="categories" v-model="selectedCategoryIds" />
      </div>
      <div class="product-listing row">
        <product-tile
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
          @click.native="closeSearchpanel"
        />
        <transition name="fade">
          <div
            v-if="getNoResultsMessage"
            class="no-results relative center-xs h4 col-md-12"
          >
            {{ $t(getNoResultsMessage) }}
          </div>
        </transition>
      </div>
      <div
        v-show="OnlineOnly"
        v-if="visibleProducts.length >= 18"
        class="buttons-set align-center py35 mt20 px40"
      >
        <button
          @click="seeMore" v-if="readMore"
          class="no-outline brdr-none py15 px20 bg-cl-mine-shaft :bg-cl-th-secondary cl-white fs-medium-small"
          type="button"
        >
          {{ $t('Load more') }}
        </button>
        <button
          @click="closeSearchpanel"
          class="no-outline brdr-none p15 fs-medium-small close-button"
          type="button"
        >
          {{ $t('Close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import ProductTile from 'theme/components/core/ProductTile'
import VueOfflineMixin from 'vue-offline/mixin'
import CategoryPanel from 'theme/components/core/blocks/Category/CategoryPanel'
import { minLength } from 'vuelidate/lib/validators'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
  components: {
    ProductTile,
    CategoryPanel
  },
  mixins: [SearchPanel, VueOfflineMixin],
  validations: {
    search: {
      minLength: minLength(3)
    }
  },
  data () {
    return {
      selectedCategoryIds: []
    }
  },
  computed: {
    visibleProducts () {
      const productList = this.products || []
      if (this.selectedCategoryIds.length) {
        return productList.filter(product => product.category_ids.some(categoryId => {
          const catId = parseInt(categoryId)
          return this.selectedCategoryIds.includes(catId)
        }))
      }
      return productList
    },
    categories () {
      const categories = this.products
        .filter(p => p.category)
        .map(p => p.category)
        .flat()

      const discinctCategories = Array.from(
        new Set(categories.map(c => c.category_id))
      ).map(catId => categories.find(c => c.category_id === catId))

      return discinctCategories
    },
    getNoResultsMessage () {
      let msg = ''
      if (!this.$v.search.minLength) {
        msg = 'Searched term should consist of at least 3 characters.'
      } else if (this.emptyResults) {
        msg = 'No results were found.'
      }
      return msg
    }
  },
  watch: {
    categories () {
      this.selectedCategoryIds = []
    }
  },
  mounted () {
    // add autofocus to search input field
    this.$refs.search.focus()
    disableBodyScroll(this.$el)
  },
  destroyed () {
    clearAllBodyScrollLocks()
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
@import "~theme/css/variables/grid";
@import "~theme/css/variables/typography";

.searchpanel {
  height: 100vh;
  width: 800px;
  top: 0;
  right: 0;
  z-index: 3;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  .close-icon-row {
    display: flex;
    justify-content: flex-end;
  }

  .container {
    padding-left: 40px;
    padding-right: 40px;

    @media #{$media-xs} {
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  .row {
    margin-left: - map-get($grid-gutter-widths, lg) / 2;
    margin-right: - map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      margin-right: - map-get($grid-gutter-widths, xs) / 2;
      margin-left: - map-get($grid-gutter-widths, xs) / 2;
    }
  }

  .col-md-12 {
    padding-left: map-get($grid-gutter-widths, lg) / 2;
    padding-right: map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      padding-left: map-get($grid-gutter-widths, xs) / 2;
      padding-right: map-get($grid-gutter-widths, xs) / 2;
    }
  }

  .product-listing {
    padding-top: 30px;
  }

  .product {
    box-sizing: border-box;
    width: 33.33%;
    padding-left: map-get($grid-gutter-widths, lg) / 2;
    padding-right: map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      width: 50%;
      padding-left: map-get($grid-gutter-widths, xs) / 2;
      padding-right: map-get($grid-gutter-widths, xs) / 2;
    }
  }

  .close-icon {
    padding: 18px 8px;
  }

  .search-input-group {
    display: flex;
    border-bottom: 1px solid #bdbdbd;
  }

  .search-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-panel-input {
    width: 100%;
    height: 60px;
    padding-bottom: 0;
    padding-top: 0;
    border: none;
    outline: 0;
    font-size: 18px;
    font-family: map-get($font-families, secondary);

    @media #{$media-xs} {
      font-size: 16px;
    }
  }

  .no-results {
    top: 80px;
    width: 100%;
  }

  i {
    opacity: 0.6;
  }

  i:hover {
    opacity: 1;
  }

  .close-button {
    background: #fff;
  }

  button {
    @media #{$media-xs} {
      width: 100%;
      margin-bottom: 15px;
    }
  }
}
</style>
