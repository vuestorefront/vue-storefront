import { MutationTree } from 'vuex'
import { MutationTypesInterface } from './mutation-types'

import AbstractState from '../../types/AbstractState'

export const mutationsFactory = <T extends AbstractState>(types: MutationTypesInterface, identifier: string = 'identifier'): MutationTree<T> => {
  return {
    [types.add] (state, payload) {
      const item = state.items.find(item => item[identifier] === payload[identifier])
      if (!item) {
        state.items.push(payload)
      }
    },
    [types.upd] (state, payload) {
      const index = state.items.findIndex(item => item[identifier] === payload[identifier])
      if (index !== -1) {
        // Need to use slice because otherwise its not reactive
        // @see https://vuejs.org/v2/guide/list.html#Caveats
        state.items.splice(index, 1, payload)
      } else {
        state.items.push(payload)
      }
    },
    [types.rmv] (state, payload) {
      const index = state.items.findIndex(item => item[identifier] === payload[identifier])
      if (index !== -1) {
        state.items.splice(index, 1)
      }
    }
  }
}
