<template>
  <div id="home">
    <div class="container">
      <search />
      <!-- Categories -->
      <div class="row mt70">
        <div v-for="category in pinnedCategories" :key="category.title" class="col-md-4 mb20">
          <category-tile :label="category.title"/>
        </div>
      </div>
      <!-- Products -->
      <h2 class="center-xs mt40">Products</h2>
      <div class="row">
        <!-- Prod tiles -->
      </div>
      <h2 class="center-xs mt40">Magazine</h2>
    </div>
  </div>
</template>

<script>
import Meta from 'src/lib/meta'
import builder from 'bodybuilder'
import Search from 'theme/components/theme/Search'
import CategoryTile from 'theme/components/core/CategoryTile'

export default {
  meta: {
    title: 'Home Page'
  },
  data () {
    return {
      newProducts: [],
      pinnedCategories: [{
        title: 'Sale',
        bgUrl: ''
      }, {
        title: 'Outdoor',
        bgUrl: ''
      }, {
        title: 'Handball',
        bgUrl: ''
      }, {
        title: 'Nordic',
        bgUrl: ''
      }, {
        title: 'Sport Gear',
        bgUrl: ''
      }, {
        title: 'Basketball',
        bgUrl: ''
      }]
    }
  },
  methods: {
    getProducts (query, size) {
      const params = {
        query: query,
        size: size,
        sort: 'created_at:desc'
      }
      return this.$store.dispatch('product/list', params)
    }
  },
  created () {
    const query = builder().query('match', 'category.name', 'Tees').build()
    this.getProducts(query, 8).then(res => { this.newProducts = res.items })
  },
  components: {
    Search,
    CategoryTile
  },
  mixins: [Meta]
}
</script>

<style lang="scss" scoped>
#home {
  background: url('/assets/homepage_bg.png') no-repeat;
  background-size: cover;
}
</style>

