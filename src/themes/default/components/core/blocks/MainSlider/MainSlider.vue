<template>
  <section class="main-slider bg-darkgray c-white">
    <carousel :perPage='1'>
        <slide v-for='slide in slides'>
            <div class="container" :style="{ backgroundImage: 'url(' + slide.image + ')' }">
                <div class="row middle-md">
                    <div class="col-md-12 px10p">
                        <p class="mb0 serif uppercase h3 align-center">{{ slide.subtitle }}</p>
                        <h1 class="mt0 mb30 align-center">{{ slide.title }}</h1>
                        <div class="align-center">
                            <button-outline :text="slide.button_text" color="light" />
                        </div>
                    </div>
                </div>
            </div>
        </slide>
    </carousel>
  </section>
</template>

<script>
import { coreComponent } from 'lib/themes'
import { Carousel, Slide } from 'vue-carousel'
import ButtonOutline from '../../../theme/ButtonOutline.vue'

export default {
  components: {
    ButtonOutline,
    Carousel,
    Slide
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
}
.container {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.row {
    height: 640px;
}
</style>