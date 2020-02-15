import { GetterTree } from 'vuex'
import BlockState, { BlockStateItem } from '../../types/BlockState'
import RootState from '@vue-storefront/core/types/RootState'
import { Logger } from '@vue-storefront/core/lib/logger'

const getters: GetterTree<BlockState, RootState> = {
  getBlocks: (state) => state.items,
  getBlockByIdentifier: (state) => (identifier): BlockStateItem => {
    return state.items.find(item => item.identifier === identifier)
  },
  getJsonBlockByIdentifier: (state) => (identifier): Record<string, any> => {
    try {
      let block = state.items.find(item => item.identifier === identifier)
      return (block && block.content) ? JSON.parse(block.content) : {}
    } catch (error) {
      Logger.error(`Error during parsing of block "${identifier}":`, 'IcmaaCms', error)()
      return {}
    }
  }
}

export default getters
