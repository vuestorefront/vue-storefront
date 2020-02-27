import useUser from '../../src/useUser';
import { customerSignMeUp, customerSignMeIn, customerSignOut } from '@vue-storefront/commercetools-api';
import mountComposable from '../_mountComposable';

jest.mock('@vue-storefront/commercetools-api', () => ({
  customerSignMeUp: jest.fn(),
  customerSignMeIn: jest.fn(),
  customerSignOut: jest.fn(),
  getMe: () => ({ data: { me: { customer: { firstName: 'loaded customer',
    lastName: 'loaded customer' } } } })
}));

describe('[commercetools-composables] useUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates properties', () => {
    const { loading, error } = useUser();

    expect(loading.value).toEqual(true);
    expect(error.value).toEqual(null);
  });

  it('registers new customer', async () => {
    const user = { customer: { firstName: 'john',
      lastName: 'doe' } };
    (customerSignMeUp as any).mockReturnValue(Promise.resolve({ data: { user } }));

    const wrapper = mountComposable(useUser);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.$data.register(user.customer);

    expect(wrapper.vm.$data.loading).toBeTruthy();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.user).toEqual(user.customer);
    expect(wrapper.vm.$data.loading).toBeFalsy();
  });

  it('login customer and log out', async () => {
    const user = { customer: { firstName: 'john',
      lastName: 'doe' } };
    (customerSignMeIn as any).mockReturnValue(Promise.resolve({ data: { user } }));

    const wrapper = mountComposable(useUser);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.$data.login({ email: 'john@doe.com',
      password: '123' });

    expect(wrapper.vm.$data.loading).toBeTruthy();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.user).toEqual(user.customer);
    expect(wrapper.vm.$data.loading).toBeFalsy();
  });

  it('logout customer', async () => {
    const wrapper = mountComposable(useUser);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.$data.logout();

    await wrapper.vm.$nextTick();

    expect(customerSignOut).toBeCalled();
  });

  it('loads current customer', async () => {
    const wrapper = mountComposable(useUser);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.user).toEqual({
      firstName: 'loaded customer',
      lastName: 'loaded customer'
    });
  });
});
