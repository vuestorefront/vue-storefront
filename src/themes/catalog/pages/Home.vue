<template>
  <div id="home">
    <div class="container">
      <search />
    </div>
  </div>
</template>

<script>
import Meta from 'src/lib/meta'
import builder from 'bodybuilder'
import Search from 'theme/components/theme/Search'

export default {
  meta: {
    title: 'Home Page'
  },
  data () {
    return {
      newProducts: []
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
    Search
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

