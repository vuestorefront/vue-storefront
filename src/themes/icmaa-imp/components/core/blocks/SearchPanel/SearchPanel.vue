<template>
  <sidebar :close-on-click="false" :use-expander-in-title="false" ref="searchSidebar" data-test-id="SearchPanel">
    <template v-slot:top>
      <label for="search" class="t-flex">
        <span class="t-sr-only">{{ $t('Search') }}</span>
        <material-icon icon="search" class="t-mx-2" />
      </label>
      <input type="text" v-model="searchString" @input="search" @blur="$v.searchString.$touch()" :placeholder="$t('Type what you are looking for...')" autofocus="true" data-test-id="SearchInput" ref="searchString" class="t-flex-expand t-p-0 t-text-lg t-text-base-tone placeholder:t-text-base-lighter">
    </template>
    <div class="t-pb-20">
      <div v-if="getNoResultsMessage" class="t-px-2 t-mt-2 t-text-sm">
        {{ $t(getNoResultsMessage) }}
      </div>
      <category-panel :categories="categories" title="Categories" :link="true" v-if="!emptyResults && filteredProducts.length && categories.length > 0" class="t-mb-4" />
      <category-panel :categories="categoryAggs" v-model="selectedCategoryIds" v-if="!emptyResults && filteredProducts.length && categoryAggs.length > 1" class="t-mb-4" />
      <div class="product-listing t-flex t-flex-wrap t-bg-base-lightest t--mx-4 t-px-3 t-py-4" v-if="!emptyResults && filteredProducts.length > 0">
        <product-tile v-for="product in filteredProducts" :key="product.id" :product="product" @click.native="closeSidebar" class="t-w-1/2 lg:t-w-1/3 t-px-1 t-mb-8" />
      </div>
      <div v-if="filteredProducts.length >= size && OnlineOnly" class="t-flex t-items-center t-justify-center t-mt-8">
        <button-component type="ghost" @click="loadMoreProducts" v-if="moreProducts" class="t-w-2/3 lg:t-w-1/3" :class="{ 't-relative t-opacity-60': loadingProducts }">
          {{ $t('Load more') }}
          <loader-background v-if="loadingProducts" bar="t-bg-base-darkest" class="t-bottom-0" />
        </button-component>
      </div>
    </div>
  </sidebar>
</template>

<script>
import Sidebar from 'theme/components/core/blocks/AsyncSidebar/Sidebar'
import ProductTile from 'theme/components/core/ProductTile'
import CategoryPanel from 'theme/components/core/blocks/SearchPanel/CategoryPanel'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import ButtonComponent from 'theme/components/core/blocks/Button'
import LoaderBackground from 'theme/components/core/LoaderBackground'
import VueOfflineMixin from 'vue-offline/mixin'

import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { SearchQuery } from 'storefront-query-builder'
import { Logger } from '@vue-storefront/core/lib/logger'
import debounce from 'lodash-es/debounce'
import uniq from 'lodash-es/uniq'

