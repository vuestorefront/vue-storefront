import store from '@vue-storefront/store'
export default {
  name: 'SortBy',
  data () {
    return {
      sortby: ''
    }
  },
  methods: {
    changeOrder () {
      this.$bus.$emit('list-change-sort', { attribute: this.sortby })
    }
  },
  computed: {
    sortByAttribute () {
      return store.state.config.products.sortByAttributes
    }
  }
}
