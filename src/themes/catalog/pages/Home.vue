<template>
  <div id="home">
    <div class="container mb45">
      <search class="animate"/>
      <div class="row mt70 animate">
        <div v-for="category in categories" :key="category.name" class="col-md-4 mb15">
          <router-link :to="'/c/' + category.slug">
            <category-tile :label="category.name"/>
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
  computed: {
    categories () {
      return this.$store.state.category.list.filter(category => category.level === 2)
      // TODO: also should contain '&& category.product_count > 0' but it's omitted due to demo purposes
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
    const productQuery = builder().query('match', 'category.name', 'Tees').build()
    this.getProducts(productQuery, 8).then(res => { this.newProducts = res.items })
  },
  mounted () {
    require('scrollreveal')().reveal('.animate', {
      distance: 0,
      scale: 0.8,
      duration: 600
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

