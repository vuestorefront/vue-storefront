<template>
  <div>
    <section
      v-if="related.by_erin && related.by_erin.length > 0"
      class="new-collection container pt15 px15"
    >
      <div>
        <header class="col-md-12">
          <h2 class="align-center c-darkgray">
            {{ $t('Erin Recommends') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <product-listing columns="4" :products="related.by_erin" />
      </div>
    </section>
    <section
      v-if="related.by_category && related.by_category.length > 0"
      class="new-collection container py30 px15"
    >
      <div>
        <header class="col-md-12">
          <h2 class="align-center c-darkgray">
            {{ $t('Similar products') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <product-listing columns="4" :products="related.by_category" />
      </div>
    </section>
  </div>
</template>

<script>
import builder from 'bodybuilder'
import ProductListing from '../../ProductListing.vue'

export default {
  beforeMount () {
    let store = this.$store
    let inst = this
    let byErinRecommends = builder().query('match', 'erin_recommends', '1').andFilter('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */).build()
    let byCategoryQuery = builder().query('terms', 'category.category_id', this.product.category.map((cat) => { return cat.category_id })).andFilter('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */).build()
    store.dispatch('product/list', {
      query: byErinRecommends,
      size: 8,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        store.dispatch('product/related', { key: 'by_erin', items: res.items })
        inst.$forceUpdate()
      }
    })
    this.$store.dispatch('product/list', {
      query: byCategoryQuery,
      size: 8,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        store.dispatch('product/related', { key: 'by_category', items: res.items })
        inst.$forceUpdate()
      }
    })
  },
  components: {
    ProductListing
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
