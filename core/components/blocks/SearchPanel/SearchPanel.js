import { mapState } from 'vuex'
import i18n from '@vue-storefront/core/lib/i18n'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import { prepareQuickSearchQuery } from 'core/store/helpers/index'

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

      if (queryText !== '' && queryText !== undefined) {
        let start = 0
        let size = 18
        let searchQuery = prepareQuickSearchQuery(queryText)

        this.$store.dispatch('product/list', { query: searchQuery, start, size, updateState: false }).then(resp => {
          this.products = resp.items
          this.emptyResults = resp.items.length < 1
        }).catch((err) => {
          console.error(err)
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
      isOpen: state => state.ui.searchpanel
    })
  },
  mixins: [onEscapePress]
}
