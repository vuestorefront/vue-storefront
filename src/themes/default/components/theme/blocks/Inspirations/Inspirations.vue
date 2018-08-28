<template>
  <div class="inspirations">
    <div class="row">
      <div class="col-md-4 p15" v-for="(product, index) in products" :key="index">
        <inspiration-tile :product="product" />
      </div>
    </div>
  </div>
</template>

<script>

import { prepareInspirationsQuery } from 'core/api/product/queries/inspirations'

import InspirationTile from './InspirationTile.vue'
export default {
  name: 'Inspirations',

  beforeMount () {
    let inspirationsQuery = prepareInspirationsQuery()
    this.$store.dispatch('product/list', {
      query: inspirationsQuery,
      size: 3,
      sort: 'created_at:desc'
    }).then(res => {
      if (res) {
        this.products = res.items
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
