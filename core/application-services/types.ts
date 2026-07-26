import VueI18n from 'vue-i18n';
import VueRouter, { Route } from 'vue-router';
import { Store } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

export type RouteView = Route;

export interface I18nAdapter {
  t: VueI18n['t']
}

export interface ApplicationServices {
  store: Store<RootState>,
  router: VueRouter,
  route: RouteView,
  i18n: I18nAdapter
}
