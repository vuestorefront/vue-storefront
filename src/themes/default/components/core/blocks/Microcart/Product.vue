<template>
  <div>
    <div class="row pr55 pt20 pb20">
      <img v-lazy="thumbnail" />
      <div class="col-xs pl40 pb15 pt15">
        <div>
          <div>{{ product.name }}</div>
          <div class="h6 c-lightgray pt5">{{ product.sku }}</div>
        </div>
        <div>
          <div><span class="h6 c-darkgray">Qty </span> 
          <span class="h6 weight-400" :class="{ hidden: isEditing }">{{ product.qty }}</span>
          <span :class="{ hidden: !isEditing }">
            <input class="h6" type="number" autofocus v-model.number="qty" @change="updateQuantity">
          </span>
          </div>
        </div>
      </div>
      <div class="col-xs pb15 pt15 align-right">
        <div>
          <span class="price-special" v-if="product.special_price">{{ product.priceInclTax | price }}</span>&nbsp;
          <span class="price-original" v-if="product.special_price" >{{ product.originalPriceInclTax | price }}</span>

          <span v-if="!product.special_price" >{{ product.priceInclTax | price }}</span>
        </div>
        <div>
          <div class="c-darkgray"><span @click="switchEdit"><edit-button class="c-darkgray" /></span></div>
          <div class="mt5"><span @click="removeItem"><remove-button class="c-darkgray" /></span></div>
        </div>
      </div>
    </div>
  </div>  
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

<style scoped>
.price-special {
  color: red
}
.price-original {
  text-decoration: line-through;
  font-size: smaller
}
.col-xs {
  display: flex;
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
