<template>
  <div class="box" v-on="$listeners">
    <img
      v-show="showPlaceholder"
      src="/assets/placeholder.svg"
      :alt="alt"
      key="placeholder"
      ref="images"
      itemprop="image"
      class="image image--placeholder">
    <img
      v-show="showLowerQuality"
      :src="image.loading"
      :alt="alt"
      @load="imageLoaded('lower')"
      key="lowerQualityImage"
      ref="images"
      itemprop="image"
      class="image">
    <img
      v-if="lowerQualityImage"
      v-show="showHighQuality"
      :src="image.src"
      :alt="alt"
      @load="imageLoaded('high')"
      key="highQualityImage"
      ref="images"
      itemprop="image"
      class="image">
  </div>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  props: {
    image: {
      type: Object,
      default: () => ({})
    },
    alt: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      lowerQualityImage: false,
      highQualityImage: false
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
    }
  },
  methods: {
    imageLoaded (type) {
      const delay = 1000
      setTimeout(() => {
        this[`${type}QualityImage`] = true
      }, delay)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box{
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(740% / (600 / 100));
    overflow: hidden;
    mix-blend-mode: multiply;
  }

  .image{
    max-width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: 100%;
    transform: translate3d(-50%, -50%, 0);

    &--placeholder{
      width: auto;
      height: auto;
    }
  }
</style>
