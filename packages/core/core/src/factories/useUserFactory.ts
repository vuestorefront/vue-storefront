import { Ref, computed } from '@vue/composition-api';
import { UseUser, Context, FactoryParams } from '../types';
import { sharedRef, Logger, mask, generateContext } from '../utils';
import { markMethodDeprecated } from '../helpers';

export interface UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS> extends FactoryParams {
  loadUser?: (context: Context, params?: {}) => Promise<USER>;
  load?: (context: Context, params?: {}) => Promise<USER>;
  logOut: (context: Context, params?: {currentUser?: USER}) => Promise<void>;
  updateUser: (context: Context, params: {currentUser: USER; updatedUserData: UPDATE_USER_PARAMS}) => Promise<USER>;
  register: (context: Context, params: REGISTER_USER_PARAMS) => Promise<USER>;
  logIn: (context: Context, params: { username: string; password: string }) => Promise<USER>;
  changePassword: (context: Context, params: {currentUser: USER; currentPassword: string; newPassword: string}) => Promise<USER>;
}

interface UseUserFactory<USER, UPDATE_USER_PARAMS> {
  useUser: () => UseUser<USER, UPDATE_USER_PARAMS>;
}

export const useUserFactory = <USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS extends { email: string; password: string }>(
  factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS>
): UseUserFactory<USER, UPDATE_USER_PARAMS> => {

  const useUser = (): UseUser<USER, UPDATE_USER_PARAMS> => {
    const user: Ref<USER> = sharedRef(null, 'useUser-user');
    const loading: Ref<boolean> = sharedRef(false, 'useUser-loading');
    const isAuthenticated = computed(() => Boolean(user.value));
    const context = generateContext(factoryParams);

    const setUser = (newUser: USER) => {
      user.value = newUser;
      Logger.debug('useUserFactory.setUser', newUser);
    };

    const updateUser = async (params: UPDATE_USER_PARAMS) => {
      Logger.debug('useUserFactory.updateUser', params);

      loading.value = true;
      try {
        user.value = await factoryParams.updateUser(context, {currentUser: user.value, updatedUserData: params});
      } catch (err) {
        Logger.error('useUserFactory.updateUser', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const register = async (registerUserData: REGISTER_USER_PARAMS) => {
      Logger.debug('useUserFactory.register', registerUserData);

      loading.value = true;
      try {
        user.value = await factoryParams.register(context, registerUserData);
      } catch (err) {
        Logger.error('useUserFactory.register', err);

        throw err;
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
        user.value = await factoryParams.logIn(context, loginUserData);
      } catch (err) {
        Logger.error('useUserFactory.login', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const logout = async () => {
      Logger.debug('useUserFactory.logout');

      try {
        await factoryParams.logOut(context);
        user.value = null;
      } catch (err) {
        Logger.error('useUserFactory.err');

        throw err;
      }
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
      Logger.debug('useUserFactory.changePassword', { currentPassword: mask(currentPassword), newPassword: mask(newPassword) });

      loading.value = true;
      try {
        user.value = await factoryParams.changePassword(context, {currentUser: user.value, currentPassword, newPassword});
      } catch (err) {
        Logger.error('useUserFactory.changePassword', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserFactory.load');
      loading.value = true;

      try {
        user.value = await markMethodDeprecated(
          '\'loadUser\' is deprecated, use \'load\' in your integration instead',
          factoryParams.load,
          factoryParams.loadUser
        )(context);
      } catch (err) {
        Logger.error('useUserFactory.load', err);

        throw err;
      } finally {
        loading.value = false;
      }
    };

    return {
      setUser,
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

  return { useUser };
};
