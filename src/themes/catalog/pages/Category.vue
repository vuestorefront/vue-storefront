<template>
    <div id="category">
        <div class="top-bar b-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 center-xs mt20 mb0">
                        <h1> {{ category.name }}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 uppercase semibold center-xs c-secondary-lighter">
                        <ul class="mb0">
                            <li class="active py15 mx15">All items</li>
                            <li class="py15 mx15">Bestsellers</li>
                            <li class="py15 mx15">Sales</li>
                            <li class="py15 mx15">New arrivals</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="container animate">
                <div class="row my50">
                    <div v-for="(product, index) in products" :key="product.name" class="col-md-3" :class="{ pr0 : index % 4 != 0, pl0 : index % 4 != 1 }">
                        <router-link :to="`/p/${product.sku}/${product.slug}/${product.sku}`">
                            <product-tile class="b" :product="product" :class="{ 'b-right-none' : index % 4 != 0 }"/>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { corePage } from 'lib/themes'
import ProductTile from 'theme/components/core/ProductTile'

export default {
  mounted () {
    // const ScrollReveal = require('scrollreveal')()
    // ScrollReveal.reveal('.animate', {
    //   distance: 0,
    //   scale: 0.7,
    //   duration: 1000,
    //   viewFactor: 0.01,
    //   origin: 'top'
    // })
  },
  components: {
    ProductTile
  },
  mixins: [corePage('Category')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/colors';
.top-bar ul {
    list-style-type: none;
    position: relative;
    bottom: -1px;
    li {
        display: inline-flex;
    }
    li.active {
        border-bottom: $c-accent solid 2px;
        color: $c-text-primary;
    }
}
</style>
