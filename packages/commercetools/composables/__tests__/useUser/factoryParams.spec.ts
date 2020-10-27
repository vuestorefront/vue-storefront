import { params } from '../../src/useUser/factoryParams';
import {
  getMe as apiGetMe,
  customerSignOut as apiCustomerSignOut,
  customerChangeMyPassword as apiCustomerChangeMyPassword,
  createCart as apiCreateCart,
  customerUpdateMe as apiCustomerUpdateMe,
  isTokenUserSession
} from '@vue-storefront/commercetools-api';
import { authenticate } from '../../src/useUser/authenticate';
import { useCart } from '../../src/useCart';

jest.mock('../../src/useCart', () => ({
  useCart: jest.fn(() => {}),
  setCart: jest.fn()
}));

jest.mock('../../src/useUser', () => ({
  setUser: jest.fn()
}));

jest.mock('@vue-storefront/commercetools-api', () => ({
  getMe: jest.fn(),
  customerSignOut: jest.fn(),
  customerChangeMyPassword: jest.fn(),
  createCart: jest.fn(),
  customerUpdateMe: jest.fn(),
  getSettings: jest.fn(() => ({ currentToken: 1 })),
  isTokenUserSession: jest.fn()
}));

jest.mock('../../src/useUser', () => ({
  setUser: jest.fn()
}));

jest.mock('../../src/useUser/authenticate', () => ({
  authenticate: jest.fn()
}));

class GraphQLMockError extends Error {
  graphQLErrors: any;

  constructor(message) {
    super();
    this.graphQLErrors = [{ message }];
  }
}

const customer: any = {
  email: 'test@test.pl',
  password: '123456',
  firstName: 'Don',
  lastName: 'Jon',
  version: '1'
};

const refreshCartMock = jest.fn(() => {});

describe('[commercetools-composables] factoryParams', () => {
  it('loadUser return customer data', async () => {
    (isTokenUserSession as any).mockReturnValue(true);

    (apiGetMe as jest.Mock).mockReturnValueOnce({ data: { me: { customer } }});
    expect(await params.loadUser()).toEqual(customer);

    (apiGetMe as jest.Mock).mockRejectedValueOnce(new GraphQLMockError('Resource Owner Password Credentials Grant'));
    expect(await params.loadUser()).toEqual(null);

    (apiGetMe as jest.Mock).mockRejectedValueOnce(new Error('some error'));
    await expect(params.loadUser()).rejects.toThrowError('some error');
  });

  it('does not loading the user without user session', async () => {
    (isTokenUserSession as any).mockReturnValue(false);
    expect(await params.loadUser()).toEqual(null);
  });

  it('logOut method calls API log out method', async () => {
    (apiCreateCart as jest.Mock).mockReturnValueOnce({ data: { cart: {} }});
    (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});
    await params.logOut();
    expect(apiCustomerSignOut).toHaveBeenCalled();
    expect(apiCreateCart).toHaveBeenCalled();
  });

  it('updateUser return updated user', async () => {
    const user = {currentUser: 'Jon', updatedUserData: 'Bob'} as any;
    (apiCustomerUpdateMe as jest.Mock).mockReturnValueOnce({ user });
    expect(await params.updateUser(user)).toEqual(user);
  });

  it('updates the user and loads when it is not available', async () => {
    const user = {currentUser: null, updatedUserData: 'Bob'} as any;
    (apiCustomerUpdateMe as jest.Mock).mockReturnValueOnce({ user });
    expect(await params.updateUser(user)).toEqual(user);
  });

  it('register method return a new customer', async () => {
    (authenticate as jest.Mock).mockReturnValueOnce({ customer });
    expect(await params.register(customer)).toEqual(customer);
  });

  it('logIn method return a logged in customer', async () => {
    (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});
    (authenticate as jest.Mock).mockReturnValueOnce({ customer });
    expect(await params.logIn(customer)).toEqual(customer);
  });

  describe('changePassword', () => {
    it('register method return a new customer', async () => {
      (authenticate as jest.Mock).mockReturnValueOnce({ customer });
      expect(await params.register(customer)).toEqual(customer);
    });

    it('succeed returning logged user', async () => {
      const cart = {};
      const changePasswordParams: any = { currentUser: customer, currentPassword: '', newPassword: '' };

      (apiCreateCart as jest.Mock).mockReturnValueOnce({ data: { cart }});
      (useCart as jest.Mock).mockReturnValueOnce({ refreshCart: refreshCartMock });
      (apiCustomerChangeMyPassword as jest.Mock).mockReturnValueOnce({ data: { user: customer }});
      (authenticate as jest.Mock).mockReturnValueOnce({ customer, cart });

      expect(await params.changePassword(changePasswordParams)).toEqual(customer);
      expect(apiCustomerSignOut).toHaveBeenCalled();
    });
  });
});
