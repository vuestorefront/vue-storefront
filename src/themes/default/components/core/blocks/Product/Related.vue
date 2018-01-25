<template>
  <div>
    <products-slider
      v-if="related.by_erin && related.by_erin.length > 0"
      :products="related.by_erin"
      :config="sliderConfig"
      title="Erin Recommends"
    />
    <section
      v-if="related.by_category && related.by_category.length > 0"
      class="new-collection container pt40 px15"
    >
      <div>
        <header class="col-md-12">
          <h2 class="align-center c-black">
            Similar products
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
import ProductsSlider from '../../ProductsSlider.vue'
import ProductListing from '../../ProductListing.vue'

export default {
  data () {
    return {
      sliderConfig: {
        perPage: 4,
        perPageCustom: [
          [768, 6]
        ],
        paginationEnabled: false,
        loop: true
      }
    }
  },
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
    ProductsSlider,
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
