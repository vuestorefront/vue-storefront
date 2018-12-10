// Idea of rework filters to module and simplify overwite filters

const filtersModule = {
  install (Vue, options) {
    // install vue filters
    if (typeof options === 'object') {
      for (let option in options) {
        Vue.filter(`${option}`, options[option])
      }
    }
  }
}

export default filtersModule
