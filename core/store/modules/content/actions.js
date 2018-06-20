import * as types from '../../mutation-types'

export default {
  addBlock (context, identifier) {
    let block
    // place to integrate with extension point
    context.commit(types.CONTENT_ADD_BLOCK, { identifier, block })
  }
}
