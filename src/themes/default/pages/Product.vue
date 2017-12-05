<template>
  <div id="product">
    <div class="bg-lightgray py35 pl20 px20">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <breadcrumbs :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" />
          </div>
        </div>
        <div class="row py35">
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
                  <color-button v-for="c in options.color" :id="c.id" :label="c.label" context="product" code="color" class="mr10" :class="{ active: c.id == configuration.color.id }" v-if="option.label == 'Color'" />
                  <size-button v-for="s in options.size" :id="s.id" :label="s.label" context="product" code="size" class="mr10" :class="{ active: s.id == configuration.size.id }" v-if="option.label == 'Size'"/>
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
        </div>
      </div>
    </div>
    <div>
      <div class="container mb15 c-black">
        <div class="row py35 px20">
          <div class="col-md-9">
            <h2 class="h3 sans-serif">Description</h2>
            <span class="lh30 h5" v-html="product.description"></span>
          </div>
          <div class="col-md-3">
            <h2 class="h3 sans-serif">Product details</h2>
            <ul>
              <product-attribute v-bind:key="attr.attribute_code" v-for="attr in all_custom_attributes" :product="product" :attribute="attr" emptyPlaceholder="N/A"></product-attribute>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import AddToCart from '../components/core/AddToCart.vue'
import ColorButton from '../components/core/ColorButton.vue'
import SizeButton from '../components/core/SizeButton.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import ProductAttribute from '../components/core/ProductAttribute.vue'

import { thumbnail } from 'src/lib/filters'
import EventBus from 'src/event-bus/event-bus'

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
      EventBus.$emit('notification', {
        type: 'success',
        message: 'Product has been added to comparison list. This feature is not implemented yet :(',
        action1: { label: 'OK', action: 'close' }
      })
    }
  },
  components: {
    AddToCart,
    ColorButton,
    SizeButton,
    Breadcrumbs,
    ProductAttribute
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
</style>
