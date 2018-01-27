import promotedOffers from '../../resource/promoted_offers.json'

// Initial state

const state = {
  banners: promotedOffers
}

const getters = {
  getPromotedOffers: state => {
    return state.banners
  }
}

export default {
  namespaced: true,
  state,
  getters
}
