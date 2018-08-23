import bodybuilder from 'bodybuilder'
import { mapState } from 'vuex'
import i18n from '@vue-storefront/core/lib/i18n'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import config from 'config'

export default {
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
      let query = bodybuilder()
        .query('range', 'visibility', { 'gte': 3, 'lte': 4 })
        .andQuery('range', 'status', { 'gte': 0, 'lt': 2 }/* 2 = disabled, 4 = out of stock */)
      if (config.products.listOutOfStockProducts === false) {
        query = query.andQuery('match', 'stock.is_in_stock', true)
      }
      query = query.andQuery('bool', b => b.orQuery('match_phrase_prefix', 'name', { query: queryText, boost: 3, slop: 2 })
        .orQuery('match_phrase', 'category.name', { query: queryText, boost: 1 })
        .orQuery('match_phrase', 'short_description', { query: queryText, boost: 1 })
        .orQuery('match_phrase', 'description', { query: queryText, boost: 1 })
        .orQuery('bool', b => b.orQuery('terms', 'sku', queryText.split('-'))
          .orQuery('terms', 'configurable_children.sku', queryText.split('-'))
          .orQuery('match_phrase', 'sku', { query: queryText, boost: 1 })
          .orQuery('match_phrase', 'configurable_children.sku', { query: queryText, boost: 1 }))
      )
      return query.build()
    },
    makeSearch () {
      let query = this.buildSearchQuery(this.search)
      this.start = 0
      this.readMore = true
      this.$store.dispatch('product/list', { query, start: this.start, size: this.size, updateState: false }).then(resp => {
        this.products = resp.items
        this.start = this.start + this.size
        this.emptyResults = resp.items.length < 1
      }).catch((err) => {
        console.error(err)
      })
    },
    seeMore () {
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
        console.error(err)
      })
    }
  },
  computed: {
    items () {
      return this.$store.state.search
    },
    ...mapState({
      isOpen: state => state.ui.searchpanel
    })
  },
  mixins: [onEscapePress]
}
