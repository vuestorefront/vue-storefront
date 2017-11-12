<template>
  <div class='order-review'>
    <div class="row">
      <div class="col-md-12 mb15" :class="{ 'c-gray' : !isFilled && !isActive }">
        <h3>Review order</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">

      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Checkout/OrderReview')]
}
</script>

<style scoped>

</style>
