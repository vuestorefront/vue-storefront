import { StorefrontModule } from 'core/lib/modules';
import {
  AdditionalContentOutlet
} from '@vue-storefront/core/additional-content';

import { getPolarisScript } from './helpers/get-polaris-script.function';

import CaliforniaPrivacyNoticeLink from './components/california-privacy-notice-link.vue';
import NoticeOfFinancialIncentiveLink from './components/notice-of-financial-incentive-link.vue';
import OptOutLink from './components/opt-out-link.vue';

const californiaPrivacyNoticeLink = {
  component: CaliforniaPrivacyNoticeLink,
  key: 'true-vault:california-privacy-notice'
} as const;

export const TrueVaultModule: StorefrontModule = ({ appConfig, services }) => {
  const polarisId = appConfig.privacyPolicy?.polarisId;

  if (!polarisId) {
    return;
  }

  services.head.append(getPolarisScript(polarisId));

  services.additionalContent.register(
    AdditionalContentOutlet.PRIVACY_POLICY_LINKS,
    californiaPrivacyNoticeLink
  );

  services.additionalContent.register(AdditionalContentOutlet.FOOTER_LINKS, [
    californiaPrivacyNoticeLink,
    {
      component: OptOutLink,
      key: 'true-vault:opt-out'
    }
  ]);

  services.additionalContent.register(
    AdditionalContentOutlet.FINANCIAL_INCENTIVE_LINKS,
    [
    californiaPrivacyNoticeLink,
    {
      component: NoticeOfFinancialIncentiveLink,
      key: 'true-vault:financial-incentive-notice'
    }
    ]
  );
}
