import Vue from 'vue'

const sliderData = {
  'slides': [],
  'total': '1'
}

export default Vue.component('MainSlider', {
  data () {
    return {
      currentSlide: 1,
      slides: sliderData.slides,
      totalSlides: sliderData.total
    }
  },
  methods: {
    updateSliderData (data) {
      this.slides = data.slides
      this.totalSlides = data.total
    }
  },
  mounted () {
    const self = this
    setInterval(() => {
      self.currentSlide = (self.currentSlide + 1) % (self.totalSlides)
    }, 5000)
  }
})
