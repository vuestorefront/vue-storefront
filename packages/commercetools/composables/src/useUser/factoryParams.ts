import { CustomQuery, UseUserFactoryParams } from '@vue-storefront/core';
import { Customer } from '../types/GraphQL';
import { authenticate } from './authenticate';
import {
  customerSignMeUp,
  customerSignMeIn,
  customerSignOut,
  customerUpdateMe,
  getMe,
  createCart,
  customerChangeMyPassword,
  isTokenUserSession
} from '@vue-storefront/commercetools-api';
import { setCart } from '../useCart';
import { setUser } from '../useUser';

const getCurrentUser = async (scopedLoadUser, currentUser) => {
  if (!currentUser) {
    return scopedLoadUser();
  }

  return currentUser;
};

export const params: UseUserFactoryParams<Customer, any, any, any> = {
  async loadUser(customQuery?: CustomQuery) {
    if (!isTokenUserSession(this.$vsf.ct, this.$vsf.ct.currentToken)) {
      return null;
    }

    try {
      const profile = await this.api.getMe({ customer: true }, customQuery);
      return profile.data.me.customer;
    } catch (err) {
      const errorMessage = err?.graphQLErrors?.[0].message || err.message;

      if (errorMessage.includes('Resource Owner Password Credentials Grant')) {
        return null;
      }

      err.message = errorMessage;
      throw err;
    }
  },
  async logOut() {
    await this.api.customerSignOut();
    const cartResponse = await this.api.createCart();
    setCart(cartResponse.data.cart);
  },
  async updateUser({ currentUser, updatedUserData }) {
    const loadedUser = await getCurrentUser(this.loadedUser, currentUser);
    const { user } = await this.api.customerUpdateMe(loadedUser, updatedUserData);
    setUser(user);

    return user;
  },
  async register({email, password, firstName, lastName}) {
    const { customer, cart } = await authenticate({email, password, firstName, lastName}, this.api.customerSignMeUp);
    setCart(cart);

    return customer;
  },
  async logIn({ username, password }) {
    const customerLogin = { email: username, password };
    const { customer, cart } = await authenticate(customerLogin, this.api.customerSignMeIn);
    setCart(cart);

    return customer;
  },
  async changePassword({ currentUser, currentPassword, newPassword }) {
    const loadedUser = await getCurrentUser(this.loadedUser, currentUser);
    const userResponse = await this.api.customerChangeMyPassword(loadedUser.version, currentPassword, newPassword);
    // we do need to re-authenticate user to acquire new token - otherwise all subsequent requests will fail as unauthorized
    await this.logOut();
    return await params.logIn({ username: userResponse.data.user.email, password: newPassword });
  },
  api: {
    customerSignMeUp,
    customerSignMeIn,
    customerSignOut,
    customerUpdateMe,
    getMe,
    createCart,
    customerChangeMyPassword
  }
};

