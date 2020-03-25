import { ref, Ref, computed } from '@vue/composition-api';
import { UseUser } from '@vue-storefront/interfaces';

export type UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS> = {
  loadUser: () => Promise<USER>;
  logOut: (params?: {currentUser?: USER}) => Promise<void>;
  updateUser: (params: {currentUser: USER; updatedUserData: UPDATE_USER_PARAMS}) => Promise<USER>;
  register: (params: REGISTER_USER_PARAMS) => Promise<USER>;
  logIn: (params: { username: string; password: string }) => Promise<USER>;
  changePassword: (params: {currentUser: USER; currentPassword: string; newPassword: string}) => Promise<USER>;
};

export function useUserFactory<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS extends { email: string; password: string }>(
  factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS>
) {
  const user: Ref<USER> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const isAuthenticated = computed(
    () => user.value && Object.keys(user.value).length > 0
  );

  return function useUser(): UseUser<USER, UPDATE_USER_PARAMS> {
    const updateUser = async (params: UPDATE_USER_PARAMS) => {
      loading.value = true;
      try {
        user.value = await factoryParams.updateUser({currentUser: user.value, updatedUserData: params});
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const register = async (registerUserData: REGISTER_USER_PARAMS) => {
      loading.value = true;
      try {
        user.value = await factoryParams.register(registerUserData);
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const login = async (loginUserData: {
      username: string;
      password: string;
    }) => {
      loading.value = true;
      try {
        user.value = await factoryParams.logIn(loginUserData);
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const logout = async () => {
      try {
        await factoryParams.logOut();
        user.value = {} as USER;
      } catch (err) {
        throw new Error(err);
      }
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
      loading.value = true;
      try {
        user.value = await factoryParams.changePassword({currentUser: user.value, currentPassword, newPassword});
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const refreshUser = async () => {
      loading.value = true;
      try {
        user.value = await factoryParams.loadUser();
      } catch (err) {
        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    refreshUser();

    return {
      user: computed(() => user.value),
      updateUser,
      register,
      login,
      logout,
      isAuthenticated,
      changePassword,
      refreshUser,
      loading: computed(() => loading.value)
    };
  };
}
