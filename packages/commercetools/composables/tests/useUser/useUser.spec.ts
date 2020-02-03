import useUser from '../../src/useUser';
import { customerSignMeUp } from '@vue-storefront/commercetools-api'
import mountComposable from '../_mountComposable'

jest.mock('@vue-storefront/commercetools-api', () => ({
  customerSignMeUp: jest.fn(),
}))

describe('[commercetools-composables] useUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('registers new customer', async () => {
    const userData = { customer: { firstName: 'john', lastName: 'doe' } };
    (customerSignMeUp as any).mockReturnValue(Promise.resolve({ data: userData }));

    const wrapper = mountComposable(useUser)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.register(userData.customer)

    expect(wrapper.vm.$data.loading).toBeTruthy()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.user).toEqual(userData.customer)
    expect(wrapper.vm.$data.loading).toBeFalsy()
  });

  it.skip('clears entire cart', async () => {
    const wrapper = mountComposable(useUser)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.login()
  })

  it.skip('clears entire cart', async () => {
    const wrapper = mountComposable(useUser)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.logout()
  })
});
