<template>
  <section class="main-slider w-100 bg-cl-th-accent cl-white">
    <no-ssr>
      <carousel :per-page="1" pagination-active-color="transparent" pagination-color="#F2F2F2">
        <slide v-for="(slide, index) in slides" :key="index">
          <div class="container w-100" :style="{ backgroundImage: 'url(' + slide.image + ')' }">
            <div class="row middle-xs center-xs">
              <div class="col-md-12 px10p">
                <div class="align-center mt30">
                  <button-outline :link="slide.link" color="light">
                    {{ slide.button_text }}
                  </button-outline>
                </div>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </no-ssr>
  </section>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { coreComponent } from 'core/lib/themes'
import { Carousel, Slide } from 'vue-carousel'
import ButtonOutline from '../../../theme/ButtonOutline.vue'
import sliderData from 'theme/resource/slider.json'

export default {
  created () {
    this.updateSliderData(sliderData)
  },
  components: {
    ButtonOutline,
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  mixins: [coreComponent('blocks/MainSlider/MainSlider')]
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-white: color(white);
.main-slider {
  .VueCarousel-pagination {
    position: absolute;
    bottom: 15px;
  }
  .VueCarousel-dot--active .VueCarousel-dot-inner {
    border: 2px solid $color-white;
    margin-top: -2px;
  }
}
</style>
<style scoped>
h1 {
  font-size: 72px;
}
.main-slider {
  height: 640px;
}
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.row {
  height: 640px;
}
@media (max-width: 75em) {
  .main-slider {
    height: 400px;
  }
  .title {
    font-size: 50px;
  }
  .subtitle {
    font-size: 20px;
  }
  .row {
    height: 400px;
  }
}
@media (max-width: 64em) {
  .main-slider {
    height: 359px;
  }
  .container {
    background-position: left;
  }
  .title {
    font-size: 48px;
  }
  .subtitle {
    font-size: 18px;
  }
  .button {
    font-size: 16px;
  }
  .row {
    height: 359px;
  }
}
</style>
