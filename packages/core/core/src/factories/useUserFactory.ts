import { Ref, computed } from '@vue/composition-api';
import { UseUser, Context, FactoryParams, ComposableErrors } from '../types';
import { sharedRef, Logger, mask, generateContext } from '../utils';

export interface UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS> extends FactoryParams {
  load: (context: Context, params?: {}) => Promise<USER>;
  logOut: (context: Context, params?: {currentUser?: USER}) => Promise<void>;
  updateUser: (context: Context, params: {currentUser: USER; updatedUserData: UPDATE_USER_PARAMS}) => Promise<USER>;
  register: (context: Context, params: REGISTER_USER_PARAMS) => Promise<USER>;
  logIn: (context: Context, params: { username: string; password: string }) => Promise<USER>;
  changePassword: (context: Context, params: {currentUser: USER; currentPassword: string; newPassword: string}) => Promise<USER>;
}

export const useUserFactory = <USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS extends { email: string; password: string }>(
  factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS>
) => {

  return function useUser (): UseUser<USER, UPDATE_USER_PARAMS> {
    const user: Ref<USER> = sharedRef(null, 'useUser-user');
    const loading: Ref<boolean> = sharedRef(false, 'useUser-loading');
    const isAuthenticated = computed(() => Boolean(user.value));
    const context = generateContext(factoryParams);
    const error: Ref<ComposableErrors> = sharedRef({}, 'useUser-error');

    const setUser = (newUser: USER) => {
      user.value = newUser;
      Logger.debug('useUserFactory.setUser', newUser);
    };

    const updateUser = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.updateUser', providedUser);

      try {
        loading.value = true;
        error.value.updateUser = null;
        user.value = await factoryParams.updateUser(context, {currentUser: user.value, updatedUserData: providedUser});
      } catch (err) {
        error.value.updateUser = err;
        Logger.error('useUser/updateUser', err);
      } finally {
        loading.value = false;
      }
    };

    const register = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.register', providedUser);

      try {
        loading.value = true;
        error.value.register = null;
        user.value = await factoryParams.register(context, providedUser);
      } catch (err) {
        error.value.register = err;
        Logger.error('useUser/register', err);
      } finally {
        loading.value = false;
      }
    };

    const login = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.login', providedUser);

      try {
        loading.value = true;
        error.value.login = null;
        user.value = await factoryParams.logIn(context, providedUser);
      } catch (err) {
        error.value.login = err;
        Logger.error('useUser/login', err);
      } finally {
        loading.value = false;
      }
    };

    const logout = async () => {
      Logger.debug('useUserFactory.logout');

      try {
        error.value.logout = null;
        await factoryParams.logOut(context);
        user.value = null;
      } catch (err) {
        error.value.logout = err;
        Logger.error('useUser/logout', err);
      }
    };

    const changePassword = async (params) => {
      Logger.debug('useUserFactory.changePassword', { currentPassword: mask(params.current), newPassword: mask(params.new) });

      try {
        loading.value = true;
        error.value.changePassword = null;
        user.value = await factoryParams.changePassword(context, {
          currentUser: user.value,
          currentPassword: params.current,
          newPassword: params.new
        });
      } catch (err) {
        error.value.changePassword = err;
        Logger.error('useUser/changePassword', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserFactory.load');

      try {
        loading.value = true;
        error.value.load = null;
        user.value = await factoryParams.load(context);
      } catch (err) {
        error.value.load = err;
        Logger.error('useUser/load', err);
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
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
};
