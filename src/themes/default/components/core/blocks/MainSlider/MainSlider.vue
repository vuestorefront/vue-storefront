<template>
  <section class="main-slider">
      <div class="container">
          <!-- TO-DO: Use v-for and make slides moving from right to left -->
          <div class="row middle-md">
            <div class="col-md-12 px10p">
                <p class="mb0 serif uppercase h3">{{ slides[currentSlide].subtitle }}</p>
                <h1 class="mt0 mb30">{{ slides[currentSlide].title }}</h1>
                <button-outline :text="slides[currentSlide].button_text" color="light" />
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