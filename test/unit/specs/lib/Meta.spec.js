import Vue from 'vue/dist/vue.common.js'
import VueRouter from 'vue-router'
import Vuex from 'vuex/dist/vuex.js'
import store from 'src/store'
import Meta from 'src/lib/meta'
import Static from 'src/themes/default/pages/Static.vue'

Vue.use(Vuex)
Vue.use(VueRouter)

describe('lib/meta.js', () => {
  it('Test meta tags passed by meta component object', (done) => {
    new Vue({
      template: '<div></div>',
      store,
      meta () {
        return {
          title: 'Example of title passed to component'
        }
      },
      mixins: [Meta]
    }).$mount()

    Vue.nextTick()
      .then(() => {
        expect(document.querySelector('title').innerHTML).to.contain('Example of title passed to component')
        done()
      })
      .catch(done)
  })

  it('Test meta tags passed by router', (done) => {
    const router = new VueRouter({routes: [
      { name: 'legal', path: '/legal', component: Static, props: {page: 'lorem', title: 'Legal Notice'}, meta: {title: 'Legal Notice', description: 'Legal Notice - example of description usage'} }
    ]})

    new Vue({
      el: document.createElement('div'),
      store,
      router: router,
      render: h => h('router-view')
    }).$mount()

    router.push({name: 'legal'})

    Vue.nextTick()
      .then(() => {
        expect(document.querySelector('title').innerHTML).to.contain('Legal Notice')
        done()
      })
      .catch(done)
  })
})
