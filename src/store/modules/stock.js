const state = {
}

const getters = {
}
// actions
const actions = {

  /**
   * Reset current configuration and selected variatnts
   */
  check (context, { sku }) {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) {
        resolve({ qty: 1, status: 'volatile' }) // if not online, cannot check the source of true here
      } else {
        resolve({ qty: 1, status: 'ok' }) // TODO: add vue-storefront-api query or Magento query here
      }
    })
  }
}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
