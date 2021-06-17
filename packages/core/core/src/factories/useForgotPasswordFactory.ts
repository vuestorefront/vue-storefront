import { CustomQuery, Context, FactoryParams, UseForgotPasswordErrors, UseForgotPassword } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

interface SetNewPasswordParams {
  tokenValue: string;
  newPassword: string;
}

interface ResetPasswordParams {
  email: string;
}

export interface UseForgotPasswordFactoryParams<TOKEN, RESULT> extends FactoryParams {
  resetPassword: (context: Context, params: ResetPasswordParams & { customQuery?: CustomQuery }) => Promise<TOKEN>;
  setNewPassword: (context: Context, params: SetNewPasswordParams & { customQuery?: CustomQuery }) => Promise<RESULT>;
}

export function useForgotPasswordFactory<TOKEN, RESULT>(
  factoryParams: UseForgotPasswordFactoryParams<TOKEN, RESULT>
) {
  return function useForgotPassword(): UseForgotPassword<TOKEN, RESULT> {
    const result: Ref<RESULT> = sharedRef('', 'useForgotPassword-result');
    const token: Ref<TOKEN> = sharedRef('', 'useForgotPassword-token');
    const loading = sharedRef(false, 'useProduct-loading');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseForgotPasswordErrors> = sharedRef({
      result: null
    }, 'useForgotPassword-error');

    const reset = async (resetPasswordParams: ResetPasswordParams) => {
      Logger.debug('useForgotPassword/reset', resetPasswordParams.email);

      try {
        loading.value = true;
        token.value = await _factoryParams.resetPassword(resetPasswordParams);
        error.value.result = null;
      } catch (err) {
        error.value.result = err;
        Logger.error('useForgotPassword/reset', err);
      } finally {
        loading.value = false;
      }
    };

    const setNew = async (setNewPasswordParams: SetNewPasswordParams) => {
      Logger.debug('useForgotPassword/setNew');

      try {
        loading.value = true;
        result.value = await _factoryParams.setNewPassword(setNewPasswordParams);
        error.value.result = null;
      } catch (err) {
        error.value.result = err;
        Logger.debug('useForgotPassword/setNew', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      reset,
      setNew,
      result: computed(() => result.value),
      token: computed(() => token.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
