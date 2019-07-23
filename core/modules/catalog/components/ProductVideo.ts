export const ProductVideo = {
  name: 'ProductVideo',
  props: {
    url: {
      type: String,
      required: true
    },
    video_id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      videoStarted: false,
      iframeLoaded: false
    }
  },
  methods: {
    initVideo () {
      this.videoStarted = true
      this.$emit('video-started', this.index)
    },
    iframeIsLoaded () {
      this.iframeLoaded = true
    }
  },
  computed: {
    embedUrl () {
      switch (this.type) {
        case 'youtube':
          return `https://www.youtube.com/embed/${this.video_id}?autoplay=1`
        case 'vimeo':
          return `https://player.vimeo.com/video/${this.video_id}?autoplay=1`
        default:
      }
    }
  }
}
