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
      readMore: true
    }
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
    makeSearch () {
      if (this.search !== '' && this.search !== undefined) {
        let query = this.buildSearchQuery(this.search)
        this.start = 0
        this.readMore = true
        this.$store.dispatch('product/list', { query, start: this.start, size: this.size, updateState: false }).then(resp => {
          this.products = resp.items
          this.start = this.start + this.size
          this.emptyResults = resp.items.length < 1
        }).catch((err) => {
          Logger.error(err, 'components-search')()
        })
      } else {
        this.products = []
        this.emptyResults = 0
      }
    },
    seeMore () {
      if (this.search !== '' && this.search !== undefined) {
        let query = this.buildSearchQuery(this.search)
        this.$store.dispatch('product/list', { query, start: this.start, size: this.size, updateState: false }).then((resp) => {
          let page = Math.floor(resp.total / this.size)
          let exceeed = resp.total - this.size * page
          if (resp.start === resp.total - exceeed) {
            this.readMore = false
          }
          this.products = this.products.concat(resp.items)
          this.start = this.start + this.size
          this.emptyResults = this.products.length < 1
        }).catch((err) => {
          Logger.error(err, 'components-search')()
        })
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
