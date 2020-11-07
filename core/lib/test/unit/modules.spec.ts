import Vuex, { Store } from 'vuex'
import VueRouter from 'vue-router'
import { createLocalVue } from '@vue/test-utils'
import {
  refs,
  injectReferences,
  registerModule,
  isModuleRegistered
} from '@vue-storefront/core/lib/modules'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Modules', () => {
  describe('injectReferences', () => {
    beforeEach(() => {
      refs.app = undefined
      refs.store = undefined
      refs.router = undefined
      refs.config = undefined
    })

    it('should set the passing parameters to the `refs`', () => {
      const app = 'This is the app parameter';
      const store = new Store({})
      const router = new VueRouter()
      const config = 'This is the config parameter'

      injectReferences(app, store, router, config)

      expect(refs.app).toBe(app)
      expect(refs.store).toBe(store)
      expect(refs.router).toBe(router)
      expect(refs.config).toBe(config)
    })
  })

  describe('registerModule', () => {
    it('re-register a module to check branch coverage', () => {
      function newModule () {}
      registerModule(newModule);
      registerModule(newModule);

      const result = isModuleRegistered('newModule')

      expect(result).toBe(true)
    })
  })

  describe('isModuleRegistered', () => {
    it('return false on an unregisterd module', () => {
      const result = isModuleRegistered('testingmodule')
      expect(result).toBe(false)
    })

    it('return true on a registered module', () => {
      const config = 'The config';
      function newModule () {}
      registerModule(newModule, config);

      const result = isModuleRegistered('newModule')

      expect(result).toBe(true)
    })
  })
})
