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

import { prepareRelatedQuery } from '@vue-storefront/core/modules/product/queries/related'
import i18n from '@vue-storefront/i18n'
import store from '@vue-storefront/store'

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
    this.$bus.$on('product-after-load', this.refreshList)

    if (store.state.config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.refreshList)
      this.$bus.$on('user-after-logout', this.refreshList)
    }

    this.refreshList()
  },
  beforeDestroy () {
    if (store.state.config.usePriceTiers) {
      this.$bus.$off('user-after-loggedin', this.refreshList)
      this.$bus.$off('user-after-logout', this.refreshList)
    }
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
  },
  methods: {
    refreshList () {
      let sku = this.productLinks
        .filter(pl => pl.link_type === this.type)
        .map(pl => pl.linked_product_sku)

      let key = 'sku'
      if (!(sku.length > 0)) {
        sku = this.product.current.category.map(cat => cat.category_id)
        key = 'category_ids'
      }
      let relatedProductsQuery = prepareRelatedQuery(key, sku)

      this.$store.dispatch('product/list', {
        query: relatedProductsQuery,
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
