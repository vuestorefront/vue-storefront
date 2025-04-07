import Vue from 'vue';
import { GetterTree } from 'vuex';
import RootState from '@vue-storefront/core/types/RootState'

import BackendSettingsState from '../types/BackendSettingsState';

export const getters: GetterTree<BackendSettingsState, RootState> = {
  getSettingByCompositeKey: (state) => {
    return (compositeKey: string) => {
      if (Vue.prototype.$cacheTags) {
        Vue.prototype.$cacheTags.add(`settings`);
        Vue.prototype.$cacheTags.add(`settings_${compositeKey}`);
      }

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
