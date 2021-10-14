require('jsdom-global')();
import Vue from 'vue';
import VueCompositionApi from '@nuxtjs/composition-api';

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.use(VueCompositionApi);
