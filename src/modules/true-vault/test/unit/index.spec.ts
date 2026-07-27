import Vue, { CreateElement, VueConstructor } from 'vue';
import { mount, Wrapper } from '@vue/test-utils';

import {
  AdditionalContentEntry,
  AdditionalContentOutlet,
  AdditionalContentRegistry,
  additionalContentInjectionKey,
  useAdditionalContent
} from '@vue-storefront/core/additional-content';

import { TrueVaultModule } from '../../index';

jest.mock('config', () => ({
  privacyPolicy: {
    californiaPrivacyNoticeUrl: 'https://example.test/california-privacy-notice',
    financialIncentiveNoticeUrl: 'https://example.test/financial-incentive-notice',
    optOutUrl: 'https://example.test/opt-out'
  }
}));

type AdditionalContentFixture = Vue & {
  privacyPolicyAdditionalLinks: readonly AdditionalContentEntry[],
  footerLinks: readonly AdditionalContentEntry[],
  financialIncentivesLinks: readonly AdditionalContentEntry[]
};

function createOutletFixture (): VueConstructor<AdditionalContentFixture> {
  return Vue.extend({
    name: 'AdditionalContentCharacterizationFixture',
    render (createElement: CreateElement) {
      const renderOutlet = (
        outlet: keyof Pick<
          AdditionalContentFixture,
          'privacyPolicyAdditionalLinks' |
          'footerLinks' |
          'financialIncentivesLinks'
        >
      ) => {
        const entries = this[outlet];

        return createElement(
          'section',
          { attrs: { 'data-outlet': outlet } },
          entries.map(entry => createElement(entry.component, { key: entry.key }))
        );
      };

      return createElement('div', [
        renderOutlet('privacyPolicyAdditionalLinks'),
        renderOutlet('footerLinks'),
        renderOutlet('financialIncentivesLinks')
      ]);
    },
    setup () {
      return {
        privacyPolicyAdditionalLinks: useAdditionalContent(
          AdditionalContentOutlet.PRIVACY_POLICY_LINKS
        ),
        footerLinks: useAdditionalContent(
          AdditionalContentOutlet.FOOTER_LINKS
        ),
        financialIncentivesLinks: useAdditionalContent(
          AdditionalContentOutlet.FINANCIAL_INCENTIVE_LINKS
        )
      };
    }
  }) as VueConstructor<AdditionalContentFixture>;
}

describe('TrueVault Additional Content compatibility', () => {
  let wrapper: Wrapper<AdditionalContentFixture> | undefined;

  afterEach(() => {
    wrapper?.destroy();
    wrapper = undefined;
  });

  it('renders no outlet content when TrueVault is disabled', async () => {
    const additionalContent = new AdditionalContentRegistry();
    const append = jest.fn();

    TrueVaultModule({
      appConfig: { privacyPolicy: {} },
      services: {
        head: { append },
        additionalContent
      }
    } as any);
    wrapper = mount(createOutletFixture(), {
      provide: {
        [additionalContentInjectionKey as symbol]: additionalContent
      }
    });
    await wrapper.vm.$nextTick();

    expect(append).not.toHaveBeenCalled();
    expect(wrapper.find('[data-outlet="privacyPolicyAdditionalLinks"]').element.children).toHaveLength(0);
    expect(wrapper.find('[data-outlet="footerLinks"]').element.children).toHaveLength(0);
    expect(wrapper.find('[data-outlet="financialIncentivesLinks"]').element.children).toHaveLength(0);
  });

  it('preserves TrueVault outlet order and rendered components when enabled', async () => {
    const additionalContent = new AdditionalContentRegistry();
    const append = jest.fn();

    TrueVaultModule({
      appConfig: {
        privacyPolicy: {
          polarisId: 'polaris-id'
        }
      },
      services: {
        head: { append },
        additionalContent
      }
    } as any);
    wrapper = mount(createOutletFixture(), {
      provide: {
        [additionalContentInjectionKey as symbol]: additionalContent
      }
    });
    await wrapper.vm.$nextTick();

    expect(append).toHaveBeenCalledTimes(1);
    expect(append.mock.calls[0][0]).toContain('/polaris-id/polaris.js');
    expect(Array.from(
      wrapper.find('[data-outlet="privacyPolicyAdditionalLinks"]').element.children
    ).map(element => element.className)).toEqual([
      'california-privacy-notice-link'
    ]);
    expect(Array.from(
      wrapper.find('[data-outlet="footerLinks"]').element.children
    ).map(element => element.className)).toEqual([
      'california-privacy-notice-link',
      'opt-out-link'
    ]);
    expect(Array.from(
      wrapper.find('[data-outlet="financialIncentivesLinks"]').element.children
    ).map(element => element.className)).toEqual([
      'california-privacy-notice-link',
      'notice-of-financial-incentive-link'
    ]);
  });
});
