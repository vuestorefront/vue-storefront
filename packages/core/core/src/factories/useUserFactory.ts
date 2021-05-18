import { Ref, computed, UnwrapRef, reactive } from '@vue/composition-api';
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
    const errorsFactory = (): UseUserErrors => ({
      updateUser: null,
      register: null,
      login: null,
      logout: null,
      changePassword: null,
      load: null
    });

    const user: Ref<USER> = sharedRef(null, 'useUser-user');
    const loading: Ref<boolean> = sharedRef(false, 'useUser-loading');
    const isAuthenticated = computed(() => Boolean(user.value));
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: UnwrapRef<UseUserErrors> = reactive(errorsFactory());

    const setUser = (newUser: USER) => {
      user.value = newUser;
      Logger.debug('useUserFactory.setUser', newUser);
    };

    const resetErrorValue = () => {
      error.updateUser = null;
      error.register = null;
      error.login = null;
      error.logout = null;
      error.changePassword = null;
      error.load = null;
    };

    const updateUser = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.updateUser', providedUser);
      resetErrorValue();

      try {
        loading.value = true;
        user.value = await _factoryParams.updateUser({currentUser: user.value, updatedUserData: providedUser});
        error.updateUser = null;
      } catch (err) {
        error.updateUser = err;
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
        error.register = null;
      } catch (err) {
        error.register = err;
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
        error.login = null;
      } catch (err) {
        error.login = err;
        Logger.error('useUser/login', err);
      } finally {
        loading.value = false;
      }
    };

    const logout = async () => {
      Logger.debug('useUserFactory.logout');
      resetErrorValue();

      try {
        await _factoryParams.logOut();
        error.logout = null;
        user.value = null;
      } catch (err) {
        error.logout = err;
        Logger.error('useUser/logout', err);
      }
    };

    const changePassword = async (params) => {
      Logger.debug('useUserFactory.changePassword', { currentPassword: mask(params.current), newPassword: mask(params.new) });
      resetErrorValue();

      try {
        loading.value = true;
        user.value = await _factoryParams.changePassword({
          currentUser: user.value,
          currentPassword: params.current,
          newPassword: params.new
        });
        error.changePassword = null;
      } catch (err) {
        error.changePassword = err;
        Logger.error('useUser/changePassword', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserFactory.load');
      resetErrorValue();

      try {
        loading.value = true;
        user.value = await _factoryParams.load();
        error.load = null;
      } catch (err) {
        error.load = err;
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
      error: computed(() => error)
    };
  };
};
