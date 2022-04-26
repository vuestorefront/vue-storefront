import { GetterTree } from 'vuex';
import RootState from '@vue-storefront/core/types/RootState'

import BackendSettingsState from '../types/BackendSettingsState';

export const getters: GetterTree<BackendSettingsState, RootState> = {
  getSettingByCompositeKey: (state) => {
    return (compositeKey: string) => {
      const keyParts = compositeKey.split('/');
      let result = state.settings;

      for (const key of keyParts) {
        if (!result) {
          break;
        }

        result = result[key];
      }

      return result;
    }
  }
}
