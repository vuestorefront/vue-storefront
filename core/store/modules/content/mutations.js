import * as types from '../../mutation-types'

export default {
  [types.CONTENT_ADD_BLOCK] (state, { identifier, block }) {
    if (!state.blocks[identifier]) {
      state.blocks[identifier] = block
    }
  }
}

export default {
  [types.CONTENT_REMOVE_BLOCK] (state, identifier) {
    delete state.blocks[identifier]
  }
}
