<template>
  <section class="main-slider bg-darkgray c-white" :style="{ backgroundImage: 'url(' + slides[currentSlide].image + ')' }">
      <div class="container">
          <!-- TO-DO: Use v-for and make slides moving from right to left -->
          <div class="row middle-md">
            <div class="col-md-12 px10p">
                <p class="mb0 serif uppercase h3 align-center">{{ slides[currentSlide].subtitle }}</p>
                <h1 class="mt0 mb30 align-center">{{ slides[currentSlide].title }}</h1>
                <div class="align-center">
                    <button-outline :text="slides[currentSlide].button_text" color="light" />
                </div>
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
h1 {
    font-size: 72px;
}
.main-slider {
    width: 100%;
    height: 640px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.row {
    height: 640px;
}
</style>