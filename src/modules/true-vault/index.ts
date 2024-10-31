import { StorefrontModule } from 'core/lib/modules';

import { getPolarisScript } from './helpers/get-polaris-script.function';

import CaliforniaPrivacyNoticeLink from './components/california-privacy-notice-link.vue';
import NoticeOfFinancialIncentiveLink from './components/notice-of-financial-incentive-link.vue';
import OptOutLink from './components/opt-out-link.vue';
import PrivacyPolicyLink from './components/privacy-policy-link.vue';

export const TrueVaultModule: StorefrontModule = ({ app, appConfig }) => {
  app.$extendedHead.append(getPolarisScript(appConfig));

  if (!app.$root.$options.additionalContent) {
    return;
  }

  app.$root.$options.additionalContent['CaliforniaPrivacyNoticeLink'] = CaliforniaPrivacyNoticeLink;
}

export {
  CaliforniaPrivacyNoticeLink,
  NoticeOfFinancialIncentiveLink,
  OptOutLink,
  PrivacyPolicyLink
}
