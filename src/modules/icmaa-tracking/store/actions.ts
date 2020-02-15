import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import TrackingState, { Order } from '../types/TrackingState'
import TrackingService from '../data-resolver/TrackingService'
import * as types from './mutation-types'

const actions: ActionTree<TrackingState, RootState> = {
  async fetchTracking ({ commit, getters }, orderId: number): Promise<Order|boolean> {
    const findInState = getters.getTrackingByOrderId(orderId)
    if (findInState) {
      return findInState
    }

    const tracking = await TrackingService.getTracking(orderId)
    if (tracking) {
      commit(
        types.ICMAA_TRACKING_ADD_ORDER,
        Object.assign(tracking, { orderId })
      )
    }

    return tracking as Order || false
  },
  clearTracking ({ commit }): void {
    commit(types.ICMAA_TRACKING_CLR_ORDER)
  }
}

export default actions
