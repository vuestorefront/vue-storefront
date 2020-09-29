import { Ref, computed } from '@vue/composition-api';
import { UseUser } from '../types';
import { sharedRef, Logger, mask } from '../utils';

export interface UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS> {
  loadUser: () => Promise<USER>;
  logOut: (params?: {currentUser?: USER}) => Promise<void>;
  updateUser: (params: {currentUser: USER; updatedUserData: UPDATE_USER_PARAMS}) => Promise<USER>;
  register: (params: REGISTER_USER_PARAMS) => Promise<USER>;
  logIn: (params: { username: string; password: string }) => Promise<USER>;
  changePassword: (params: {currentUser: USER; currentPassword: string; newPassword: string}) => Promise<USER>;
}

interface UseUserFactory<USER, UPDATE_USER_PARAMS> {
  useUser: () => UseUser<USER, UPDATE_USER_PARAMS>;
  setUser: (user: USER) => void;
}

export const useUserFactory = <USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS extends { email: string; password: string }>(
  factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS>
): UseUserFactory<USER, UPDATE_USER_PARAMS> => {

  const setUser = (newUser: USER) => {
    sharedRef('useUser-user').value = newUser;
    Logger.debug('useUserFactory.setUser', newUser);
  };

  const useUser = (): UseUser<USER, UPDATE_USER_PARAMS> => {
    const user: Ref<USER> = sharedRef(null, 'useUser-user');
    const loading: Ref<boolean> = sharedRef(false, 'useUser-loading');
    const isAuthenticated = computed(() => Boolean(user.value));

    const updateUser = async (params: UPDATE_USER_PARAMS) => {
      Logger.debug('useUserFactory.updateUser', params);

      loading.value = true;
      try {
        user.value = await factoryParams.updateUser({currentUser: user.value, updatedUserData: params});
      } catch (err) {
        Logger.error('useUserFactory.updateUser', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const register = async (registerUserData: REGISTER_USER_PARAMS) => {
      Logger.debug('useUserFactory.register', registerUserData);

      loading.value = true;
      try {
        user.value = await factoryParams.register(registerUserData);
      } catch (err) {
        Logger.error('useUserFactory.register', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const login = async (loginUserData: {
      username: string;
      password: string;
    }) => {
      Logger.debug('useUserFactory.login', loginUserData);

      loading.value = true;
      try {
        user.value = await factoryParams.logIn(loginUserData);
      } catch (err) {
        Logger.error('useUserFactory.login', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const logout = async () => {
      Logger.debug('useUserFactory.logout');

      try {
        await factoryParams.logOut();
        user.value = null;
      } catch (err) {
        Logger.error('useUserFactory.err');

        throw new Error(err);
      }
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
      Logger.debug('useUserFactory.changePassword', { currentPassword: mask(currentPassword), newPassword: mask(newPassword) });

      loading.value = true;
      try {
        user.value = await factoryParams.changePassword({currentUser: user.value, currentPassword, newPassword});
      } catch (err) {
        Logger.error('useUserFactory.changePassword', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserFactory.refreshUser');
      loading.value = true;

      try {
        user.value = await factoryParams.loadUser();
      } catch (err) {
        Logger.error('useUserFactory.refreshUser', err);

        throw new Error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      user: computed(() => user.value),
      updateUser,
      register,
      login,
      logout,
      isAuthenticated,
      changePassword,
      load,
      loading: computed(() => loading.value)
    };
  };

  return { useUser, setUser };
};
