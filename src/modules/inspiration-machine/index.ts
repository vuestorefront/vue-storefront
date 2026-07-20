import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { inspirationMachineStore } from './store';
import * as actions from './types/action';
import * as getters from './types/getter';
import { SelectableItem } from './types/selectable-item.interface';
import { SN_INSPIRATION_MACHINE } from './types/store-name';
import { Theme } from './types/theme.interface';

import InspirationMachineCharacterStep from './components/character-step.vue';
import InspirationMachineDownloadGuideStep from './components/download-guide-step.vue';
import InspirationMachineDownloadKit from './components/download-kit.vue';
import InspirationMachineExtrasStep from './components/extras-step.vue';
import InspirationMachineThemeStep from './components/theme-step.vue';

export const InspirationMachineModule: StorefrontModule = async function ({ store }) {
  store.registerModule(SN_INSPIRATION_MACHINE, inspirationMachineStore);
}

export {
  SN_INSPIRATION_MACHINE,
  actions,
  getters,
  InspirationMachineCharacterStep,
  InspirationMachineDownloadGuideStep,
  InspirationMachineDownloadKit,
  InspirationMachineExtrasStep,
  InspirationMachineThemeStep
}

export type {
  SelectableItem,
  Theme
}
