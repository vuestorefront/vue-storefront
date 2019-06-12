import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils'

import { Newsletter } from '../../../components/Newsletter'

jest.mock('@vue-storefront/core/modules/newsletter/mixins/SubscriptionStatus', () => ({}))
jest.mock('@vue-storefront/core/modules/newsletter/mixins/Subscribe', () => ({}))
jest.mock('@vue-storefront/core/modules/newsletter/mixins/Unsubscribe', () => ({}))

describe('Newsletter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('can be initialized', () => {
    const wrapper = mountMixinWithStore(Newsletter)

    expect(wrapper.isVueInstance()).toBe(true)
  })
})
