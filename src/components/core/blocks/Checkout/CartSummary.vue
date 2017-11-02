<template>
  <div class="microcart" :class="{ active: isOpen }">
    Core CartSumary
    <!-- Items in cart displayed as a list with quantitys for each item -->
    <ul>
      <li v-for='product in items'>
        {{ product.name }}
        {{ product.price }}
        {{ product.quantity }}
      </li>
    </ul>  
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  name: 'cartsummary',
  mixins: [coreComponent('core/blocks/Microcart/Microcart')]
}
</script>

