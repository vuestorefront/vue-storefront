<template>
  <div>
    <div class="row pr55 pt20 pb20">
      <img v-lazy="thumbnail" />
      <div class="col-xs pl40 pb15 pt15">
        <div>
          <div>{{ product.name }}</div>
          <div class="h6 c-lightgray pt5">{{ product.sku }}</div>
        </div>
      </div>
      <div class="col-xs pb15 pt15 align-right">
        <div>
          $ {{ product.priceInclTax }}
        </div>
        <div>
          <div class="mt5"><span @click="removeItem"><remove-button class="c-darkgray" /></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import RemoveButton from './RemoveButton'

export default {
  data () {
    return {
      qty: 1
    }
  },
  methods: {
    removeItem () {
      this.$store.dispatch('wishlist/removeItem', this.product)
    }
  },
  components: {
    RemoveButton
  },
  mixins: [coreComponent('core/blocks/Wishlist/Product')]
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
