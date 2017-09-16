<template>
  <section class="main-slider">
      <div class="container">
          <div class="row middle-md">
            <div class="col-md-12 px10p">
                <p class="mb5 serif uppercase h3">Best of blues</p>
                <h1 class="mt0">Love Denim</h1>
            </div>
          </div>
      </div>
  </section>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
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