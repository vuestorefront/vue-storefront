import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function createRouter () {
  return new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
  })
}
