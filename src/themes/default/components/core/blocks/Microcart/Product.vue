<template>
  <li class="row flex-nowrap py10">
    <div>
      <div class="ml10 bg-cl-secondary">
        <product-image :image="image" />
      </div>
    </div>
    <div class="col-xs flex pl35 py15 start-xs between-sm details">
      <div>
        <router-link
          class="serif h4 name"
          :to="localizedRoute({
            name: product.type_id + '-product',
            params: {
              parentSku: product.parentSku ? product.parentSku : product.sku,
              slug: product.slug,
              childSku: product.sku
            }
          })"
          data-testid="productLink"
          @click.native="$store.commit('ui/setMicrocart', false)"
        >
          {{ product.name | htmlDecode }}
        </router-link>
        <div class="h6 cl-bg-tertiary pt5 sku" data-testid="productSku">
          {{ product.sku }}
        </div>
        <div class="h6 cl-bg-tertiary pt5 options" v-if="isOnline && product.totals && product.totals.options">
          <div v-for="opt in product.totals.options" :key="opt.label">
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
        <div class="h6 pt5 cl-error" v-if="product.errors && Object.keys(product.errors).length > 0">
          {{ product.errors | formatProductMessages }}
        </div>
        <div class="h6 pt5 cl-success" v-if="product.info && Object.keys(product.info).length > 0 && Object.keys(product.errors).length === 0">
          {{ product.info | formatProductMessages }}
        </div>
      </div>
      <div class="h5 pt5 cl-accent lh25 qty">
        <base-input-number
          :name="$t('Quantity')"
          :value="product.qty"
          @input="updateQuantity"
          :min="1"
        />
      </div>
    </div>
    <div class="flex py15 mr10 align-right start-xs between-sm actions">
      <div class="prices" v-if="!displayItemDiscounts || !isOnline">
        <span class="h4 serif cl-error price-special" v-if="product.special_price">
          {{ product.priceInclTax * product.qty | price }}&nbsp;
        </span>
        <span class="h6 serif price-original" v-if="product.special_price">
          {{ product.originalPriceInclTax * product.qty | price }}
        </span>
        <span class="h4 serif price-regular" v-else data-testid="productPrice">
          {{ (product.originalPriceInclTax ? product.originalPriceInclTax : product.priceInclTax) * product.qty | price }}
        </span>
      </div>
      <div class="prices" v-else-if="isOnline && product.totals">
        <span class="h4 serif cl-error price-special" v-if="product.totals.discount_amount">
          {{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price }}&nbsp;
        </span>
        <span class="h6 serif price-original" v-if="product.totals.discount_amount">
          {{ product.totals.row_total_incl_tax | price }}
        </span>
        <span class="h4 serif price-regular" v-if="!product.totals.discount_amount">
          {{ product.totals.row_total_incl_tax | price }}
        </span>
      </div>
      <div class="prices" v-else>
        <span class="h4 serif price-regular">
          {{ product.regular_price * product.qty | price }}
        </span>
      </div>
      <div class="links">
        <div class="mt5" @click="removeItem">
          <remove-button />
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import config from 'config'
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'

import ProductImage from 'theme/components/core/ProductImage'
import RemoveButton from './RemoveButton'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import { onlineHelper } from '@vue-storefront/core/helpers'

export default {
  components: {
    RemoveButton,
    BaseInputNumber,
    ProductImage
  },
  mixins: [Product],
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
  data () {
    return {
      displayItemDiscounts: config.cart.displayItemDiscounts
    }
  }
}
</script>

<style lang="scss" scoped>
  .image {
    mix-blend-mode: multiply;
    vertical-align: top;
    width: 150px;
    @media (max-width: 767px) {
      width: 100px;
    }
  }

  .details {
    flex-direction: column;
    @media (max-width: 767px) {
      padding: 0 10px 0 20px;
    }
  }

  .name {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  .options, .sku {
    @media (max-width: 767px) {
      font-size: 10px;
    }
  }

  .qty {
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }

  .actions {
    flex-direction: column;
    @media (max-width: 767px) {
      padding: 0;
      font-size: 12px;
    }
    .links {
      @media (max-width: 767px) {
        margin-top: 20px;
      }
    }
  }

  .price-special {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  .price-original {
    text-decoration: line-through;
  }

  .price-regular {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  input {
    width: 30px;
  }

  .flex-nowrap {
    flex-wrap: nowrap;
  }
</style>
