import Vue from 'vue';
import VueCompositionApi, { ref } from '@vue/composition-api';

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.use(VueCompositionApi);
vi.mock('lodash-es/merge', () => (arg1, arg2) => ({ ...arg1, ...arg2 }));

vi.mock('../src/utils', () => ({
  Logger: {
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {}
  },
  mask: vi.fn((s) => s),
  onSSR: vi.fn(fn => fn()),
  sharedRef: vi.fn(ref),
  vsfRef: vi.fn(ref),
  generateContext: vi.fn(() => ({ context: null })),
  configureFactoryParams: vi.fn((fParams) => fParams),
  useVSFContext: vi.fn()
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.__DEV__ = false;
