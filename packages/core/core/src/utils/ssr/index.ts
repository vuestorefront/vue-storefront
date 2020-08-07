import { Ref, ref } from '@vue/composition-api';
import { useSSR as defaultUseSSR, onSSR } from './default';

interface UseSSRValues {
  initialState: any;
  saveToInitialState: (value: any) => void;
}

type UseSSR = (key: string) => UseSSRValues;

interface SSRConfiguration {
  useSSR: UseSSR;
}

let useSSR = defaultUseSSR;

const configureSSR = (config: SSRConfiguration) => {
  useSSR = config.useSSR;
};

const vsfRef = <T = any>(param: T): Ref<T> => {
  try {
    const { ssrRef } = require('nuxt-composition-api');

    return ssrRef(param) as Ref<T>;
  } catch (e) {
    return ref(param) as Ref<T>;
  }
};

export {
  vsfRef,
  onSSR,
  configureSSR,
  useSSR
};
