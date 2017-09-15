<template>
  <div id="main-slider">

  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/MainSlider/MainSlider')]
}
</script>

<style scoped>
#main-slider {
    width: 100%;
    height: 640px;
    background: #F2F2F2;
}
</style>