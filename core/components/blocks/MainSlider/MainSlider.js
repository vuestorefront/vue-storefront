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
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % (this.totalSlides)
    }, 5000)
  }
}
