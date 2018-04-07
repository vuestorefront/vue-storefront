import shippingtMethods from 'core/resource/shipping_methods.json'

export default {
  namespaced: true,
  state: {
    methods: shippingtMethods
  },
  getters: {
    shippingMethods (state) {
      return state.methods
    }
  }
}
