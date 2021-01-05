import { UseUserFactoryParams, Context, UseCart, AgnosticCoupon } from '@vue-storefront/core';
import { Cart, Customer, LineItem, ProductVariant } from '../types/GraphQL';
import { authenticate } from './authenticate';
import useCart from '../useCart';

type UserContext = UseCart<Cart, LineItem, ProductVariant, AgnosticCoupon> & Context;

const load = async (context: Context) => {

  const isGuest = await context.$ct.api.isGuest();
  console.log({ isGuest });
  if (isGuest) {
    return null;
  }

  const profile = await context.$ct.api.getMe({ customer: true });
  return profile.data.me.customer;
};

const getCurrentUser = async (context: Context, currentUser) => {
  if (!currentUser) {
    return load(context);
  }

  return currentUser;
};

export const params: UseUserFactoryParams<Customer, any, any> = {
  provide() {
    return useCart();
  },
  load,
  logOut: async (context: UserContext) => {
    await context.$ct.api.customerSignOut();
    context.setCart(null);
  },
  updateUser: async (context: UserContext, { currentUser, updatedUserData }) => {
    const loadedUser = await getCurrentUser(context, currentUser);
    const { user } = await context.$ct.api.customerUpdateMe(loadedUser, updatedUserData);

    return user;
  },
  register: async (context: UserContext, { email, password, firstName, lastName }) => {
    const { customer, cart } = await authenticate({email, password, firstName, lastName}, context.$ct.api.customerSignMeUp);
    context.setCart(cart);

    return customer;
  },
  logIn: async (context: UserContext, { username, password }) => {
    const customerLogin = { email: username, password };
    const { customer, cart } = await authenticate(customerLogin, context.$ct.api.customerSignMeIn);
    context.setCart(cart);

    return customer;
  },
  changePassword: async function changePassword(context: UserContext, { currentUser, currentPassword, newPassword }) {
    const loadedUser = await getCurrentUser(context, currentUser);
    const userResponse = await context.$ct.api.customerChangeMyPassword(loadedUser.version, currentPassword, newPassword);
    // we do need to re-authenticate user to acquire new token - otherwise all subsequent requests will fail as unauthorized
    await this.logOut(context);
    return await params.logIn(context, { username: userResponse.data.user.email, password: newPassword });
  }
};

