<template>
  <section class="main-slider w-100 bg-cl-th-accent cl-white">
    <no-ssr>
      <carousel :per-page="1" pagination-active-color="#ffffff" pagination-color="#e0e0e0">
        <slide v-for="(slide, index) in slides" :key="index">
          <div class="container w-100" v-lazy:background-image="slide.image">
            <div class="row middle-xs center-xs">
              <div class="col-md-12 px10p">
                <p
                  class="subtitle mb0 serif uppercase h3 align-center"
                  data-testid="mainSliderSubtitle"
                >
                  {{ slide.subtitle }}
                </p>
                <h1 class="title mt0 mb30 align-center" data-testid="mainSliderTitle">
                  {{ slide.title }}
                </h1>
                <div class="align-center inline-flex">
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
import sliderData from 'theme/resource/slider.json'
import ButtonOutline from 'theme/components/theme/ButtonOutline'

export default {
  data () {
    return {
      currentSlide: 1,
      slides: [],
      totalSlides: 1
    }
  },
  components: {
    ButtonOutline,
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
    'no-ssr': NoSSR
  },
  methods: {
    updateSliderData (data) {
      this.slides = data.slides
      this.totalSlides = data.total
    }
  },
  mounted () {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % (this.totalSlides)
    }, 5000)
  },
  created () {
    this.updateSliderData(sliderData)
  }
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-white: color(white);
.main-slider {

  @media (max-width: 767px) {
    display: none;
  }

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
