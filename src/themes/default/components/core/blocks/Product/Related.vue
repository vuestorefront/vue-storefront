<template>
  <div>
    <products-slider 
      :products="related.by_erin" 
      :config="sliderConfig" 
      v-if="related.by_erin && related.by_erin.length > 0" 
      title="Erin Recommends" 
    />
    <section v-if="related.by_category && related.by_category.length > 0">
      <div class="container pt50">
        <div class="row center-xs">
          <div class="col-md-12">
            <h2 class="align-center">Similar products </h2>
          </div>
        </div>
      </div>
      <div class="container pb70">
        <div class="row center-xs">
          <div v-for='(product, key) in related.by_category' v-bind:key='product.id' class="col-md-3">
            <product-tile :instant='key < 4 ? true : false' :product="product"/>
          </div>
        </div>
      </div>
    </section>
  </div>    
</template>
<script>
import builder from 'bodybuilder'
import ProductTile from '../../ProductTile.vue'
import ProductsSlider from '../../ProductsSlider.vue'

export default {
  data () {
    return {
      sliderConfig: {
        perPage: 6,
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
    ProductTile,
    ProductsSlider
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
