import Vue from 'vue'

if (!global.eventBus) {
  global.eventBus = new Vue()
}
export default global.eventBus
