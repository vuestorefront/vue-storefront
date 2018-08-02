import { mapState } from 'vuex'
import config from 'config'
import i18n from 'core/lib/i18n'
import onEscapePress from 'core/mixins/onEscapePress'
import SearchQuery from 'core/store/lib/search/searchQuery'

export default {
  name: 'SearchPanel',
  data () {
    return {
      products: [],
      search: '',
      placeholder: i18n.t('Type what you are looking for...'),
      emptyResults: false
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
    makeSearch: function () {
      let queryText = this.search
      let start = 0
      let size = 18

      let searchQuery = new SearchQuery()

      searchQuery = searchQuery
        .setSearchText(queryText)
        .applyFilter({type: 'terms', key: 'visibility', value: [3, 4]})
        .applyFilter({type: 'terms', key: 'status', value: [0, 1, 2]})

      if (config.products.listOutOfStockProducts === false) {
        searchQuery = searchQuery.applyFilter({type: 'term', key: 'stock.is_in_stock', value: true})
      }

      this.$store.dispatch('product/listByQuery', { searchQuery: searchQuery, start, size, updateState: false }).then((resp) => {
        this.products = resp.items
        this.emptyResults = resp.items.length < 1
      }).catch(function (err) {
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
