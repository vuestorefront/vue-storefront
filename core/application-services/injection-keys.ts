import { InjectionKey } from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

import { I18nAdapter, RouteView } from './types';

export const storeInjectionKey: InjectionKey<Store<RootState>> =
  Symbol('StorefrontStore');
export const routerInjectionKey: InjectionKey<VueRouter> =
  Symbol('StorefrontRouter');
export const routeInjectionKey: InjectionKey<RouteView> =
  Symbol('StorefrontRoute');
export const i18nInjectionKey: InjectionKey<I18nAdapter> =
  Symbol('StorefrontI18n');
