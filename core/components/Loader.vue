<template>
  <div>
    Core Loader
  </div>
</template>

<script>
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
  mounted () {
    this.$bus.$on('notification-progress-start', (message) => {
      this.show(message)
    })
    this.$bus.$on('notification-progress-stop', this.hide)
  }
}
</script>
