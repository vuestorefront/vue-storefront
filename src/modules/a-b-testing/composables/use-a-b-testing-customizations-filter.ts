import config from 'config';
import { Context } from 'core/scripts/utils/types';

import { Customization } from 'src/modules/customization-system';
import { getCookieByName } from 'src/modules/shared';

import { TestGroupId } from '../types/test-group-id';

const testGroupIds: TestGroupId[] = [TestGroupId.UPLOAD_LATER_DISABLE];

const uploadLaterCustomizationNames: string[] = [
  'send later upload method',
  'by email images uploader'
];

export function useABTestingCustomizationsFilter (ssrContext: Context) {
  const TEST_GROUP_ID_COOKIE_KEY = config.abTesting.cookieKey;
  const testGroupId = getCookieByName(TEST_GROUP_ID_COOKIE_KEY, ssrContext) as TestGroupId | undefined;

  const canFilter = testGroupId && testGroupIds.includes(testGroupId);

  function customizationFilter (customization: Customization): boolean {
    if (!canFilter) {
      return true;
    }

    switch (testGroupId) {
      case TestGroupId.UPLOAD_LATER_DISABLE:
        return !uploadLaterCustomizationNames.includes(customization.name.toLowerCase());
      default:
        return true;
    }
  }

  return { customizationFilter };
}
