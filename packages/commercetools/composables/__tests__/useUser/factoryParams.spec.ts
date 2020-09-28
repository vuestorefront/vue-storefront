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

describe('[commercetools-composables] factoryParams', () => {
  it('loadUser return customer data', async () => {
    const createError = (message) => {
      const error = new Error();
      (error as any).graphQLErrors = [{ message }];

      return error;
    };
    (isTokenUserSession as any).mockReturnValue(true);

    const customer = {email: 'test@test.pl', password: '123456'};
    (apiGetMe as jest.Mock).mockReturnValueOnce({ data: { me: { customer } }});
    expect(await params.loadUser()).toEqual(customer);

    (apiGetMe as jest.Mock).mockImplementationOnce(() => {
      throw createError('Resource Owner Password Credentials Grant');
    });

    expect(await params.loadUser()).toEqual(null);

    (apiGetMe as jest.Mock).mockImplementationOnce(() => {
      throw new Error('some error');
    });

    await expect(params.loadUser()).rejects.toThrowError('some error');
  });

  it('does not loading the user without user session', async () => {
    (isTokenUserSession as any).mockReturnValue(false);

    expect(await params.loadUser()).toEqual(null);
  });

  it('logOut method calls API log out method', async () => {
    (apiCreateCart as jest.Mock).mockReturnValueOnce({ data: { cart: {} }});
    const refreshCartMock = jest.fn(() => {});
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
    const customer = {email: 'test@test.pl', password: '123456', firstName: 'Don', lastName: 'Jon'};
    (authenticate as jest.Mock).mockReturnValueOnce({ customer });
    expect(await params.register(customer)).toEqual(customer);
  });

  it('logIn method return a logged in customer', async () => {
    const refreshCartMock = jest.fn(() => {});
    (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});
    const customer = {username: 'test@test.pl', password: '123456'};
    (authenticate as jest.Mock).mockReturnValueOnce({ customer });
    expect(await params.logIn(customer)).toEqual(customer);
  });

  describe('changePassword', () => {
    it('register method return a new customer', async () => {
      const customer = {email: 'test@test.pl', password: '123456', firstName: 'Don', lastName: 'Jon'};
      (authenticate as jest.Mock).mockReturnValueOnce({ customer });
      expect(await params.register(customer)).toEqual(customer);
    });

    it('succeed returning logged user', async () => {
      (apiCreateCart as jest.Mock).mockReturnValueOnce({ data: { cart: {} }});
      const userEmail = {data: {user: {email: 'Test' }}};

      const refreshCartMock = jest.fn(() => {});
      (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});

      (apiCustomerChangeMyPassword as jest.Mock).mockReturnValueOnce(userEmail);
      (authenticate as jest.Mock).mockReturnValueOnce({value: {email: 'Test', password: '123'}});

      expect(await params.changePassword({currentUser: userEmail, currentPassword: '', newPassword: '123'} as any))
        .toEqual({
          password: '123',
          email: 'Test'
        });
      expect(apiCustomerSignOut).toHaveBeenCalled();
    });

    describe('error is called by a console error', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');
      it('with first message from graphQL errors array', async () => {
        (apiCreateCart as jest.Mock).mockReturnValueOnce({ data: { cart: {} }});
        consoleErrorSpy.mockImplementationOnce(() => {});
        const refreshCartMock = jest.fn(() => {});
        (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});
        (apiCustomerChangeMyPassword as jest.Mock).mockReturnValueOnce({data: {user: {email: ''}}});
        (authenticate as jest.Mock).mockImplementationOnce(() => {
          throw {graphQLErrors: [{message: 'There is an error'}]};
        });
        await params.changePassword({currentUser: {version: {}}} as any);
        expect(consoleErrorSpy).toBeCalledWith('There is an error');
      });
      it('with message from exception', async () => {
        (apiCreateCart as jest.Mock).mockReturnValueOnce({ data: { cart: {} }});
        consoleErrorSpy.mockImplementationOnce(() => {});
        (apiCustomerChangeMyPassword as jest.Mock).mockReturnValueOnce({data: {user: {email: ''}}});
        (authenticate as jest.Mock).mockImplementationOnce(() => {
          throw 'There is an error';
        });
        await params.changePassword({currentUser: {version: {}}} as any);
        expect(consoleErrorSpy).toBeCalledWith('There is an error');
      });
    });
  });
});
