import { params } from '../../src/useUser/factoryParams';
import {
  getMe as apiGetMe,
  customerSignOut as apiCustomerSignOut,
  customerChangeMyPassword as apiCustomerChangeMyPassword
} from '@vue-storefront/commercetools-api';
import { authenticate } from '../../src/useUser/authenticate';

import useCart from '../../src/useCart';

jest.mock('../../src/useCart', () =>
  jest.fn(() => {})
);

jest.mock('@vue-storefront/commercetools-api', () => ({
  getMe: jest.fn(),
  customerSignOut: jest.fn(),
  customerChangeMyPassword: jest.fn()
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

    const customer = {email: 'test@test.pl', password: '123456'};
    (apiGetMe as jest.Mock).mockReturnValueOnce({ data: { me: { customer } }});
    expect(await params.loadUser()).toEqual(customer);

    (apiGetMe as jest.Mock).mockImplementationOnce(() => {
      throw createError('Resource Owner Password Credentials Grant');
    });

    expect(await params.loadUser()).toEqual(null);
  });
  it('logOut method calls API log out method', async () => {
    const refreshCartMock = jest.fn(() => {});
    (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});
    await params.logOut();
    expect(apiCustomerSignOut).toHaveBeenCalled();
  });
  it('updateUser return updated user', async () => {
    // wait until the apiClient receive userUpdate method
    const update = {currentUser: 'Jon', updatedUserData: 'Bob'} as any;
    expect(await params.updateUser(update)).toEqual(update);
  });
  it('register method return a new customer', async () => {
    const customer = {email: 'test@test.pl', password: '123456', firstName: 'Don', lastName: 'Jon'};
    (authenticate as jest.Mock).mockReturnValueOnce(customer);
    expect(await params.register(customer)).toEqual(customer);
  });
  it('logIn method return a logged in customer', async () => {
    const refreshCartMock = jest.fn(() => {});
    (useCart as jest.Mock).mockReturnValueOnce({refreshCart: refreshCartMock});
    const customer = {username: 'test@test.pl', password: '123456'};
    (authenticate as jest.Mock).mockReturnValueOnce(customer);
    expect(await params.logIn(customer)).toEqual(customer);
  });

  describe('changePassword', () => {
    it('register method return a new customer', async () => {
      const customer = {email: 'test@test.pl', password: '123456', firstName: 'Don', lastName: 'Jon'};
      (authenticate as jest.Mock).mockReturnValueOnce(customer);
      expect(await params.register(customer)).toEqual(customer);
    });

    it('succeed returning logged user', async () => {
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
