import Vue from 'vue'

export default Vue.component('Overlay', {
  computed: {
    isVisible () {
      return this.$store.state.ui.overlay
    }
  },
  methods: {
    close () {
      this.$store.commit('ui/setOverlay', false)
    }
  }
})
