import getters from './getters'
import promotedOffers from 'core/resource/promoted_offers.json'

export default {
  namespaced: true,
  state: {
    banners: promotedOffers
  },
  getters
}
