import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { getCookieByName } from 'src/modules/shared';

import { useABTestingCustomizationsFilter } from './composables/use-a-b-testing-customizations-filter';
import { A_B_TEST_GROUP_CHANGED } from './types/events';
import { TestGroupId } from './types/test-group-id';
import { TEST_GROUP_ID_COOKIE_KEY } from './types/test-group-id-cookie-key';

export const ABTesting: StorefrontModule = async function ({ app }) {
  const testGroupId = getCookieByName(TEST_GROUP_ID_COOKIE_KEY, app.$ssrContext) as TestGroupId | undefined;

  if (!testGroupId) {
    return;
  }

  EventBus.$emit(A_B_TEST_GROUP_CHANGED, testGroupId);
}

export {
  useABTestingCustomizationsFilter,
  A_B_TEST_GROUP_CHANGED,
  TEST_GROUP_ID_COOKIE_KEY
}
