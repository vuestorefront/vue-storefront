<template>
  <div id="home">
    <div class="container mb45">
      <search />
      <div class="row mt70 animate">
        <div v-for="category in pinnedCategories" :key="category.title" class="col-md-4 mb20">
          <router-link to="/c/cat">
            <category-tile :label="category.title"/>
          </router-link>
        </div>
      </div>
      <div class="row animate">
        <h2 class="center-xs mt80 mb40 col-md-12">New items</h2>
        <div v-for="(product, index) in newProducts" :key="index" class="col-md-3" :class="{ pr0 : (index+1) % 4 != 0, pl0 : (index+1) % 4 != 1 }">
          <router-link :to="`/p/${product.sku}/${product.slug}/${product.sku}`">
            <product-tile :product="product" class="b" :class="{ 'b-right-none' : (index+1) % 4 != 0 }"/>
          </router-link>
        </div>
      </div>
      <div class="row animate">
          <h2 class="center-xs mt80 mb40 animate col-md-12">Magazine</h2>
          <div v-for="(magazine, index) in magazines" :key="magazine.title" class="col-md-6" :class="{ pr0 : index % 2 == 0, pl0 : index % 2 == 1 }">
            <router-link to="/">
              <magazine-tile class="b" :class="{ 'b-right-none' : index % 2 == 0 }" :title="magazine.title" :category="magazine.category" :bg-url="magazine.bgUrl" />            
            </router-link>
          </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import Meta from 'src/lib/meta'
import builder from 'bodybuilder'
import Search from 'theme/components/theme/Search'
import CategoryTile from 'theme/components/core/CategoryTile'
import ProductTile from 'theme/components/core/ProductTile'
import MagazineTile from 'theme/components/theme/MagazineTile'

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
      }],
      magazines: [{
        title: '10 the most extreme roads for running',
        category: 'Guide',
        bgUrl: '/assets/homepage/magazines/roads.png'
      }, {
        title: 'What is the best way to train for a marathon?',
        category: ' Guide',
        bgUrl: '/assets/homepage/magazines/marathon.png'
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
    this.getProducts(query, 8).then(res => { this.newProducts = res.items; console.log(this.newProducts) })
  },
  mounted () {
    const ScrollReveal = require('scrollreveal')()
    ScrollReveal.reveal('.animate', {
      distance: 0,
      scale: 0.7,
      duration: 1000
    })
  },
  components: {
    Search,
    CategoryTile,
    ProductTile,
    MagazineTile
  },
  mixins: [Meta]
}
</script>

<style lang="scss" scoped>
#home {
  background: url('/assets/homepage_bg.png') no-repeat;
  background-size: 100% auto;
}
</style>

