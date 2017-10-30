import Vue from 'vue/dist/vue.common.js'
import Vuex from 'vuex/dist/vuex.js'
import store from 'src/store'
import Home from 'src/themes/default/pages/Home.vue'

Vue.use(Vuex)

describe('Home.vue', () => {
  it('Home page component initial test', (done) => {
    new Vue({
      template: '<div><home></home></div>',
      store,
      components: {
        Home
      }
    }).$mount()

    Vue.nextTick()
      .then(() => {
        expect(document.querySelector('title').innerHTML).to.contain('Home')
        done()
      })
      .catch(done)
  })
})
