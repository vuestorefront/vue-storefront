import { ref, Ref, watch, computed } from '@vue/composition-api';
import { UseUser } from '@vue-storefront/interfaces';
import { Customer, CustomerSignMeUpDraft, CustomerSignMeInDraft } from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';
import {
  customerSignMeUp,
  customerSignMeIn,
  customerSignOut,
  getMe
} from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft

const user: Ref<Customer> = ref({});
const loading: Ref<boolean> = ref(false);
const error: Ref<any> = ref(null);
const isAuthenticated = computed(() => user.value && Object.keys(user.value).length > 0);

const authenticate = async (userData: UserData, fn) => {
  loading.value = true;
  error.value = null;
  try {
    const userResponse = await fn(userData);
    user.value = userResponse.data.user.customer;
    cart.value = userResponse.data.user.cart;
  } catch (err) {
    error.value = err.graphQLErrors ? err.graphQLErrors[0].message : err;
  }
  loading.value = false;
};

export default function useUser(): UseUser<Customer> {
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

  const register = async (userData) => {
    await authenticate(userData, customerSignMeUp);
  };

  const login = async (userData) => {
    const customerLoginDraft = { email: userData.username,
      password: userData.password };
    await authenticate(customerLoginDraft, customerSignMeIn);
  };

  const logout = async () => {
    customerSignOut();
    user.value = {} as Customer;
    cart.value = null;
  };

  return {
    user: computed(() => user.value),
    register,
    login,
    logout,
    isAuthenticated,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
}
