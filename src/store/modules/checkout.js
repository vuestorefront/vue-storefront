// import * as types from '../mutation-types'
// import _ from 'lodash'

const store = {
  namespaced: true,
  state: {
    order: {
      products: [],
      addressInformation: {
        shippingAddress: {
          region: '',
          region_id: 0,
          country_id: 'PL',
          street: [],
          company: '',
          telephone: '',
          postcode: '',
          city: '',
          firstname: '',
          lastname: '',
          email: '',
          region_code: ''
        },
        billingAddress: {
          region: '',
          region_id: 0,
          country_id: 'PL',
          street: [],
          company: '',
          telephone: '',
          postcode: '',
          city: '',
          firstname: '',
          lastname: '',
          email: '',
          region_code: ''
        },
        shipping_method_code: '',
        shipping_carrier_code: '',
        payment_method_code: ''
      }
    }
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  }
}

export default store
