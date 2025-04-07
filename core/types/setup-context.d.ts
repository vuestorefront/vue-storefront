import { SetupContext } from '@vue/composition-api';
import { Context } from 'core/scripts/utils/types';

declare module '@vue/composition-api' {
  export interface SetupContext {
    ssrContext: Context
  }
}
