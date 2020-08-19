import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

const NuxtApi = jest.requireActual('@nuxtjs/composition-api');

Vue.use(VueCompositionApi);

jest.mock('@nuxtjs/composition-api', () => ({
  ...NuxtApi,
  ssrRef: jest.fn((arg) => NuxtApi.ssrRef(arg, String(Math.random()).slice(2)))
}));
