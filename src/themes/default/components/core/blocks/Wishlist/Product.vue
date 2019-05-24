<template>
  <li class="row pr55 py20">
    <div @click="closeWishlist">
      <router-link :to="localizedRoute({
        name: product.type_id + '-product',
        fullPath: product.url_path,
        params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
      })">
        <img v-lazy="thumbnail">
      </router-link>
    </div>
    <div class="col-xs between-xs flex pl40 py15">
      <div @click="closeWishlist">
        <router-link :to="localizedRoute({
          name: product.type_id + '-product',
          fullPath: product.url_path,
          params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
        })">
          {{ product.name | htmlDecode }}
        </router-link>
        <div class="h6 cl-bg-tertiary pt5 sku">{{ product.sku }}</div>
      </div>
    </div>
    <div class="col-xs between-xs flex pl40 py15" v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'">
      <base-input-number
        :name="$t('Quantity')"
        v-model="product.qty"
        :min="1"
        @blur="$v.$touch()"
        :validations="[
          {
            condition: $v.product.qty.$error && !$v.product.qty.minValue,
            text: $t('Quantity must be above 0')
          }
        ]"
      />
    </div>
    <div class="col-xs between-xs flex pl40 py15">
      <add-to-cart
        :product="product"
        :disabled="$v.product.qty.$error && !$v.product.qty.minValue"
        class="col-xs-12 col-sm-4 col-md-6"
      />
    </div>
    <div class="col-xs flex py15 align-right">
      <div>
        <span class="price-special" v-if="product.special_price">{{ product.priceInclTax | price }}</span>&nbsp;
        <span class="price-original" v-if="product.special_price">{{ product.originalPriceInclTax | price }}</span>

        <span v-if="!product.special_price">
          {{ product.priceInclTax | price }}
        </span>
      </div>
      <div>
        <div class="mt5"><span @click="removeFromWishlist(product)"><remove-button class="cl-accent"/></span></div>
      </div>
    </div>
  </li>
</template>

<script>
import {minValue} from 'vuelidate/lib/validators'
import AddToCart from 'theme/components/core/AddToCart.vue'
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import RemoveButton from './RemoveButton'

export default {
  components: {
    AddToCart,
    BaseInputNumber,
    RemoveButton
  },
  mixins: [Product],

  methods: {
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('The product is out of stock and cannot be added to the cart!'),
        action1: {label: this.$t('OK')}
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('No such configuration for the product. Please do choose another combination of attributes.'),
        action1: {label: this.$t('OK')}
      })
    }
  },
  validations: {
    product: {
      qty: {
        minValue: minValue(1)
      }
    }
  }
}
</script>

<style scoped>
  .col-xs {
    flex-direction: column;
  }

  input {
    width: 30px;
  }
</style>
