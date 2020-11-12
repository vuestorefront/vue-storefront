import { CustomQuery, UseUserFactoryParams } from '@vue-storefront/core';
import { Customer } from '../types/GraphQL';
import { authenticate } from './authenticate';
import {
  customerSignMeUp as apiCustomerSignMeUp,
  customerSignMeIn as apiCustomerSignMeIn,
  customerSignOut as apiCustomerSignOut,
  customerUpdateMe as apiCustomerUpdateMe,
  getMe as apiGetMe,
  createCart,
  customerChangeMyPassword as apiCustomerChangeMyPassword,
  isTokenUserSession
} from '@vue-storefront/commercetools-api';
import { setCart } from '../useCart';
import { setUser } from '../useUser';

const loadUser = async (context, customQuery?: CustomQuery) => {
  if (!isTokenUserSession(context.$vsfSettings, context.$vsfSettings.currentToken)) {
    return null;
  }

  try {
    const profile = await apiGetMe(context, { customer: true }, customQuery);
    return profile.data.me.customer;
  } catch (err) {
    const errorMessage = err?.graphQLErrors?.[0].message || err.message;

    if (errorMessage.includes('Resource Owner Password Credentials Grant')) {
      return null;
    }

    err.message = errorMessage;
    throw err;
  }
};

const getCurrentUser = async (settings, currentUser) => {
  if (!currentUser) {
    return loadUser(settings);
  }

  return currentUser;
};

export const params: UseUserFactoryParams<Customer, any, any> = {
  loadUser,
  logOut: async (context) => {
    await apiCustomerSignOut(context);
    const cartResponse = await createCart(context);
    setCart(cartResponse.data.cart);
  },
  updateUser: async (context, { currentUser, updatedUserData }) => {
    const loadedUser = await getCurrentUser(context.$vsfSettings, currentUser);
    const { user } = await apiCustomerUpdateMe(context, loadedUser, updatedUserData);
    setUser(user);

    return user;
  },
  register: async (context, {email, password, firstName, lastName}) => {
    const { customer, cart } = await authenticate(context, {email, password, firstName, lastName}, apiCustomerSignMeUp);
    setCart(cart);

    return customer;
  },
  logIn: async (context, { username, password }) => {
    const customerLogin = { email: username, password };
    const { customer, cart } = await authenticate(context, customerLogin, apiCustomerSignMeIn);
    setCart(cart);

    return customer;
  },
  changePassword: async function changePassword(context, { currentUser, currentPassword, newPassword }) {
    const loadedUser = await getCurrentUser(context.$vsfSettings, currentUser);
    const userResponse = await apiCustomerChangeMyPassword(context, loadedUser.version, currentPassword, newPassword);
    // we do need to re-authenticate user to acquire new token - otherwise all subsequent requests will fail as unauthorized
    await this.logOut(context);
    return await params.logIn(context, { username: userResponse.data.user.email, password: newPassword });
  }
};

