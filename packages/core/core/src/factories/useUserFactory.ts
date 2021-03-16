import { Ref, computed } from '@vue/composition-api';
import { UseUser, Context, FactoryParams, UseUserErrors } from '../types';
import { sharedRef, Logger, mask, configureFactoryParams } from '../utils';

export interface UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS> extends FactoryParams {
  load: (context: Context, params?: any) => Promise<USER>;
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
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseUserErrors> = sharedRef({
      updateUser: null,
      register: null,
      login: null,
      logout: null,
      changePassword: null,
      load: null
    }, 'useUser-error');

    const setUser = (newUser: USER) => {
      user.value = newUser;
      Logger.debug('useUserFactory.setUser', newUser);
    };

    const resetErrorValue = () => {
      error.value = {};
    };

    const updateUser = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.updateUser', providedUser);

      try {
        loading.value = true;
        user.value = await _factoryParams.updateUser({currentUser: user.value, updatedUserData: providedUser});
        error.value.updateUser = null;
      } catch (err) {
        error.value.updateUser = err;
        Logger.error('useUser/updateUser', err);
      } finally {
        loading.value = false;
      }
    };

    const register = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.register', providedUser);
      resetErrorValue();

      try {
        loading.value = true;
        user.value = await _factoryParams.register(providedUser);
        error.value.register = null;
      } catch (err) {
        error.value.register = err;
        Logger.error('useUser/register', err);
      } finally {
        loading.value = false;
      }
    };

    const login = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.login', providedUser);
      resetErrorValue();

      try {
        loading.value = true;
        user.value = await _factoryParams.logIn(providedUser);
        error.value.login = null;
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
        await _factoryParams.logOut();
        error.value.logout = null;
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
        user.value = await _factoryParams.changePassword({
          currentUser: user.value,
          currentPassword: params.current,
          newPassword: params.new
        });
        error.value.changePassword = null;
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
        user.value = await _factoryParams.load();
        error.value.load = null;
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
