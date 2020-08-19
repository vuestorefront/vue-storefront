import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

const utils = jest.requireActual('../src/utils');

Vue.use(VueCompositionApi);

jest.mock('../src/utils', () => ({
  ...utils,
  onSSR: jest.fn(fn => fn()),
  shared: jest.fn(arg => arg),
  getShared: jest.fn(() => ({}))
}));
