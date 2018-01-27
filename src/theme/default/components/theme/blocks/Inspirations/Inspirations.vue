<template>
  <div class="inspirations">
    <div class="row">
      <div class="col-md-4 p15" v-for="product in products">
        <inspiration-tile :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import builder from 'bodybuilder'

import InspirationTile from './InspirationTile.vue'
export default {
  name: 'inspirations',

  beforeMount () {
    let self = this
    let inspirationsQuery = builder().query('match', 'category.name', 'Performance Fabrics').build()

    self.$store.dispatch('product/list', {
      query: inspirationsQuery,
      size: 3,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        self.products = res.items
      }
    })
  },

  data () {
    return {
      products: []
    }
  },
  components: {
    InspirationTile
  }
}
</script>

<style scoped>
</style>