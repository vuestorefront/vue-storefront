import { GetterTree } from 'vuex';
import RootState from '@vue-storefront/core/types/RootState'

import BackendSettingsState from '../types/BackendSettingsState';

export const getters: GetterTree<BackendSettingsState, RootState> = {
  getSettingByCompositeKey: (state) => {
    return (compositeKey: string) => {
      const keyParts = compositeKey.split('/');
      let result = state.settings;

      keyParts.forEach((key) => {
        result = result[key];
      });

      return result;
    }
  }
}
