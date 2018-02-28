import Vue from 'vue/dist/vue.common.js'
import Vuex from 'vuex/dist/vuex.js'
import store from 'core/store'
import { EventBusPlugin as EventBus } from 'core/plugins/event-bus'
import Modal from 'core/components/Modal.vue'

Vue.use(EventBus)
Vue.use(Vuex)

describe('Modal.vue', () => {
  var vm = new Vue({
    template: '<div><modal name="my-modal"><div class="test-modal">Modal content</div></modal></div>',
    store,
    components: {
      Modal
    }
  }).$mount()

  describe('When you open the modal', () => {
    vm.$bus.$emit('modal-toggle', 'my-modal')

    it('should be visible and hidden after toggle again', (done) => {
      Vue.nextTick(() => {
        expect(vm.$el.querySelectorAll('.test-modal').length.should.equal(1))

        vm.$bus.$emit('modal-toggle', 'my-modal')

        Vue.nextTick().then(() => {
          expect(vm.$el.querySelectorAll('.test-modal').length.should.equal(0))
        }).then(done, done)
      })
    })
  })
})
