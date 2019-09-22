import Vuex from 'vuex'
import {shallowMount, createLocalVue} from '@vue/test-utils'

export const mountMixin = (
  component: object,
  mountOptions: object = {},
  template: string = '<div />'
) => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  return shallowMount({
    template,
    mixins: [component]
  }, {
    localVue,
    ...mountOptions
  })
};

export const mountMixinWithStore = (
  component: object,
  storeOptions: object = {},
  mountOptions: object = {},
  template: string = '<div />'
) => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  const store = new Vuex.Store({
    ...storeOptions
  });

  return shallowMount({
    template,
    mixins: [component]
  }, {
    store,
    localVue,
    ...mountOptions
  })
};

export const createContextMock = (props = {}) => ({
  // @ts-ignore
  commit: jest.fn(),
  // @ts-ignore
  dispatch: jest.fn(),
  // @ts-ignore
  ...props
})
