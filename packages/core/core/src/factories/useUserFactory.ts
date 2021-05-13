import { Ref, computed } from '@vue/composition-api';
import { UseUser, Context, FactoryParams, UseUserErrors } from '../types';
import { sharedRef, Logger, mask, configureFactoryParams, createErrorHandler } from '../utils';

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
    const errorHandler = createErrorHandler<UseUserErrors>({
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

    const updateUser = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.updateUser', providedUser);
      errorHandler.clearAll();

      try {
        loading.value = true;
        user.value = await _factoryParams.updateUser({currentUser: user.value, updatedUserData: providedUser});
        errorHandler.clear('updateUser');
      } catch (err) {
        errorHandler.update('updateUser', err);
        Logger.error('useUser/updateUser', err);
      } finally {
        loading.value = false;
      }
    };

    const register = async ({ user: providedUser }) => {
      Logger.debug('useUserFactory.register', providedUser);
      errorHandler.clearAll();

      try {
        loading.value = true;
        user.value = await _factoryParams.register(providedUser);
        errorHandler.clear('register');
      } catch (err) {
        errorHandler.update('register', err);
        Logger.error('useUser/register', err);
      } finally {
        loading.value = false;
      }
    };

    const login = async ({ user: providedUser } = { user: null }) => {
      Logger.debug('useUserFactory.login', providedUser);
      errorHandler.clearAll();

      try {
        loading.value = true;
        user.value = await _factoryParams.logIn(providedUser);
        errorHandler.clear('login');
      } catch (err) {
        errorHandler.update('login', err);
        Logger.error('useUser/login', err);
      } finally {
        loading.value = false;
      }
    };

    const logout = async () => {
      Logger.debug('useUserFactory.logout');
      errorHandler.clearAll();

      try {
        await _factoryParams.logOut();
        errorHandler.clear('logout');
        user.value = null;
      } catch (err) {
        errorHandler.update('logout', err);
        Logger.error('useUser/logout', err);
      }
    };

    const changePassword = async (params) => {
      Logger.debug('useUserFactory.changePassword', { currentPassword: mask(params.current), newPassword: mask(params.new) });
      errorHandler.clearAll();

      try {
        loading.value = true;
        user.value = await _factoryParams.changePassword({
          currentUser: user.value,
          currentPassword: params.current,
          newPassword: params.new
        });
        errorHandler.clear('changePassword');
      } catch (err) {
        errorHandler.update('changePassword', err);
        Logger.error('useUser/changePassword', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async () => {
      Logger.debug('useUserFactory.load');
      errorHandler.clearAll();

      try {
        loading.value = true;
        user.value = await _factoryParams.load();
        errorHandler.clear('load');
      } catch (err) {
        errorHandler.update('load', err);
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
      error: errorHandler.getAll()
    };
  };
};
