<template>
  <div id="product">
    <section class="bg-lightgray py35 px20">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <breadcrumbs :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" />
          </div>
        </div>
        <section class="row py35">
          <div class="col-xs-12 col-md-7 center-xs middle-xs">
            <transition name="fade" appear>
              <img class="product-image" v-lazy="imgObj" ref="image"/>
            </transition>
          </div>
          <div class="col-md-5">

            <h1 class="mb25 c-black"> {{ product.name | htmlDecode }} </h1>
            <div class="h3 c-gray mb55" v-if="configured_product.special_price">
              <span class="price-special">{{ configured_product.priceInclTax | price }}</span>&nbsp;
              <span class="price-original" >{{ configured_product.originalPriceInclTax | price }}</span>
            </div>
            <div class="h3 c-gray mb55" v-if="!configured_product.special_price">
              {{ configured_product.priceInclTax | price }}
            </div>

            <div class="variants" v-if="product.type_id =='configurable' && !loading">
              <div class="h4" v-for="(option, index) in configured_product.configurable_options" :key="index">
                <span>{{ option.label }} <strong>{{ configuration[option.label.toLowerCase()].label }}</strong></span>
                <div class="mt20 mb45">
                  <color-button v-for="(c, i) in options.color" :key="i" :id="c.id" :label="c.label" context="product" code="color" class="mr10" :class="{ active: c.id == configuration.color.id }" v-if="option.label == 'Color'" />
                  <size-button v-for="(s, i) in options.size" :key="i" :id="s.id" :label="s.label" context="product" code="size" class="mr10" :class="{ active: s.id == configuration.size.id }" v-if="option.label == 'Size'" />
                  <router-link to="/size-guide" v-if="option.label == 'Size'" class="p0 ml30 action size-guide">
                    <i class="pr5 material-icons">accessibility</i>
                      Size guide
                  </router-link>
                </div>
              </div>
            </div>
            <add-to-cart :product="configured_product" class="h4 bg-black c-white px55 py20 brdr-none" />
            <div class="row pt45">
              <div class="col-xs-6 col-md-5">
                <button class="p0 bg-transparent brdr-none action" @click="addToFavorite">
                  <i class="pr5 material-icons">{{ favorite.icon }}</i>
                    Add to favorite
                </button>
              </div>
              <div class="col-xs-6 col-md-5">
                <button class="p0 bg-transparent brdr-none action" @click="addToCompare">
                  <i class="pr5 material-icons">compare</i>
                    Add to compare
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section class="container pt50 pb20 px40 c-black">
      <h2 class="h3 m0 mb10 sans-serif">Product details</h2>
      <div class="row between-md">
        <div class="col-md-5">
          <div class="lh30 h4 c-gray-secondary" v-html="product.description"></div>
        </div>
        <div class="col-md-6">
          <ul class="attributes h4 p0 pt10 m0">
            <product-attribute v-bind:key="attr.attribute_code" v-for="attr in all_custom_attributes" :product="product" :attribute="attr" emptyPlaceholder="N/A"></product-attribute>
          </ul>
        </div>
      </div>
    </section>

    <!-- Replace with slider -->
    <section>
      <div class="container">
        <div class="row center-xs">
          <div class="col-md-12">
            <h2 class="align-center">Perfect match</h2>
          </div>
        </div>
      </div>
      <div class="row bg-lightgray">
        <div class="container">
          <div class="col-md-12">
            <div class="row pb45 pt45 center-xs perfect-match">
              <product-tile v-for='product in perfectMatchCollection' v-bind:key='product.id' class="col-md-3" :product="product"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container pt50">
        <div class="row center-xs">
          <div class="col-md-12">
            <h2 class="align-center">Others bought also</h2>
          </div>
        </div>
      </div>
      <div class="container pb70">
        <div class="row center-xs">
          <div v-for='(product, key) in othersBoughtCollection' v-bind:key='product.id' class="col-md-3">
            <product-tile :instant='key < 4 ? true : false' :product="product"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import AddToCart from '../components/core/AddToCart.vue'
import ColorButton from '../components/core/ColorButton.vue'
import SizeButton from '../components/core/SizeButton.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import ProductAttribute from '../components/core/ProductAttribute.vue'
import ProductTile from '../components/core/ProductTile.vue'

import { thumbnail } from 'src/lib/filters'
import builder from 'bodybuilder'

export default {
  data () {
    return {
      favorite: {
        isFavorite: false,
        icon: 'favorite_border'
      }
    }
  },
  computed: {
    imgObj () {
      return {
        src: thumbnail(this.configured_product.image, 570, 569),
        error: thumbnail(this.configured_product.image, 310, 300),
        loading: thumbnail(this.configured_product.image, 310, 300)
      }
    },
    perfectMatchCollection () {
      return this.$store.state.product.perfect_match
    },
    othersBoughtCollection () {
      return this.$store.state.product.others_bought
    }
  },
  methods: {
    addToFavorite () {
      let self = this
      if (!self.favorite.isFavorite) {
        this.$store.dispatch('wishlist/addItem', self.product).then(res => {
          self.favorite.icon = 'favorite'
          self.favorite.isFavorite = true
        })
      } else {
        this.$store.dispatch('wishlist/removeItem', self.product).then(res => {
          self.favorite.icon = 'favorite_border'
          self.favorite.isFavorite = false
        })
      }
    },
    addToCompare () {
      // todo
      this.$bus.$emit('notification', {
        type: 'success',
        message: 'Product has been added to comparison list. This feature is not implemented yet :(',
        action1: { label: 'OK', action: 'close' }
      })
    }
  },
  asyncData ({ store, route }) {
    return new Promise((resolve, reject) => {
      let perfectMatchQuery = builder().query('match', 'category.name', 'Women').build()
      let otherBoughtQuery = builder().query('match', 'category.name', 'Tees').build()
      store.dispatch('product/list', {
        query: perfectMatchQuery,
        size: 4,
        sort: 'created_at:desc'
      }).then(function (res) {
        if (res) {
          store.state.product.perfect_match = res.items
        }
        store.dispatch('category/list', {}).then((categories) => {
          store.dispatch('product/list', {
            query: otherBoughtQuery,
            size: 8,
            sort: 'created_at:desc'
          }).then(function (res) {
            if (res) {
              store.state.product.others_bought = res.items
            }
            return resolve()
          })
        })
      })
    })
  },
  components: {
    AddToCart,
    ColorButton,
    SizeButton,
    Breadcrumbs,
    ProductAttribute,
    ProductTile
  },
  mixins: [corePage('Product')]
}
</script>

<style scoped>
.price-original {
  text-decoration: line-through;
  font-size: smaller;
}
.price-special {
  color: red;
}
.action {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #BDBDBD;
  cursor: pointer;
}
.action:hover {
  color: #828282;
}
.attributes {
  list-style-type: none;
}
.size-guide {
  position: relative;
  top: 6px;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.product-image {
  display: inline-flex;
  mix-blend-mode: multiply;
  max-width: 100%;
  width: 460px;
}
.perfect-match {
  mix-blend-mode: darken;
}
</style>
