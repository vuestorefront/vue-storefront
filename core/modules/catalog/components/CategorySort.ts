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
      this.$emit('sortChange', this.sortby)
      // this.$bus.$emit('list-change-sort', { attribute: this.sortby })
    }
  },
  computed: {
    sortingOptions () {
      return this.$config.products.sortByAttributes
    },
    sortingVariants () {
      let variants = []
      Object.keys(this.sortingOptions).map(label => {
        variants.push({
          label: label,
          id: this.sortingOptions[label],
          type: 'sort'
        })
      })
      return variants
    }
  }
}
