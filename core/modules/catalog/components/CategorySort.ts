export const CategorySort = {
  name: 'SortBy',
  data () {
    return {
      sortby: ''
    }
  },
  methods: {
    // emit to category, todo: move all logic inside
    sort () {
      this.$bus.$emit('list-change-sort', { attribute: this.sortby })
    }
  },
  computed: {
    sortingOptions () {
      return this.$store.state.config.products.sortByAttributes
    }
  }
}
