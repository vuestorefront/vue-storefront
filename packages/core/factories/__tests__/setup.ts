import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

jest.mock('@vue-storefront/utils', () => ({
  usePersistedState: jest.fn(() => ({
    state: null,
    persistedResource: jest.fn(async (fn, params) => fn(params))
  }))
}));
