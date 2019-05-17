<template>
  <div>
    <img
      src="/assets/placeholder.svg"
      v-show="showPlaceholder"
      itemprop="image"
      key="placeholderImage"
      ref="images"
      class="mw-100 inline-flex">
    <img
      :src="images.loading"
      :alt="alt"
      v-if="!lowerQualityImageError || isOnline"
      v-show="showLowerQualityImage"
      @load="lowerQualityImageLoaded(true)"
      @error="lowerQualityImageLoaded(false)"
      itemprop="image"
      key="lowQualityImage"
      ref="images"
      class="mw-100 inline-flex">
    <img
      :src="images.src"
      :alt="alt"
      v-if="!highQualityImageError || isOnline"
      v-show="showHighQualityImage"
      @load="highQualityImageLoaded(true)"
      @error="highQualityImageLoaded(false)"
      itemprop="image"
      key="highQualityImage"
      ref="images"
      class="mw-100 inline-flex">
  </div>
</template>
<script>
import { onlineHelper } from '@vue-storefront/core/helpers'
export default {
  props: {
    images: {
      type: Object,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lowerQualityImageLoad: false,
      lowerQualityImageError: true,
      highQualityImageLoad: false,
      highQualityImageError: true
    }
  },
  computed: {
    showPlaceholder () {
      return !this.showLowerQualityImage && !this.showHighQualityImage
    },
    showLowerQualityImage () {
      return !!this.lowerQualityImageLoad && !this.highQualityImageLoad && !this.hidden
    },
    showHighQualityImage () {
      return !!this.highQualityImageLoad && !this.hidden
    },
    isOnline () {
      return onlineHelper.isOnline
    }
  },
  methods: {
    lowerQualityImageLoaded (success = true) {
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
<style lang="scss" scoped>
  div{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
  }
  img{
    height: auto;
    opacity: 1;
    mix-blend-mode: multiply;
    vertical-align: top;
    &:hover{
      opacity: 0.9
    }
  }
</style>
