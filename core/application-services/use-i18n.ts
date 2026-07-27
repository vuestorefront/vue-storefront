import { injectRequired } from './inject-required';
import { i18nInjectionKey } from './injection-keys';
import { I18nAdapter } from './types';

export function useI18n (): I18nAdapter {
  return injectRequired(i18nInjectionKey, 'i18n');
}
