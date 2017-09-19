<template>
  <section class="main-slider">
      <div class="container">
          <div class="row middle-md">
            <div class="col-md-12 px10p">
                <p class="mb0 serif uppercase h3">Best of blues</p>
                <h1 class="mt0 mb30">Love Denim</h1>
                <button-outline text="shop now" color="light" />
            </div>
          </div>
      </div>
  </section>
</template>

<script>
import { coreComponent } from 'lib/themes'
import ButtonOutline from '../../../theme/ButtonOutline.vue'

export default {
  components: {
    ButtonOutline
  },
  mixins: [coreComponent('core/blocks/MainSlider/MainSlider')]
}
</script>

<style scoped>
.main-slider {
    width: 100%;
    height: 640px;
    background: #333333;
    color: white;
}
.row {
    height: 640px;
}
</style>