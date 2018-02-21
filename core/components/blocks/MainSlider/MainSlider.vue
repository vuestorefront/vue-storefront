<template>
  <div class="main-slider">
    Core Main Slider
    <!-- Basic data accessible from core component -->
    {{ slides[currentSlide].title }}
    {{ slides[currentSlide].subtitle }}
    {{ slides[currentSlide].button_text }}
    {{ slides[currentSlide].image }}
    {{ totalSlides }}
  </div>
</template>

<script>
import sliderData from 'core/resource/slider.json'

export default {
  name: 'MainSlider',
  data () {
    return {
      currentSlide: 1,
      slides: sliderData.slides,
      totalSlides: sliderData.total
    }
  },
  mounted () {
    const self = this
    setInterval(() => {
      self.currentSlide = (self.currentSlide + 1) % (self.totalSlides)
    }, 5000)
  }
}
</script>
