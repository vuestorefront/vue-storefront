import { Module } from 'vuex'
import actions from './actions'
import RootState from '../../types/RootState'
import StockState from './types/StockState'

const stock: Module<StockState, RootState> = {
  namespaced: true,
  actions,
  state: {
    cache: {}
  }
}

export default stock
