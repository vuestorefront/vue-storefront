<template>
  <div class="microcart">
    <h3>Microcart</h3>
    <div v-for="(item, index) in productsInCart" :key="index"> {{ item.name }} ({{ item.qty }}) </div>
  </div>
</template>

<script>
import Microcart from 'core/components/blocks/Microcart/Microcart'

export default {
  mixins: [Microcart]
}
</script>