export default {
  name: 'SearchPanel',
  components: {
    Sidebar,
    ProductTile,
    CategoryPanel,
    MaterialIcon,
    ButtonComponent,
    LoaderBackground
  },
  mixins: [VueOfflineMixin],
  validations: {
    searchString: {
      required,
      minLength: minLength(3)
    }
  },
  data () {
    return {
      searchString: '',
      searchAlias: '',
      products: [],
      categoryAggs: [],
      size: 12,
      start: 0,
      placeholder: i18n.t('Type what you are looking for...'),
      emptyResults: true,
      moreProducts: true,
      loadingProducts: false,
      selectedCategoryIds: []
    }
  },
  computed: {
    ...mapGetters({ alias: 'icmaaSearchAlias/getMap' }),
    items () {
      return this.$store.state.search
    },
    filteredProducts () {
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
      const splitChars = [' ', '-', ',']
      return this.categoryAggs.filter(category => {
        let searchStrings = []
        const strings = [this.searchString, this.searchAlias]
        strings.forEach(s => splitChars.forEach(c => searchStrings.push(...s.split(c).filter(s => s.length >= 3))))
        searchStrings = uniq(searchStrings)

        const searchRegex = new RegExp(`(${searchStrings.join('|')})`, 'i')

        return searchStrings.length > 0 && searchRegex.test(category.name)
      })
    },
    getNoResultsMessage () {
      let msg = ''
      if (this.searchString !== '') {
        if (this.$v.searchString.$invalid) {
          msg = 'Searched term should consist of at least 3 characters.'
        } else if (this.emptyResults) {
          msg = 'No results were found.'
        }
      }

      return msg
    }
  },
  watch: {
    categoryAggs () {
      this.selectedCategoryIds = []
    }
  },
  methods: {
    async getAlias (searchString) {
      const wordsRegexp = /(\w+)/giu
      let wordResult = ''
      let replaces = []

      const allWords = searchString.match(wordsRegexp)
      await this.$store.dispatch('icmaaSearchAlias/list', allWords)

      while ((wordResult = wordsRegexp.exec(searchString)) !== null) {
        const word = wordResult[0]
        const aliasKey = Object.keys(this.alias).find(k => RegExp(`^${word}$`, 'giu').test(k))
        if (aliasKey) {
          const replace = this.alias[aliasKey]
          replaces.push({ word, replace })
        }
      }

      replaces.forEach(r => {
        searchString = searchString.replace(RegExp(r.word, 'i'), r.replace)
      })

      Logger.debug('Search for:', 'DEBUG', searchString)()

      return searchString
    },
    search: debounce(async function () {
      if (!this.$v.searchString.$invalid) {
        this.searchAlias = await this.getAlias(this.searchString)
        let query = this.prepareQuickSearchQuery(this.searchAlias)

        this.start = 0
        this.moreProducts = true
        this.loadingProducts = true
        this.$store.dispatch('product/list', { query, start: this.start, configuration: {}, size: this.size, updateState: false }).then(resp => {
          const { items, aggregations } = resp
          this.products = items
          this.start += this.size
          this.emptyResults = items.length < 1
          this.loadingProducts = false

          this.populateCategoryAggregations(aggregations)
        }).catch((err) => {
          Logger.error(err, 'components-search')()
        })
      } else {
        this.products = []
        this.emptyResults = true
      }
    }, 350),
    async loadMoreProducts () {
      if (!this.$v.searchString.$invalid) {
        let query = this.prepareQuickSearchQuery(await this.getAlias(this.searchString), true)
        this.loadingProducts = true
        this.$store.dispatch('product/list', { query, start: this.start, size: this.size, updateState: false }).then((resp) => {
          const { items, aggregations, total, start } = resp
          let page = Math.floor(total / this.size)
          let exceeed = total - this.size * page
          if (start === total - exceeed) {
            this.moreProducts = false
          }
          this.products = this.products.concat(items)
          this.start += this.size
          this.emptyResults = this.products.length < 1
          this.loadingProducts = false
        }).catch((err) => {
          this.loadingProducts = false
          Logger.error(err, 'components-search')()
        })
      } else {
        this.products = []
        this.emptyResults = true
      }
    },
    prepareQuickSearchQuery (value, plain = false) {
      let searchQuery = new SearchQuery()

      const searchFilterKey = plain ? 'search-text-plain' : 'search-text'
      searchQuery = searchQuery
        .applyFilter({ key: searchFilterKey, value })
        .applyFilter({ key: 'stock', value: '' })
        .applyFilter({ key: 'visibility', value: {'in': [3, 4]} })
        .applyFilter({ key: 'status', value: {'in': [0, 1]} })

      return searchQuery
    },
    populateCategoryAggregations (aggr) {
      // This is a massive nested aggregation object which we crawl and collect all
      // available categories of all results not just those who are on results page
      this.categoryAggs = []
      if (aggr.categories_found && aggr.categories_found.doc_count > 0) {
        const { categories_found } = aggr
        const categories = categories_found.categories.buckets
        categories.forEach(bucket => {
          this.categoryAggs.push(bucket.hits.hits.hits[0]._source.category)
        })
      }
    },
    closeSidebar () {
      this.$store.dispatch('ui/setSearchpanel', false)
    }
  },
  async mounted () {
    this.$v.searchString.$touch()

    this.$refs.searchString.focus()
    disableBodyScroll(this.$refs.searchSidebar)

    this.searchString = await localStorage.getItem(`shop/user/searchQuery`) || ''
    if (this.searchString) {
      this.search()
    }
  },
  beforeDestroy () {
    const search = this.$v.searchString.$invalid ? '' : this.searchString
    this.$bus.$emit('search-input-change', { search })
    localStorage.setItem(`shop/user/searchQuery`, search)

    clearAllBodyScrollLocks()
  }
}
</script>
