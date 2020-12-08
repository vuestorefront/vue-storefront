import Vue from 'vue';
import VueCompositionApi, { ref } from '@vue/composition-api';

const utils = jest.requireActual('../src/utils');

Vue.use(VueCompositionApi);
jest.mock('lodash-es/merge', () => (arg1, arg2) => ({ ...arg1, ...arg2 }));

jest.mock('../src/utils', () => ({
  ...utils,
  Logger: {
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {}
  },
  mask: jest.fn((s) => s),
  onSSR: jest.fn(fn => fn()),
  sharedRef: jest.fn(ref),
  vsfRef: jest.fn(ref),
  generateContext: jest.fn(() => ({ context: null })),
  useVSFContext: jest.fn()
}));

// @ts-ignore
global.__DEV__ = false;
