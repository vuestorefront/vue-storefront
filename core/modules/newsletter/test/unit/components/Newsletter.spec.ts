import path from 'path';
import { Newsletter } from '../../../components/Newsletter';

const utils = require( path.resolve(process.cwd() + '/test/unit/utils' ));
const mountMixinWithStore = utils.mountMixinWithStore;

jest.mock('@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus', () => ({}));
jest.mock('@vue-storefront/core/modules/newsletter/mixins/Subscribe', () => ({}));
jest.mock('@vue-storefront/core/modules/newsletter/mixins/Unsubscribe', () => ({}));

describe('Newsletter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  it('can be initialized', () => {
    const wrapper = mountMixinWithStore(Newsletter);

    expect(wrapper.isVueInstance()).toBe(true)
  })
});
