import { GetterTree } from 'vuex';

import BackendSettingsState from '../types/BackendSettingsState';

export const getters: GetterTree<BackendSettingsState, any> = {
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
