<template>
  <div class='order-review'>
    <div class="row">
      <div class="col-md-1">
        <div class="number-circle lh40 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">4</div>
      </div>
      <div class="col-md-11">
        <div class="row">
          <div class="col-md-12 mb15" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="mt5" :class="{'section-editable' : isFilled && !isActive, 'section-disabled' : !isFilled && !isActive }">Review order</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  props: ['isActive'],
  data () {
    this.isFilled = false
  },
  mixins: [coreComponent('core/blocks/Checkout/OrderReview')]
}
</script>

<style scoped>

</style>
