<template>
  <div>
    <div class="row pr55 pt20 pb20">
      <img v-lazy="thumbnail" />
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
          $ {{ product.priceInclTax }}
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
