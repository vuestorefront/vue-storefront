import { mapState } from 'vuex'

export default {
  name: 'Loader',
  data () {
    return {
      message: null
    }
  },
  methods: {
    show (message = null) {
      this.message = message
      this.$store.commit('ui/setLoader', true)
    },
    hide () {
      this.$store.commit('ui/setLoader', false)
    }
  },
  computed: mapState({
    isVisible: state => state.ui.loader
  }),
  beforeMount () {
    this.$bus.$on('notification-progress-start', this.show)
    this.$bus.$on('notification-progress-stop', this.hide)
  },
  beforeDestroy () {
    this.$bus.$off('notification-progress-start', this.show)
    this.$bus.$off('notification-progress-stop', this.hide)
  }
}
