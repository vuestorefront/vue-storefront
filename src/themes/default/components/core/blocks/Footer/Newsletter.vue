<template>
  <div class="newsletter px40 bg-lightgray">
    <div class="container">
      <div class="newsletter-content m0 row middle-xs start-md">
        <div class="col-md-9 col-xs-12 py10">
          <h3 class="c-black weight-400 m0">Subscribe to the newsletter and receive a coupon for 10% off</h3>
        </div>
        <div class="col-md-3 end-xs py25">
          <button-outline :text="'Subscribe'" @click.native="newsletterClick" color="dark" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonOutline from '../../../theme/ButtonOutline.vue'

export default {
  components: {
    ButtonOutline
  },
  mixins: [coreComponent('core/blocks/Footer/Newsletter')]
}
</script>