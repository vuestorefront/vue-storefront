<template>
  <div>
    <div
      v-show="showPlaceholder">placeholder</div>
    <div
      v-if="!lowerQualityImageError || isOnline"
      v-show="showLowerQualityImage"
      @load="lowerQualityImageLoaded(true)"
      @error="lowerQualityImageLoaded(false)">loweQulaityImag</div>
    <div
      v-if="!highQualityImageError || isOnline"
      v-show="showHighQualityImage"
      @load="highQualityImageLoaded(true)"
      @error="highQualityImageLoaded(false)">highQualityImage</div>
  </div>
</template>
<script>
import { onlineHelper } from '@vue-storefront/core/helpers'
export default {
  props: {
    images: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      lowerQualityImageLoad: false,
      lowerQualityImageError: false,
      highQualityImageLoad: false,
      highQualityImageError: false
    }
  },
  computed: {
    showPlaceholder () {
      return !this.showLowerQualityImage && !this.showHighQualityImage
    },
    showLowerQualityImage () {
      return !!this.lowerQualityImageLoad && !this.highQualityImageLoad
    },
    showHighQualityImage () {
      return !!this.highQualityImageLoad
    },
    isOnline () {
      return onlineHelper.isOnline
    }
  },
  methods: {
    lowerQualityImageLoaded (success = true) {
      console.log(success)
      this.lowerQualityImageLoad = success
      this.lowerQualityImageError = !success
    },
    highQualityImageLoaded (success = true) {
      this.highQualityImageLoad = success
      this.highQualityImageError = !success
    }
  }
}
</script>
