import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import TrackingState, { Order } from '../types/TrackingState'

const getters: GetterTree<TrackingState, RootState> = {
  getOrders: (state): Order[] => state.orders,
  getTrackingByOrderId: (state, getters, RootState, rootGetters) =>
    (orderId: number): Order|boolean => getters.getOrders.find(o => o.orderId === orderId)
}

export default getters
