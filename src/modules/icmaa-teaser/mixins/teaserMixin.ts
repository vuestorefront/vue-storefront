import { mapGetters } from 'vuex'

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
      return this.teaser.imageUrl
    },
    backgroundColor () {
      const { backgroundColor } = this.teaser
      return (!backgroundColor || !backgroundColor.startsWith('#')) ? false : backgroundColor
    },
    textColor () {
      const { textColor } = this.teaser
      return (!textColor || !textColor.startsWith('#')) ? false : textColor
    },
    link () {
      return this.localizedRoute(this.teaser.link)
    }
  },
  methods: {
    redirect () {
      this.$router.push(this.link)
    }
  }
}
