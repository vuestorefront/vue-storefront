import { ComputedRef, InjectionKey } from 'vue';

import { injectRequired } from '@vue-storefront/core/application-services';

import { AdditionalContentRegistry } from './registry';
import {
  AdditionalContentEntry,
  AdditionalContentOutlet
} from './types';

export const additionalContentInjectionKey:
InjectionKey<AdditionalContentRegistry> = Symbol('AdditionalContentRegistry');

export function useAdditionalContent (
  outlet: AdditionalContentOutlet
): ComputedRef<readonly AdditionalContentEntry[]> {
  return injectRequired(
    additionalContentInjectionKey,
    'additional content'
  ).get(outlet);
}
