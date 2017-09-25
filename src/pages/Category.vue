<template>
  <div id="Category">
    Core Category
  </div>
</template>

<script>
import * as bodybuilder from 'bodybuilder'

export default {
  name: 'category',

   methods: {
     fetchData (to) {

      let self = this
      let slug = this.$route.params.slug

      self.$store.dispatch('catalog/loadCategories').then((categories) => {
        self.category = self.$store.state.catalog.categories.find((itm) => { return itm.slug === slug })

        if (self.category === null) {
          throw new Error('Category not found!') // TODO: handle errors better way
        }

        this.$store.dispatch('catalog/quickSearchByQuery',
          bodybuilder().query('match', 'category.category_id', self.category.id).build() // filter out products from this specific category
        ).then(function (res) {
          self.products = res.items
        })
      })    
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
 
  created () {
    this.fetchData()
  },
  data () {
    return {
      products: {},
      category: {},
      filters: { // filters should be set by category, and should be synchronized with magento
        color: ['red', 'blue'],
        size: ['XS', 'S', 'M', 'L', 'XL']
      }
    }
  }
}
</script>

<style scoped>

</style>
