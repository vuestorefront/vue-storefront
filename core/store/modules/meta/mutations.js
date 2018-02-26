export default {
  title (state, title) {
    state.title = title + state.suffix
  },
  description (state, description) {
    state.description = description
  }
}
