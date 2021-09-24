require('jsdom-global')();
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.use(VueCompositionApi);
