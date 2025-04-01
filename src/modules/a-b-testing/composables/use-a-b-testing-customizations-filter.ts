import { Context } from 'core/scripts/utils/types';

import { Customization } from 'src/modules/customization-system';
import { getCookieByName } from 'src/modules/shared';

import { TEST_GROUP_ID_COOKIE_KEY } from '../types/test-group-id-cookie-key';
import { TestGroupId } from '../types/test-group-id';

const testGroupIds: TestGroupId[] = [TestGroupId.UPLOAD_LATER];

const uploadLaterCustomizationNames: string[] = [
  'send later upload method',
  'by email images uploader'
];

export function useABTestingCustomizationsFilter (ssrContext: Context) {
  const testGroupId = getCookieByName(TEST_GROUP_ID_COOKIE_KEY, ssrContext) as TestGroupId | undefined;

  const canFilter = testGroupId && testGroupIds.includes(testGroupId);

  function customizationFilter (customization: Customization): boolean {
    if (!canFilter) {
      return true;
    }

    switch (testGroupId) {
      case TestGroupId.UPLOAD_LATER:
        return !uploadLaterCustomizationNames.includes(customization.name.toLowerCase());
      default:
        return true;
    }
  }

  return { customizationFilter };
}
