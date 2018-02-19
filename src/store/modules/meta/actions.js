export default {
  set ({commit, state}, meta) {
    commit('title', typeof meta.title !== 'undefined' ? meta.title : state.title)
    commit('description', typeof meta.description !== 'undefined' ? meta.description : state.description)
  }
}
