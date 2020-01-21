<template>
  <div class="row p10 between-xs">
    <div class="blend">
      <product-image :image="image" />
    </div>
    <div class="col-xs px10">
      <div class="row">
        <div class="col-xs-12 col-md-9 col-sm-8 pb15">
          <div class="mb15">
            <div class="h4 weight-400 cl-accent serif">
              {{ product.name | htmlDecode }}
            </div>
            <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
              {{ product.errors | formatProductMessages }}
            </div>
            <div class="h5 cl-tertiary pt5">
              {{ product.sku }}
            </div>
            <div class="h6 cl-bg-tertiary pt5 options" v-if="product && product.options">
              <div v-for="opt in product.options" :key="opt.label">
                <span class="opn">{{ opt.label }}: </span>
                <span class="opv" v-html="opt.value" />
              </div>
            </div>
            <div class="h6 cl-bg-tertiary pt5 options" v-else-if="product.options">
              <div v-for="opt in product.options" :key="opt.label">
                <span class="opn">{{ opt.label }}: </span>
                <span class="opv" v-html="opt.value" />
              </div>
            </div>
          </div>
          <div>
            <div v-if="isOnline && product.totals">
              <span class="h4 cl-error" v-if="product.totals.discount_amount">{{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price }} </span>
              <span class="price-original h5" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax | price }}</span>
              <span v-if="!product.totals.discount_amount" class="h4">{{ product.totals.row_total_incl_tax | price }}</span>
            </div>
            <div v-else>
              <span class="h4 cl-error" v-if="product.special_price">{{ product.price_incl_tax * product.qty | price }} </span>
              <span class="price-original h5" v-if="product.special_price">{{ product.original_price_incl_tax * product.qty | price }}</span>
              <span v-if="!product.special_price" class="h4">{{ product.price_incl_tax * product.qty | price }}</span>
            </div>
          </div>

        </div>
        <div class="col-xs-12 col-md-3 col-sm-4 serif text-c-dt">
          <button class="btn normal-icon-btn" ><i class="material-icons">favorite_border</i></button>
          <button class="btn normal-icon-btn" ><i class="material-icons" @click="removeItem">delete</i></button>
          <div class="qty-add-dlt mt15">
            <button class="btn" @click="updateQuantity(product.qty-1)"><i class="material-icons">remove</i></button>
            <span>{{product.qty}}</span>
            <button class="btn" @click="updateQuantity(product.qty+1)" ><i class="material-icons">add</i></button>
          </div>
          <div class="static-available mt15">Limited quantity available</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from '@vue-storefront/core/modules/checkout/components/Product'
import { onlineHelper } from '@vue-storefront/core/helpers'
import ProductImage from 'theme/components/core/ProductImage'

export default {
  computed: {
    isOnline () {
      return onlineHelper.isOnline
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    }
  },
  mixins: [Product],
  components: {
    ProductImage
  }
}
</script>

<style scoped>
.price-original {
  text-decoration: line-through;
}
.blend {
  flex: 0 0 121px;
  overflow: hidden; /*Added BY Dan 30-12-2019*/
}
</style>
