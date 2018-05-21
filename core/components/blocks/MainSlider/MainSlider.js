export default {
  name: 'MainSlider',
  data () {
    return {
      currentSlide: 1,
      slides: [],
      totalSlides: 1
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
}
