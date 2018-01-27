<template>
  <transition name="fade" appear>
    <li class="row py10">
      <div>
        <div class="bg-lightgray image">
          <img v-lazy="thumbnail" alt="" />
        </div>
      </div>
      <div class="col-xs flex pl35 py15 details">
        <div>
          <div class="serif h4 name">
            {{ product.name | htmlDecode }}
          </div>
          <div class="h6 c-gray pt5 sku">
            {{ product.sku }}
          </div>
          <div class="h6 pt5 error" v-if="product.warning_message">
            {{ product.warning_message }}
          </div>
          <div class="h6 pt5 info" v-if="product.info_message">
            {{ product.info_message }}
          </div>
        </div>
        <div class="h5 pt5 c-darkgray lh25 qty">
          <span>
            Qty
          </span>
          <span class="weight-700" :class="{ hidden: isEditing }">
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
      <div class="flex pb15 pt15 align-right actions">
        <div>
          <span class="h4 serif price-special" v-if="product.special_price">
            {{ product.priceInclTax | price }}&nbsp;
          </span>
          <span class="serif price-original" v-if="product.special_price">
            {{ product.originalPriceInclTax | price }}
          </span>
          <span class="h4 serif price-regular" v-if="!product.special_price">
            {{ product.priceInclTax | price }}
          </span>
        </div>
        <div class="links">
          <div @click="switchEdit">
            <edit-button />
          </div>
          <div class="mt5" @click="removeItem">
            <remove-button />
          </div>
        </div>
      </div>
    </li>
  </transition>
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
  .image {
    margin-left: .5rem;
    img {
      mix-blend-mode: multiply;
      vertical-align: top;
    }
  }

  .details {
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 767px) {
      justify-content: flex-start;
      padding:  0 10px 0 20px;
    }
  }

  .name {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  .sku {
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
    justify-content: space-between;
    margin-right: 0.5rem;
    @media (max-width: 767px) {
      justify-content: flex-start;
      padding: 0;
      font-size: 12px;
    }
    .links {
       @media (max-width: 767px) {
         margin-top: 20px;
       }
    }
  }

  .error {
    color: #ff0000;
  }

  .info {
    color: #008000;
  }

  .price-special {
    color: #ff0000;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  .price-original {
    text-decoration: line-through;
    font-size: 12px;
  }

  .price-regular {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  input {
    width: 30px;
  }
</style>
