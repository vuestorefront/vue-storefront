import { mapGetters } from 'vuex'
import { getThumbnailPath } from '@vue-storefront/core/helpers'

export default {
  props: {
    teaser: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({ viewport: 'ui/getViewport' }),
    imageUrl () {
      const image = this.viewport !== 'sm' && this.teaser['largeImageUrl'] ? 'largeImageUrl' : 'imageUrl'
      return getThumbnailPath('/' + this.teaser[image], 0, 0, 'media')
    },
    backgroundColor () {
      const { backgroundColor } = this.teaser
      return (!backgroundColor || !backgroundColor.startsWith('#')) ? false : backgroundColor
    },
    textColor () {
      const { textColor } = this.teaser
      return (!textColor || !textColor.startsWith('#')) ? false : textColor
    }
  },
  methods: {
    redirect () {
      this.$router.push(this.localizedRoute(this.teaser.link))
    }
  }
}
