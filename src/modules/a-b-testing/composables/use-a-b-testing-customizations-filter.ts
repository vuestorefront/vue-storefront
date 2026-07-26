import config from 'config';
import { useRequestServices } from '@vue-storefront/core/request-services';

import { Customization } from 'src/modules/customization-system';

import { TestGroupId } from '../types/test-group-id';

const testGroupIds: TestGroupId[] = [TestGroupId.UPLOAD_LATER_DISABLED, TestGroupId.BREED_SELECTOR_DISABLED];

const uploadLaterCustomizationNames: string[] = [
  'send later upload method',
  'by email images uploader'
];
const breedSelectorCustomizationName = 'breed';

export function useABTestingCustomizationsFilter () {
  const request = useRequestServices();
  const TEST_GROUP_ID_COOKIE_KEY = config.abTesting?.cookieKey;

  let testGroupId: TestGroupId | undefined;
  if (TEST_GROUP_ID_COOKIE_KEY) {
    testGroupId = request.getCookie(TEST_GROUP_ID_COOKIE_KEY) as TestGroupId | undefined;
  }

  const canFilter = testGroupId && testGroupIds.includes(testGroupId);

  function customizationFilter (customization: Customization): boolean {
    if (!canFilter) {
      return true;
    }

    switch (testGroupId) {
      case TestGroupId.UPLOAD_LATER_DISABLED:
        return !uploadLaterCustomizationNames.includes(customization.name.toLowerCase());
      case TestGroupId.BREED_SELECTOR_DISABLED:
        return breedSelectorCustomizationName !== customization.name.toLowerCase();
      default:
        return true;
    }
  }

  return { customizationFilter };
}
