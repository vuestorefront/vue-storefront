<template>
  <div class="similar row" >
    <router-link :class="classes" v-for='(product, key) in related.by_category' v-bind:key='product.id' :to="`/p/${product.sku}/${product.slug}/${product.sku}`">
      <product-tile  :instant='key < 4 ? true : false' :product="product"/>
    </router-link>
  </div>
</template>

<script>
import builder from 'bodybuilder'
import ProductTile from 'theme/components/core/ProductTile.vue'

export default {
  props: {
    number: {
      type: Number,
      required: true
    },
    classes: {
      type: String
    }
  },
  beforeMount () {
    let store = this.$store
    let inst = this
    let byCategoryQuery = builder().query('terms', 'category.category_id', this.product.category.map((cat) => { return cat.category_id })).andFilter('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */).build()

    this.$store.dispatch('product/list', {
      query: byCategoryQuery,
      size: this.number,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        store.dispatch('product/related', { key: 'by_category', items: res.items })
        inst.$forceUpdate()
      }
    })
  },
  components: {
    ProductTile
  },
  computed: {
    product () {
      return this.$store.state.product.current
    },
    related () {
      return this.$store.state.product.related
    }
  }
}
</script>