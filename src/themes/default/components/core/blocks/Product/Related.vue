<template>
  <section
    class="py20 new-collection container px15"
    v-if="product.related[type] && product.related[type].length > 0"
  >
    <div>
      <header class="col-md-12">
        <h2 class="align-center cl-accent">
          {{ heading }}
        </h2>
      </header>
    </div>
    <div class="row center-xs">
      <product-listing columns="4" :products="product.related[type]" />
    </div>
  </section>
</template>

<script>
import ProductListing from 'theme/components/core/ProductListing'

import builder from 'bodybuilder'
import i18n from '@vue-storefront/core/lib/i18n'
import config from 'config'

export default {
  name: 'Related',
  props: {
    type: {
      type: String,
      required: true
    },
    heading: {
      type: String,
      required: false,
      default: i18n.t('Similar products')
    }
  },
  components: {
    ProductListing
  },
  created () {
    this.$bus.$on('product-after-load', this.refreshList)

    if (config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.refreshList)
      this.$bus.$on('user-after-logout', this.refreshList)
    }
  },
  beforeDestroy () {
    if (config.usePriceTiers) {
      this.$bus.$off('user-after-loggedin', this.refreshList)
      this.$bus.$off('user-after-logout', this.refreshList)
    }
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
  },
  beforeMount () {
    this.refreshList()
  },
  methods: {
    refreshList () {
      let sku = this.productLinks
        .filter(pl => pl.link_type === this.type)
        .map(pl => pl.linked_product_sku)

      let query = builder().query('terms', 'sku', sku)
      if (sku.length === 0) {
        sku = this.product.current.category.map(cat => cat.category_id)
        query = builder().query('terms', 'category.category_id', sku)
          .andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 })
          .andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 })
      }
      query = query.andFilter('range', 'status', { 'gte': 0, 'lt': 2 }/* 2 = disabled, 4 = out of stock */)
      if (config.products.listOutOfStockProducts === false) {
        query = query.andFilter('match', 'stock.is_in_stock', true)
      }

      query = query.build()

      this.$store.dispatch('product/list', {
        query,
        size: 8,
        prefetchGroupProducts: false,
        updateState: false
      }).then((response) => {
        if (response) {
          this.$store.dispatch('product/related', {
            key: this.type,
            items: response.items
          })
          this.$forceUpdate()
        }
      })
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    },
    productLinks () {
      return this.product.current.product_links
    }
  }
}
</script>
