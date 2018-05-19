import Vue from 'vue'

export default Vue.component('ProductLinks', {
  props: {
    products: {
      type: Array,
      required: true
    }
  }
})
