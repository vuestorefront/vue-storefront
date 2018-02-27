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
const sliderData = {
  'slides': [
    {
      'title': 'Luma Yoga',
      'subtitle': 'New collection',
      'button_text': 'Shop now',
      'image': '/assets/slide_01.jpg',
      'link': '/c/women-20'
    },
    {
      'title': 'Luma Fitness',
      'subtitle': 'Collection',
      'button_text': 'Shop now',
      'image': '/assets/slide_02.jpg',
      'link': '/c/men-11'
    },
    {
      'title': 'Luma Fitness',
      'subtitle': "What's new",
      'button_text': 'Shop now',
      'image': '/assets/slide_03.jpg',
      'link': '/c/training-9'
    }
  ],
  'total': '3'
}

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
