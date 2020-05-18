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

import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

import InspirationTile from './InspirationTile.vue'
export default {
  name: 'Inspirations',

  async beforeMount () {
    let inspirationsQuery = prepareQuery({ queryConfig: 'inspirations' })
    const { items } = await this.$store.dispatch('product/findProducts', {
      query: inspirationsQuery,
      size: 3,
      sort: 'created_at:desc',
      options: {
        populateRequestCacheTags: false,
        prefetchGroupProducts: false
      }
    })
    if (items.length) {
      this.products = items
    }
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
