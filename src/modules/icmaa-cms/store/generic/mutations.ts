import { MutationTree } from 'vuex'
import { mutationsFactory } from '../abstract/mutations'
import getTypes from './mutation-types'
import GenericState from '../../types/GenericState'

const mutations = (stateKey: string): MutationTree<GenericState> => {
  const types = getTypes(stateKey)
  stateKey = stateKey.toUpperCase()

  return mutationsFactory({
    add: types[`${stateKey}_ADD`],
    upd: types[`${stateKey}_UPD`],
    rmv: types[`${stateKey}_RMV`]
  }, 'uuid')
}

export default mutations
