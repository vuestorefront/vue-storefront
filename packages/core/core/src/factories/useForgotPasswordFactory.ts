import { CustomQuery, Context, FactoryParams, UseForgotPasswordErrors, UseForgotPassword } from '../types';
import { Ref, computed } from '@nuxtjs/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

interface SetNewPasswordParams {
  tokenValue: string;
  newPassword: string;
}

interface ResetPasswordParams {
  email: string;
}

export interface UseForgotPasswordFactoryParams<RESULT> extends FactoryParams {
  resetPassword: (context: Context, params: ResetPasswordParams & { currentResult: RESULT, customQuery?: CustomQuery }) => Promise<RESULT>;
  setNewPassword: (context: Context, params: SetNewPasswordParams & { currentResult: RESULT, customQuery?: CustomQuery }) => Promise<RESULT>;
}

export function useForgotPasswordFactory<RESULT>(
  factoryParams: UseForgotPasswordFactoryParams<RESULT>
) {
  return function useForgotPassword(): UseForgotPassword<RESULT> {
    const result: Ref<RESULT> = sharedRef({
      resetPasswordResult: null,
      setNewPasswordResult: null
    }, 'useForgotPassword-result');
    const loading = sharedRef(false, 'useProduct-loading');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseForgotPasswordErrors> = sharedRef({
      request: null,
      setNew: null
    }, 'useForgotPassword-error');

    const request = async (resetPasswordParams: ResetPasswordParams) => {
      Logger.debug('useForgotPassword/request', resetPasswordParams.email);

      try {
        loading.value = true;
        result.value = await _factoryParams.resetPassword({ currentResult: result.value, ...resetPasswordParams });
        error.value.request = null;
      } catch (err) {
        error.value.request = err;
        Logger.error('useForgotPassword/request', err);
      } finally {
        loading.value = false;
      }
    };

    const setNew = async (setNewPasswordParams: SetNewPasswordParams) => {
      Logger.debug('useForgotPassword/setNew', setNewPasswordParams);

      try {
        loading.value = true;
        result.value = await _factoryParams.setNewPassword({ currentResult: result.value, ...setNewPasswordParams });
        error.value.setNew = null;
      } catch (err) {
        error.value.setNew = err;
        Logger.error('useForgotPassword/setNew', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      request,
      setNew,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
