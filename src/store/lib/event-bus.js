import Vue from 'vue'
let eventBus = global.$VS ? global.$VS.eventBus : null
if (!eventBus) {
  eventBus = new Vue()
  eventBus.$emit = (...params) => {
    if (global.$VS.eventBus) {
      return global.$VS.eventBus.$emit(...params)
    } else {
      return eventBus.$emit(...params)
    }
  }
  eventBus.$on = (...params) => {
    if (global.$VS.eventBus) {
      return global.$VS.eventBus.$on(...params)
    } else {
      return eventBus.$on(...params)
    }
  }
  eventBus.$emitFilter = (...params) => {
    if (global.$VS.eventBus) {
      return global.$VS.eventBus.$emitFilter(...params)
    } else {
      return new Promise((resolve, reject) => { resolve() })
    }
  }
  eventBus.$filter = (...params) => {
    if (global.$VS.eventBus) {
      return global.$VS.eventBus.$filter(...params)
    } else {
      return new Promise((resolve, reject) => { resolve() })
    }
  }
}
export default eventBus
