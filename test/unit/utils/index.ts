import Vuex from 'vuex'
import { shallowMount, createLocalVue, Wrapper, ThisTypedShallowMountOptions } from '@vue/test-utils';
import Vue, { ComponentOptions } from 'vue';

export const mountMixin = <V extends Vue>(
  component: ComponentOptions<V>,
  mountOptions: ThisTypedShallowMountOptions<V> = {},
  template = '<div />'
): Wrapper<V> => {
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

export const mountMixinWithStore = <V extends Vue>(
  component: ComponentOptions<V>,
  storeOptions: object = {},
  mountOptions: ThisTypedShallowMountOptions<V> = {},
  template = '<div />'
): Wrapper<V> => {
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
