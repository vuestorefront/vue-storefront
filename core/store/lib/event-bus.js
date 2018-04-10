import Vue from 'vue'
let eventBus = global.$VS ? global.$VS.eventBus : null
if (!eventBus) {
  eventBus = new Vue()
}
export default eventBus
