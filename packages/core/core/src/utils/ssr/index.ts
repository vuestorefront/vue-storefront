import { onServerPrefetch, ref, Ref } from '@vue/composition-api';

type VsfRef = <T>(data?: T, key?: string) => Ref<T>;

interface SSRConfiguration {
  onSSR: (fn: () => void) => void;
  vsfRef: VsfRef;
}

let onSSR = onServerPrefetch;
let vsfRef: VsfRef = ref;

const configureSSR = (config: SSRConfiguration) => {
  onSSR = config.onSSR || onSSR;
  vsfRef = config.vsfRef || vsfRef as any;
};

export {
  onSSR,
  vsfRef,
  configureSSR
};
