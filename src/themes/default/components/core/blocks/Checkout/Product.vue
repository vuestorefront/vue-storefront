<template>
  <div class="row p25 between-xs">
    <img class="blend" v-lazy="thumbnail">
    <div class="col-xs">
      <div class="row">
        <div class="col-xs-12 col-md-9 pb15">
          <div class="mb15">
            <div class="h4 weight-400 c-darkgray serif">{{ product.name | htmlDecode }}</div>
            <div class="error" v-if="product.warning_message">
              {{ product.warning_message }}
            </div>
            <div class="h5 c-lightgray-secondary pt5">{{ product.sku }}</div>
          </div>
          <div>
            <div>
              <span class="h5 c-gray-secondary">
                {{ $t('Qty') }}
                <span class="weight-700">
                  {{ product.qty }}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-3 serif">
          <div>
            <span class="h4 c-red" v-if="product.special_price">{{ product.priceInclTax | price }} </span>
            <span class="price-original h5" v-if="product.special_price" >{{ product.originalPriceInclTax | price }}</span>
            <span v-if="!product.special_price" class="h4">{{ product.priceInclTax | price }}</span>
          </div>
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
.price-original {
  text-decoration: line-through;
}
.blend {
  mix-blend-mode: multiply;
}
</style>
