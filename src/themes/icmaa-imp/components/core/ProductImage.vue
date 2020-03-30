<template>
  <img v-lazy="lazyObj" :data-srcset="`${sizes.src} 1x, ${sizes.srcAt2x} 2x`" v-on="$listeners" :alt="alt" class="product-image t-w-full t-w-auto">
</template>

<script>
import config from 'config'
import pick from 'lodash-es/pick'
import { onlineHelper } from '@vue-storefront/core/helpers'

export default {
  name: 'ProductImage',
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
    },
    type: {
      type: String,
      default: 'thumbnails',
      validation: (value) => ['gallery', 'thumbnails'].includes(value)
    }
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    isOnline (value) {
      return onlineHelper.isOnline
    },
    sizes () {
      const { width, height } = config.products[this.type]
      return {
        loading: require('theme/assets/product-placeholder-loading.svg'),
        error: require(`theme/assets/product-placeholder-${!this.isOnline ? 'loading' : 'error'}.svg`),
        src: this.getImageWithSize(width, height),
        srcAt2x: this.getImageWithSize(width * 2, height * 2),
        original: this.getImageWithSize()
      }
    },
    lazyObj () {
      return pick(this.sizes, ['loading', 'error', 'src'])
    }
  },
  methods: {
    getImageWithSize (width = 0, height = 0) {
      const regex = /(\/img\/)(\d+\/\d+)(\/resize\/)/gm
      const src = this.image.src
      return src.replace(regex, `$1${width}/${height}$3`)
    },
    onLoaded ({ el, src }) {
      if (this.loading === true) {
        this.loading = !this.loading
        this.$emit('load', this.image, !this.loading)
      }
    }
  },
  mounted () {
    this.$Lazyload.$once('loaded', this.onLoaded)
  }
}
</script>
