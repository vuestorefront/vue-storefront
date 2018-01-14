<template>
  <li class="row py20">
    <div class="bg-lightgray product-image">
      <img v-lazy="thumbnail" />
    </div>
    <div class="col-xs flex pl35 py15 vartical-content">
      <div>
        <div class="serif h4">
          {{ product.name | htmlDecode }}
        </div>
        <div class="h6 c-lightgray pt5">
          {{ product.sku }}
        </div>
        <div class="h6 pt5 error" v-if="product.warning_message">
          {{ product.warning_message }}
        </div>
        <div class="h6 pt5 info" v-if="product.info_message">
          {{ product.info_message }}
        </div>
      </div>
      <div>
        <div>
          <span class="h6 c-darkgray">
            Qty
          </span>
          <span class="h6 weight-400" :class="{ hidden: isEditing }">
            {{ product.qty }}
          </span>
          <span :class="{ hidden: !isEditing }">
            <input
              class="h6"
              type="number"
              autofocus
              v-model.number="qty"
              @change="updateQuantity"
            >
          </span>
        </div>
      </div>
    </div>
    <div class="flex pb15 pt15 align-right vartical-content">
      <div>
        <span class="price-special" v-if="product.special_price">
          {{ product.priceInclTax | price }}
        </span>&nbsp;
        <span class="price-original" v-if="product.special_price">
          {{ product.originalPriceInclTax | price }}
        </span>
        <span class="h4 serif" v-if="!product.special_price">
          {{ product.priceInclTax | price }}
        </span>
      </div>
      <div>
        <div class="c-darkgray">
          <span @click="switchEdit">
            <edit-button class="c-darkgray" />
          </span>
        </div>
        <div class="mt5">
          <span @click="removeItem">
            <remove-button class="c-darkgray" />
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { coreComponent } from 'lib/themes'

import EditButton from './EditButton'
import RemoveButton from './RemoveButton'

export default {
  data () {
    return {
      qty: 0,
      isEditing: false
    }
  },
  created () {
    this.$bus.$on('cart-after-itemchanged', (event) => {
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    })
  },
  methods: {
    removeItem () {
      this.$store.dispatch('cart/removeItem', this.product)
    },
    updateQuantity () {
      if (this.qty <= 0) {
        this.qty = this.product.qty
      }
      this.$store.dispatch('cart/updateQuantity', { product: this.product, qty: this.qty })
      this.isEditing = !this.isEditing
    },
    switchEdit () {
      this.isEditing ? this.updateQuantity() : this.qty = this.product.qty
      this.isEditing = !this.isEditing
    }
  },
  components: {
    EditButton,
    RemoveButton
  },
  mixins: [coreComponent('core/blocks/Microcart/Product')]
}
</script>

<style lang="scss" scoped>
  .product-image {
    img {
      mix-blend-mode: multiply;
      vertical-align: top;
    }
  }

  .product-details {
    flex-direction: column;
    justify-content: space-between;
  }

  .error {
    color: red
  }

  .info {
    color: green
  }

  .price-special {
    color: red
  }

  .price-original {
    text-decoration: line-through;
    font-size: smaller
  }

  .vartical-content{
    flex-direction: column;
    justify-content: space-between;
  }

  .hidden {
    display: none;
  }

  input {
    width: 30px;
  }
</style>
