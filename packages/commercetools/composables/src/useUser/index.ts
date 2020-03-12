import { ref, Ref, watch, computed } from '@vue/composition-api';
import { UseUser } from '@vue-storefront/interfaces';
import {
  Customer,
  CustomerSignMeUpDraft,
  CustomerSignMeInDraft
} from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';
import {
  customerSignMeUp,
  customerSignMeIn,
  customerSignOut,
  getMe,
  customerChangeMyPassword
} from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft

const user: Ref<Customer> = ref({});
const loading: Ref<boolean> = ref(false);
const isAuthenticated = computed(() => user.value && Object.keys(user.value).length > 0);

const authenticate = async (userData: UserData, fn) => {
  loading.value = true;
  try {
    const userResponse = await fn(userData);
    user.value = userResponse.data.user.customer;
    cart.value = userResponse.data.user.cart;
  } catch (err) {
    console.error(err.graphQLErrors ? err.graphQLErrors[0].message : err);
  }
  loading.value = false;
};

export default function useUser(): UseUser<Customer, any> {

  watch(user, async () => {
    if (isAuthenticated.value) {
      return;
    }

    loading.value = true;

    try {
      const profile = await getMe({ customer: true });
      user.value = profile.data.me.customer;
    } catch (err) {} // eslint-disable-line

    loading.value = false;
  });

  const updateUser = async (params: any) => {
    console.log(params);
  };

  const register = async (userData) => {
    await authenticate(userData, customerSignMeUp);
  };

  const login = async ({ username, password }) => {
    const customerLoginDraft = { email: username, password };
    await authenticate(customerLoginDraft, customerSignMeIn);
  };

  const logout = async () => {
    customerSignOut();
    user.value = {} as Customer;
    cart.value = null;
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    loading.value = true;
    try {
      const userResponse = await customerChangeMyPassword(user.value.version, currentPassword, newPassword);
      // we do need to re-authenticate user to acquire new token - otherwise all subsequent requests will fail as unauthorized
      await logout();
      await authenticate({ email: userResponse.data.user.email, password: newPassword }, customerSignMeIn);
      user.value = userResponse.data.user;
    } catch (err) {
      console.error(err.graphQLErrors ? err.graphQLErrors[0].message : err);
    }
    loading.value = false;
  };

  return {
    user: computed(() => user.value),
    updateUser,
    register,
    login,
    logout,
    changePassword,
    isAuthenticated,
    loading: computed(() => loading.value)
  };
}
