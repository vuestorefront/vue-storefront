<template>
  <sidebar :title="$t('Search')" :close-on-click="false" class="searchpanel" data-testid="searchPanel">
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
  </sidebar>
</template>

<script>
import Sidebar from 'theme/components/theme/blocks/AsyncSidebar/Sidebar'
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import ProductTile from 'theme/components/core/ProductTile'
import VueOfflineMixin from 'vue-offline/mixin'
import CategoryPanel from 'theme/components/core/blocks/Category/CategoryPanel'
import { minLength } from 'vuelidate/lib/validators'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
  components: {
    Sidebar,
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
      const categoriesMap = {}
      this.products.forEach(product => {
        [...product.category].forEach(category => {
          categoriesMap[category.category_id] = category
        })
      })
      return Object.keys(categoriesMap).map(categoryId => categoriesMap[categoryId])
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
    },
    search (val, org) {
      // Prevent value from being string 'null'
      if (val === null || val === 'null' || val === undefined) {
        this.search = ''
        return
      }

      this.$bus.$emit('search-input-change', { search: val })
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
