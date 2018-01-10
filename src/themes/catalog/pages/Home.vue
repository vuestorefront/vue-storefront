<template>
  <div id="home">
    <div class="container">
      <search />
      <div class="row mt70">
        <div v-for="category in pinnedCategories" :key="category.title" class="col-md-4 mb20">
          <category-tile :label="category.title"/>
        </div>
      </div>
      <h2 class="center-xs mt40">Products</h2>
      <div class="row">
        <!-- Prod tiles -->
      </div>
      <h2 class="center-xs mt40 mb30">Magazine</h2>
      <div class="row">
          <div v-for="(magazine, index) in magazines" :key="magazine.title" class="col-md-6" :class="{ pr0 : index % 2 == 0, pl0 : index % 2 == 1 }">
            <magazine-tile class="b" :class="{ 'b-right-none' : index % 2 == 0 }" :title="magazine.title" :category="magazine.category" :bg-url="magazine.bgUrl" />
          </div>
      </div>
    </div>
    <div class="flex center-xs bg-secondary py70 mt45">
      <div class="container">
        <div class="row center-xs">
          <div class="col-md-8 center-xs">
            <MagazineSubscribeForm />
          </div>
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
import MagazineTile from 'theme/components/theme/MagazineTile'
import MagazineSubscribeForm from 'theme/components/theme/MagazineSubscribeForm'

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
    this.getProducts(query, 8).then(res => { this.newProducts = res.items })
  },
  components: {
    Search,
    CategoryTile,
    MagazineTile,
    MagazineSubscribeForm
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

