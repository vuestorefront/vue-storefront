<template>
  <div>
    <div class="row pr55 pt20 pb20">
      <img :src="thumbnail" />
      <div class="col-xs pl40 pb15 pt15">
        <div>
          <div>{{ product.name }}</div>
          <div class="h6 c-mediumgray pt5">{{ product.sku }}</div>
        </div>
        <div>
          <div><span class="c-mediumgray">Qty</span> <span class="weight-400">{{ product.quantity }}</span></div>
        </div>
      </div>
      <div class="col-xs pl40 pb15 pt15 align-right">
        <div>
          $ {{ product.price }}
        </div>
        <div>
          <div class="c-mediumgray"><edit-button class="c-mediumgray" /></div>
          <div class="mt6"><span v-on:click="removeFromCart"><remove-button class="c-mediumgray" /></span></div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { coreComponent } from 'lib/themes'
import EditButton from './ui/EditButton'
import RemoveButton from './ui/RemoveButton'

export default {
  methods: {
    removeFromCart () {
      this.$store.dispatch('cart/removeFromCart', this.product)
    }
  },
  components: {
    EditButton,
    RemoveButton
  },
  mixins: [coreComponent('core/ProductRow')]
}
</script>

<style scoped>
.col-xs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
