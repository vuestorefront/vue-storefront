import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import { prepareQuickSearchQuery } from '@vue-storefront/core/modules/catalog/queries/searchPanel'
import RootState from '@vue-storefront/core/types/RootState'
import { Logger } from '@vue-storefront/core/lib/logger'

export const Search = {
  name: 'SearchPanel',
  data () {
    return {
      products: [],
      search: '',
      size: 18,
      start: 0,
      placeholder: i18n.t('Type what you are looking for...'),
      emptyResults: false,
      readMore: true,
      componentLoaded: false
    }
  },
  mounted () {
    this.search = localStorage.getItem(`shop/user/searchQuery`) || ''

    if (this.search) {
      this.makeSearch();
    }
  },
  beforeDestroy () {
    localStorage.setItem(`shop/user/searchQuery`, this.search ? this.search : '');
  },
  methods: {
    onEscapePress () {
      this.closeSearchpanel()
    },
    closeSearchpanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setSearchpanel', false)
    },
    buildSearchQuery (queryText) {
      let searchQuery = prepareQuickSearchQuery(queryText)
      return searchQuery
    },
    async makeSearch () {
      if (this.search !== '' && this.search !== undefined) {
        let query = this.buildSearchQuery(this.search)
        let startValue = 0;
        this.start = startValue
        this.readMore = true
        try {
          const { items } = await this.$store.dispatch('product/findProducts', {
            query,
            start: this.start,
            size: this.size,
            options: {
              populateRequestCacheTags: false,
              prefetchGroupProducts: false
            }
          })
          this.products = items
          this.start = startValue + this.size
          this.emptyResults = items.length < 1
        } catch (err) {
          Logger.error(err, 'components-search')()
        }
      } else {
        this.products = []
        this.emptyResults = 0
      }
    },
    async seeMore () {
      if (this.search !== '' && this.search !== undefined) {
        let query = this.buildSearchQuery(this.search)
        let startValue = this.start;
        try {
          const { items, total, start } = await this.$store.dispatch('product/findProducts', {
            query,
            start: startValue,
            size: this.size,
            options: {
              populateRequestCacheTags: false,
              prefetchGroupProducts: false
            }
          })
          let page = Math.floor(total / this.size)
          let exceeed = total - this.size * page
          if (start === total - exceeed) {
            this.readMore = false
          }
          this.products = this.products.concat(items)
          this.start = startValue + this.size
          this.emptyResults = this.products.length < 1
        } catch (err) {
          Logger.error(err, 'components-search')()
        }
      } else {
        this.products = []
        this.emptyResults = 0
      }
    }
  },
  computed: {
    items () {
      return this.$store.state.search
    },
    ...mapState({
      isOpen: (state: RootState) => state.ui.searchpanel
    })
  },
  mixins: [onEscapePress]
}
