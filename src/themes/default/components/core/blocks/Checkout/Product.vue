<template>
  <div>
    <div class="row pr55 pt20 pb20">
      <img class="blend" v-lazy="thumbnail" />
      <div class="col-xs pl40 pb15 pt15">
        <div>
          <div>{{ product.name }}</div>
          <div class="error" v-if="product.warning_message">
            {{ product.warning_message }}
          </div>
          <div class="h6 c-lightgray pt5">{{ product.sku }}</div>
        </div>
        <div>
          <div>
            <span class="h6 c-darkgray">Qty {{ product.qty }}</span>
          </div>
        </div>
      </div>
      <div class="col-xs pb15 pt15 align-right">
        <div>
          <span class="price-special" v-if="product.special_price">{{ product.priceInclTax | price }}</span>&nbsp;
          <span class="price-original" v-if="product.special_price" >{{ product.originalPriceInclTax | price }}</span>

          <span v-if="!product.special_price" >{{ product.priceInclTax | price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Checkout/Product')]
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
.blend {
  mix-blend-mode: multiply;
}
</style>
