<template>
  <div>
    <div class="row pr55 pt20 pb20">
      <img :src="thumbnail" />
      <div class="col-xs pl40 pb15 pt15">
        <div>
          <div>{{ product.name }}</div>
          <div class="h6 c-darkgray pt5">{{ product.sku }}</div>
        </div>
        <div>
<<<<<<< HEAD
          <div><span class="c-darkgray">Qty</span> <span class="weight-400">{{ product.quantity }}</span></div>
=======
          <div><span class="c-mediumgray">Qty</span> 
          <span class="weight-400" :class="{ hidden: isEditing }">{{ product.quantity }}</span>
          <span :class="{ hidden: !isEditing }">
            <input type="number" v-model="qty">
          </span>
          </div>
>>>>>>> e76d899a6d7dd6fd2b64021be9312701f21e3ab7
        </div>
      </div>
      <div class="col-xs pl40 pb15 pt15 align-right">
        <div>
          $ {{ product.price }}
        </div>
        <div>
<<<<<<< HEAD
          <div class="c-darkgray"><edit-button class="c-darkgray" /></div>
          <div class="mt6"><span v-on:click="removeFromCart"><remove-button class="c-darkgray" /></span></div>
=======
          <div class="c-mediumgray"><span @click="switchEdit"><edit-button class="c-mediumgray" /></span></div>
          <div class="mt6"><span @click="removeItem"><remove-button class="c-mediumgray" /></span></div>
>>>>>>> e76d899a6d7dd6fd2b64021be9312701f21e3ab7
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
        this.qty = this.product.quantity
      }
      this.$store.dispatch('cart/updateQuantity', { product: this.product, quantity: this.qty })
    },
    switchEdit () {
      this.isEditing ? this.updateQuantity() : this.qty = this.product.quantity
      this.isEditing = !this.isEditing
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
.hidden {
  display: none;
}
input {
  width: 60px;
}
</style>
