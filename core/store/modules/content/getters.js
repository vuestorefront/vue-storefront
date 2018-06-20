export default {
  getBlock: state => identifier => {
    return state.blocks[identifier]
  }
}
