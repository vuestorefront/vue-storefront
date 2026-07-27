import config from 'config';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';

import { useABTestingCustomizationsFilter } from './composables/use-a-b-testing-customizations-filter';
import { A_B_TEST_GROUP_CHANGED } from './types/events';
import { TestGroupId } from './types/test-group-id';

export const ABTesting: StorefrontModule = async function ({ services }) {
  const TEST_GROUP_ID_COOKIE_KEY = config.abTesting.cookieKey;
  const testGroupId = services.request.getCookie(TEST_GROUP_ID_COOKIE_KEY) as TestGroupId | undefined;

  if (!testGroupId) {
    return;
  }

  EventBus.$emit(A_B_TEST_GROUP_CHANGED, testGroupId);
}

export {
  useABTestingCustomizationsFilter,
  A_B_TEST_GROUP_CHANGED
}
