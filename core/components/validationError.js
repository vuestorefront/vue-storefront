import Vue from 'vue'

export default Vue.component('ValidationError', {
  name: 'ValidationError',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
})
