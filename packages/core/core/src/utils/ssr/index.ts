import { onServerPrefetch, ref, Ref } from '@vue/composition-api';

type SsrRef = <T>(data?: T, key?: string) => Ref<T>;

interface SSRConfiguration {
  onSSR: (fn: () => void) => void;
  ssrRef: SsrRef;
}

let onSSR = onServerPrefetch;
let ssrRef: SsrRef = ref;

const configureSSR = (config: SSRConfiguration) => {
  onSSR = config.onSSR || onSSR;
  ssrRef = config.ssrRef || ssrRef as any;
};

export {
  onSSR,
  ssrRef,
  configureSSR
};
