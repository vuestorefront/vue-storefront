import paymentMethods from 'src/resource/payment_methods.json'

export default {
  namespaced: true,
  state: {
    methods: paymentMethods
  }
}
