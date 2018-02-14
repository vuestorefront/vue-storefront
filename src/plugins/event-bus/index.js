import Vue from 'vue'
const EventBus = new Vue()

const EventBusPlugin = {
  install (Vue) {
    if (!Vue.prototype.$bus) {
      Object.defineProperties(Vue.prototype, {
        $bus: {
          get: function () {
            return EventBus
          }
        }
      })
    }
  }
}

export { EventBus as default, EventBusPlugin }
