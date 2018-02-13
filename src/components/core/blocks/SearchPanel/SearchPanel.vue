<template>
  <div class="searchpanel" :class="{ active: isOpen }">
    <!-- Serach Results -->
    <ul>
      <li v-for="product in products" :key="product.sku">
        {{ product.name | htmlDecode }}
        {{ product.priceInclTax }}
        {{ product.qty }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import i18n from 'lib/i18n'
const bodybuilder = require('bodybuilder')

export default {
  name: 'SearchPanel',
  data () {
    return {
      products: [],
      search: '',
      placeholder: i18n.t('Type what you are looking for...')
    }
  },
  components: {
    mapState
  },
  methods: {
    closeSearchpanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setSearchpanel', false)
    },
    makeSearch: function () {
      let queryText = this.search
      let start = 0
      let size = 18

      let query = bodybuilder()
        .orQuery('match', 'name', { query: queryText, boost: 3 })
        .orQuery('match', 'category.name', { query: queryText, boost: 1 })
        .orQuery('match', 'short_description', { query: queryText, boost: 2 })
        .orQuery('match', 'description', { query: queryText, boost: 1 })
        .filter('range', 'visibility', { 'gte': 3, 'lte': 4 })
        .build()

      this.$store.dispatch('product/list', {query, start, size, updateState: false}).then((resp) => {
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
  }
}
</script>
