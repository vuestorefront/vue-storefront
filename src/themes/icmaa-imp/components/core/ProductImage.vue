<template>
  <div
    class="product-image"
    :class="{ 't-h-0': showPlaceholder }"
    :style="placeholderStyle"
    v-on="$listeners"
  >
    <img
      src="/assets/product-placeholder.svg"
      :alt="alt"
      :class="{ 'placeholder': true, 't-h-full': basic, 't-w-full': !basic }"
      v-show="showPlaceholder"
    >
    <img
      v-if="!lowerQualityImageError || isOnline"
      v-show="showLowerQuality"
      :src="image.loading"
      :alt="alt"
      class="t-w-full t-w-auto"
      @load="imageLoaded('lower', true)"
      @error="imageLoaded('lower', false)"
      ref="lQ"
    >
    <img
      v-if="!highQualityImageError || isOnline"
      v-show="showHighQuality"
      :src="image.src"
      :alt="alt"
      class="t-w-full t-w-auto"
      @load="imageLoaded('high', true)"
      @error="imageLoaded('high', false)"
    >
  </div>
</template>

<script>
import config from 'config'
import { onlineHelper } from '@vue-storefront/core/helpers'

export default {
  props: {
    calcRatio: {
      type: Boolean,
      default: true
    },
    image: {
      type: Object,
      default: () => ({
        src: '',
        loading: ''
      })
    },
    alt: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      lowerQualityImage: false,
      lowerQualityImageError: false,
      highQualityImage: false,
      highQualityImageError: false,
      basic: true
    }
  },
  watch: {
    lowerQualityImage (state) {
      if (state) {
        this.basic = this.$refs.lQ.naturalWidth < this.$refs.lQ.naturalHeight;
        this.$emit('load', this.image, state)
      }
    }
  },
  computed: {
    showPlaceholder () {
      return !this.showLowerQuality && !this.showHighQuality
    },
    showLowerQuality () {
      return this.lowerQualityImage && !this.showHighQuality
    },
    showHighQuality () {
      return this.highQualityImage
    },
    imageRatio () {
      const {width, height} = this.$store.state.config.products.gallery
      return `${height / (width / 100)}%`
    },
    placeholderStyle () {
      return this.calcRatio && this.showPlaceholder ? { paddingBottom: this.imageRatio } : {}
    },
    isOnline (value) {
      return onlineHelper.isOnline
    },
    isImagesLoaded () {
      return this.highQualityImage && this.lowerQualityImage
    },
    themeImageSizes () {
      /**
       * @todo: Preload product images instead of loading all on page load
       */
      return this.getImageSizes()
    }
  },
  methods: {
    imageLoaded (type, success = true) {
      this[`${type}QualityImage`] = success
      this[`${type}QualityImageError`] = !success
    },
    getImageSizes () {
      const { width, height } = config.products.gallery
      return {
        loading: this.getImageWithSize(width / 2, height / 2),
        src: this.getImageWithSize(width, height),
        srcAt2x: this.getImageWithSize(width * 2, height * 2),
        original: this.getImageWithSize()
      }
    },
    getImageWithSize (height = 0, width = 0) {
      const regex = /(\/img\/)(\d+\/\d+)(\/resize\/)/gm
      const src = this.image.src
      return src.replace(regex, `$1${width}/${height}$3`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-image{
    position: relative;
    width: 100%;
    max-width: 100%;

    .placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: auto;
    }
  }
</style>
