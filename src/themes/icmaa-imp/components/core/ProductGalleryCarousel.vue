<template>
  <carousel
    class="t-relative t-text-center t-h-full t-bg-white"
    :speed="carouselTransitionSpeed"
    :mouse-drag="false"
    :navigation-enabled="true"
    :pagination-enabled="false"
    :navigation-click-target-size="0"
    :per-page="1"
    :per-page-custom="[[1024, 1.5]]"
    :scroll-per-page="false"
    navigation-next-label="<div class='t-flex t-w-12 t-h-12 t-bg-black t-text-white t-rounded-full t-border t-border-white t-cursor-pointer t-mr-4'><i class='material-icons t-flex-1 t-self-center t-text-2xl'>keyboard_arrow_right</i></div>"
    navigation-prev-label="<div class='t-flex t-w-12 t-h-12 t-bg-black t-text-white t-rounded-full t-border t-border-white t-cursor-pointer t-ml-4'><i class='material-icons t-flex-1 t-self-center t-text-2xl'>keyboard_arrow_left</i></div>"
    ref="carousel"
    @pageChange="pageChange"
  >
    <slide v-for="(images, index) in galleryFiltered" :key="index" ref="thumbs">
      <product-image class="t-cursor-pointer" :image="images" type="gallery" :alt="productName | htmlDecode" @load="imageLoaded" />
    </slide>
  </carousel>
</template>

<script>
import config from 'config'
import ProductImage from './ProductImage'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'

const importCarousel = (component) => import(/* webpackChunkName: "vue-carousel" */ 'vue-carousel').then(c => c[component])
const Carousel = () => importCarousel('Carousel')
const Slide = () => importCarousel('Slide')

export default {
  name: 'ProductGalleryCarousel',
  components: {
    Carousel,
    Slide,
    ProductImage
  },
  props: {
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      default: ''
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      carouselTransition: true,
      carouselTransitionSpeed: 0,
      currentColor: 0,
      currentPage: 0
    }
  },
  computed: {
    galleryFiltered () {
      return this.gallery.filter(image => {
        /** Filter out old _sm files, they are duplicates of large ones */
        const regex = /(_sm)(_\w*)*(\.[a-zA-Z]{3,4})$/gm
        return regex.exec(image.src) === null
      })
    }
  },
  mounted () {
    if (this.configuration.color) {
      const {color} = this.configuration
      this.currentColor = color.id
    }
  },
  methods: {
    imageLoaded (image, loaded) {
      this.$emit('loaded', image, loaded)
    },
    navigate (index) {
      if (this.$refs.carousel) {
        this.$refs.carousel.goToPage(index)
      }
    },
    switchCarouselSpeed () {
      const {color} = this.configuration
      if (color && this.currentColor !== color.id) {
        this.currentColor = color.id
        this.carouselTransitionSpeed = 0
      } else {
        this.carouselTransitionSpeed = 500
      }
    },
    pageChange (index) {
      this.switchCarouselSpeed()
      this.currentPage = index
    }
  }
}
</script>

<style lang="scss">

.VueCarousel {
  @media (min-width: 1024px) {
    isolation: isolate;
    background: -moz-linear-gradient(left,  rgba(0,0,0,0) 1%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.05) 90%, rgba(0,0,0,0.1) 98%, rgba(0,0,0,0.1) 99%, rgba(0,0,0,0.15) 100%);
    background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 1%,rgba(0,0,0,0) 75%,rgba(0,0,0,0.05) 90%,rgba(0,0,0,0.1) 98%,rgba(0,0,0,0.1) 99%,rgba(0,0,0,0.15) 100%);
    background: linear-gradient(to right,  rgba(0,0,0,0) 1%,rgba(0,0,0,0) 75%,rgba(0,0,0,0.05) 90%,rgba(0,0,0,0.1) 98%,rgba(0,0,0,0.1) 99%,rgba(0,0,0,0.15) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#26000000',GradientType=1 );

    .VueCarousel-inner {
      mix-blend-mode: multiply;
    }
  }

  .VueCarousel-navigation-button.VueCarousel-navigation--disabled {
    display: none;
  }

  .VueCarousel-navigation-button:not(.VueCarousel-navigation--disabled) {
    transform: translateX(0)
  }
}

</style>
