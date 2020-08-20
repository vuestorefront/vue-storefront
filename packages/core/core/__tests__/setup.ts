import Vue from 'vue';
import VueCompositionApi, { ref } from '@vue/composition-api';

const utils = jest.requireActual('../src/utils');

Vue.use(VueCompositionApi);

jest.mock('../src/utils', () => ({
  ...utils,
  onSSR: jest.fn(fn => fn()),
  sharedRef: jest.fn(ref),
  vsfRef: jest.fn(ref)
}));
