import { StorefrontModule } from 'core/lib/modules';

import { getPolarisScript } from './helpers/get-polaris-script.function';

import CaliforniaPrivacyNoticeLink from './components/california-privacy-notice-link.vue';
import NoticeOfFinancialIncentiveLink from './components/notice-of-financial-incentive-link.vue';
import OptOutLink from './components/opt-out-link.vue';

const californiaPrivacyNoticeLink = {
  component: CaliforniaPrivacyNoticeLink,
  key: 'CaliforniaPrivacyNoticeLink'
};

export const TrueVaultModule: StorefrontModule = ({ app, appConfig }) => {
  const polarisId = appConfig.privacyPolicy?.polarisId;

  if (!polarisId) {
    return;
  }

  app.$extendedHead.append(getPolarisScript(polarisId));

  if (!app.$root.$options.additionalContent) {
    return;
  }

  app.$root.$options.additionalContent.privacyPolicyAdditionalLinks = [
    californiaPrivacyNoticeLink
  ];

  app.$root.$options.additionalContent.footerLinks = [
    californiaPrivacyNoticeLink,
    {
      component: OptOutLink,
      key: 'OptOutLink'
    }
  ];

  app.$root.$options.additionalContent.financialIncentivesLinks = [
    californiaPrivacyNoticeLink,
    {
      component: NoticeOfFinancialIncentiveLink,
      key: 'NoticeOfFinancialIncentiveLink'
    }
  ];
}
