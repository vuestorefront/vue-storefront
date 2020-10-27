import Vue from 'vue';
import VueCompositionApi, { ref } from '@vue/composition-api';

const utils = jest.requireActual('@vue-storefront/core');

Vue.use(VueCompositionApi);

jest.mock('@vue-storefront/core', () => ({
  ...utils,
  onSSR: jest.fn(fn => fn()),
  sharedRef: jest.fn(ref),
  vsfRef: jest.fn(ref)
}));
