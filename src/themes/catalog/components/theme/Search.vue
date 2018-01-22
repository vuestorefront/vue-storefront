<template>
  <section class="search c-on-dark middle-xs">
      <div class="row center-xs pb20">
          <div class="col-md-6">
              <h1 class="c-on-dark extrabold">Find the right sporting clothes for all situations</h1>
          </div>
      </div>
      <div class="row center-xs">
          <div class="search-box col-md-8">
              <input ref="search" v-model="search" @input="makeSearch" type="text" class="m0 px25 inline-flex fs-medium" placeholder="What are you looking for?">
          </div>
      </div>
      <div class="top-searches row center-xs py70 fs-medium">
          <span class="extrabold px15">Top searches</span>
          <span class="px15 c-on-dark pointer" @click="search = 'Shoes'; makeSearch()">Shoes</span>
          <span class="px15 c-on-dark pointer" @click="search = 'Bags';  makeSearch()">Bags</span>
          <span class="px15 c-on-dark pointer" @click="search = 'Longsleeves'; makeSearch()">Longsleeves</span>
          <span class="px15 c-on-dark pointer" @click="search = 'Jackets';  makeSearch()">Jackets</span>
      </div>
      <div class="row" v-if="search">
        <div v-for="(product, index) in products" :key="index" class="col-md-4 mb15">
          <router-link :to="`/p/${product.sku}/${product.slug}/${product.sku}`">
            <product-tile :product="product" class="b bg-primary"/>
          </router-link>
        </div>  
      </div>
  </section>
</template>

<script>
import { coreComponent } from 'lib/themes'
import ProductTile from 'theme/components/core/ProductTile'

export default {
  data () {
    return {
      search: null,
      emptyResults: false
    }
  },
  methods: {
    focusSearchBox () {
      this.$refs.search.focus()
    }
  },
  mounted () {
    this.focusSearchBox()
    this.$bus.$on('focusSearch', () => {
      this.focusSearchBox()
    })
  },
  components: {
    ProductTile
  },
  mixins: [coreComponent('core/blocks/SearchPanel/SearchPanel')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/_colors.scss';

.search {
    padding-top: 100px;
}

.search-box {
    input, button {
        height: 60px;
        box-sizing: border-box;
        border: none;
    }
    input {
        width: 100%;
    }
    button {
        width: 25%;
        outline: none;
    }
}

.top-searches a:hover {
    text-decoration: underline;
}
</style>
