<template>
  <div id="Category">
    Core Category
  </div>
</template>

<script>
let bodybuilder = require('bodybuilder')

export default {
  name: 'category',
  beforeMount () {
    const self = this
    this.$store.dispatch('catalog/quickSearchByQuery',
      bodybuilder().query('match', 'name', 'Bag').aggregation('terms', 'category.id').build()
    ).then(function (res) {
      self.products = res.items
    })
  },
  data () {
    return {
      products: {},
      categoryName: this.$route.params.name,
      filters: {
        color: ['red', 'blue'],
        size: ['XS', 'S', 'M', 'L', 'XL']
      }
    }
  }
}
</script>

<style scoped>

</style>
