import config from 'config'
import { mapGetters } from 'vuex'
export const CategorySort = {
  name: 'SortBy',
  data () {
    return {
      sortby: ''
    }
  },
  mounted () {
    const sort = this.getCurrentCategoryProductQuery && this.getCurrentCategoryProductQuery.sort ? this.getCurrentCategoryProductQuery.sort : null
    if (sort) {
      const sortingOptionValues = Object.values(this.sortingOptions)
      const sortOptionExist = sortingOptionValues.includes(sort)
      if (sortOptionExist) {
        this.sortby = sort
      }
    }
  },
  methods: {
    // emit to category, todo: move all logic inside
    sort () {
      this.$emit('change', this.sortby)
      // this.$bus.$emit('list-change-sort', { attribute: this.sortby })
    }
  },
  computed: {
    ...mapGetters('category', ['getCurrentCategoryProductQuery']),
    sortingOptions () {
      return config.products.sortByAttributes
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
