import Vue from 'vue'

export default Vue.component('ReturnIcon', {
  methods: {
    goBack () {
      this.$router.back()
    }
  }
})
