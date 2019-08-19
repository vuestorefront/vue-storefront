import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import TaxState from '../../types/TaxState'

const mutations: MutationTree<TaxState> = {
  [types.TAX_UPDATE_RULES] (state, taxClasses) {
    state.rules = taxClasses.items
  }
}

export default mutations
