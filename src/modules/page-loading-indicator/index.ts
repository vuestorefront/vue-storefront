import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';

import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { isServer } from '@vue-storefront/core/helpers';

import { VueProgressBarOptions } from './vue-progress-bar.options';

export const PageLoadingIndicatorModule: StorefrontModule = function ({ app, router }) {
  Vue.use(VueProgressBar, VueProgressBarOptions);

  if (isServer) {
    return;
  }

  router.beforeEach((to, from, next) => {
    app.$Progress.start();
    app.$Progress.increase(40);
    next();
  });

  router.afterEach(() => {
    app.$Progress.finish();
  });
}
