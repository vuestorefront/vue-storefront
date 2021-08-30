import { useUserFactoryParams } from '../../src/useUser/factoryParams';
import { authenticate } from '../../src/useUser/authenticate';
import { useCart } from '../../src/useCart';

jest.mock('../../src/useCart', () => ({
  useCart: jest.fn()
}));

jest.mock('../../src/useUser/authenticate', () => ({
  authenticate: jest.fn()
}));

const customer: any = {
  email: 'test@test.pl',
  password: '123456',
  firstName: 'Don',
  lastName: 'Jon',
  version: '1'
};

const refreshCartMock = jest.fn(() => {});

const context = {
  $ct: {
    api: {
      getMe: jest.fn(),
      customerSignOut: jest.fn(),
      customerChangeMyPassword: jest.fn(),
      createCart: jest.fn(),
      customerUpdateMe: jest.fn(),
      getSettings: jest.fn(() => ({ currentToken: 1 })),
      isGuest: jest.fn()
    },
    config: {
      auth: {
        onTokenRead: () => true,
        onTokenRemove: jest.fn()
      }
    }
  },
  setCart: jest.fn()
} as any;

describe('[commercetools-composables] factoryParams', () => {
  it('load return customer data', async () => {
    (context.$ct.api.getMe as jest.Mock).mockReturnValueOnce({ data: { me: { customer } }});
    expect(await useUserFactoryParams.load(context as any, {} as any)).toEqual(customer);
    expect(context.$ct.api.getMe).toHaveBeenNthCalledWith(1, {customer: true}, undefined);

    (context.$ct.api.getMe as jest.Mock).mockReturnValueOnce({ data: { me: { customer: null } }});
    expect(await useUserFactoryParams.load(context, {customQuery: {key: 'customQuery'}})).toEqual(null);
    expect(context.$ct.api.getMe).toHaveBeenNthCalledWith(2, {customer: true}, {key: 'customQuery'});
  });

  it('does not loading the user without user session', async () => {
    (context.$ct.api.isGuest as any).mockReturnValue(true);
    expect(await useUserFactoryParams.load(context as any, {} as any)).toEqual(null);
  });

  it('logOut method calls API log out method', async () => {
    (context.$ct.api.createCart as jest.Mock).mockReturnValueOnce({ data: { cart: {} }});
    (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});
    await useUserFactoryParams.logOut(context as any, {currentUser: {key: 'user'} as any});
    expect(context.$ct.api.customerSignOut).toHaveBeenCalled();
  });

  it('updateUser return updated user', async () => {
    const user = {currentUser: 'Jon', updatedUserData: 'Bob'} as any;
    (context.$ct.api.customerUpdateMe as jest.Mock).mockReturnValueOnce({ user });
    expect(await useUserFactoryParams.updateUser(context as any, user)).toEqual(user);
  });

  it('updates the user and loads when it is not available', async () => {
    const user = {currentUser: null, updatedUserData: 'Bob'} as any;
    (context.$ct.api.getMe as jest.Mock).mockReturnValueOnce({ data: { me: user } });

    (context.$ct.api.customerUpdateMe as jest.Mock).mockReturnValueOnce({ user });
    expect(await useUserFactoryParams.updateUser(context as any, user)).toEqual(user);
  });

  it('register method return a new customer', async () => {
    (authenticate as jest.Mock).mockReturnValueOnce({ customer });
    expect(await useUserFactoryParams.register(context as any, customer)).toEqual(customer);
  });

  it('logIn method return a logged in customer', async () => {
    (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});
    (authenticate as jest.Mock).mockReturnValueOnce({ customer });
    expect(await useUserFactoryParams.logIn(context as any, customer)).toEqual(customer);
  });

  describe('changePassword', () => {
    it('register method return a new customer', async () => {
      (authenticate as jest.Mock).mockReturnValueOnce({ customer });
      expect(await useUserFactoryParams.register(context as any, customer)).toEqual(customer);
    });

    it('succeed returning logged user', async () => {
      const cart = {};
      const changePasswordParams: any = { currentUser: customer, currentPassword: '', newPassword: '' };

      (context.$ct.api.createCart as jest.Mock).mockReturnValueOnce({ data: { cart }});
      (useCart as jest.Mock).mockReturnValueOnce({ refreshCart: refreshCartMock });
      (context.$ct.api.customerChangeMyPassword as jest.Mock).mockReturnValueOnce({ data: { user: customer }});
      (authenticate as jest.Mock).mockReturnValueOnce({ customer, cart });

      expect(await useUserFactoryParams.changePassword(context as any, changePasswordParams)).toEqual(customer);
      expect(context.$ct.api.customerSignOut).toHaveBeenCalled();
    });
  });
});
