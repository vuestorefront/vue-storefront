import VueI18n from 'vue-i18n';

import { I18nAdapter } from './types';

export function createI18nAdapter (i18n: VueI18n): I18nAdapter {
  return {
    t: i18n.t.bind(i18n)
  };
}
