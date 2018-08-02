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

import SearchQuery from 'core/store/lib/search/searchQuery'
import i18n from 'core/lib/i18n'

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
  beforeMount () {
    let sku = this.productLinks
      .filter(pl => pl.link_type === this.type)
      .map(pl => pl.linked_product_sku)
    /* let query = builder().query('terms', 'sku', sku).build()
    if (sku.length === 0) {
      sku = this.product.current.category.map(cat => cat.category_id)
      // query = builder().query('terms', 'category.category_id', sku)
        .andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 })
        .build()
    }

    this.$store.dispatch('product/list', {
      query, */

    let relatedProductsQuery = new SearchQuery()
    if (sku.length === 0) {
      sku = this.product.current.category.map(cat => cat.category_id)
      relatedProductsQuery = relatedProductsQuery.applyFilter({type: 'terms', key: 'category_ids', value: sku})
    } else {
      relatedProductsQuery = relatedProductsQuery.applyFilter({type: 'terms', key: 'sku', value: sku})
    }
    relatedProductsQuery = relatedProductsQuery.applyFilter({type: 'terms', key: 'visibility', value: [2, 3, 4]})

    this.$store.dispatch('product/listByQuery', {
      searchQuery: relatedProductsQuery,
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
