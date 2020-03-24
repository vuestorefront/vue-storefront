import { computed, Ref } from '@vue/composition-api';
import wrap from '../wrap';

interface Getters {
  [key: string]: (param: unknown, ...args: any) => Readonly<Ref<Readonly<unknown>>>;
}
export default function makeComputedGetters (getters: any): Getters {
  return Object.assign({}, ...Object.keys(getters).map(getterName => {
    return {
      // eslint-disable-next-line no-undef
      [getterName]: (param: unknown, ...args: any) => computed(() => getters[getterName](wrap(param).value, ...args))
    };
  }));
}
