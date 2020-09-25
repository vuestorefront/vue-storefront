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
  getSettings,
  isTokenUserSession
} from '@vue-storefront/commercetools-api';
import { setCart } from '../useCart';
import { setUser } from '../useUser';

const loadUser = async (customQuery?: CustomQuery) => {
  const settings = getSettings();

  if (!isTokenUserSession(settings.currentToken)) {
    return null;
  }

  try {
    const profile = await apiGetMe({ customer: true }, customQuery);
    return profile.data.me.customer;
  } catch (err) {
    const error = err.graphQLErrors ? err.graphQLErrors[0].message : err.message;
    if (error.includes('Resource Owner Password Credentials Grant')) {
      return null;
    }
    throw new Error(error);
  }
};

const getCurrentUser = async (currentUser) => {
  if (!currentUser) {
    return loadUser();
  }

  return currentUser;
};

export const params: UseUserFactoryParams<Customer, any, any> = {
  loadUser,
  logOut: async () => {
    await apiCustomerSignOut();
    const cartResponse = await createCart();
    setCart(cartResponse.data.cart);
  },
  updateUser: async ({ currentUser, updatedUserData }) => {
    const loadedUser = await getCurrentUser(currentUser);
    const { user } = await apiCustomerUpdateMe(loadedUser, updatedUserData);
    setUser(user);

    return user;
  },
  register: async ({email, password, firstName, lastName}) => {
    const { customer, cart } = await authenticate({email, password, firstName, lastName}, apiCustomerSignMeUp);
    setCart(cart);

    return customer;
  },
  logIn: async ({ username, password }) => {
    const customerLogin = { email: username, password };
    const { customer, cart } = await authenticate(customerLogin, apiCustomerSignMeIn);
    setCart(cart);

    return customer;
  },
  changePassword: async function changePassword({currentUser, currentPassword, newPassword}) {
    try {
      const loadedUser = await getCurrentUser(currentUser);
      const userResponse = await apiCustomerChangeMyPassword(loadedUser.version, currentPassword, newPassword);
      // we do need to re-authenticate user to acquire new token - otherwise all subsequent requests will fail as unauthorized
      await this.logOut();
      const userLogged = await authenticate({ email: userResponse.data.user.email, password: newPassword }, apiCustomerSignMeIn);
      return userLogged.value;
    } catch (err) {
      console.error(err.graphQLErrors ? err.graphQLErrors[0].message : err);
    }
  }
};

