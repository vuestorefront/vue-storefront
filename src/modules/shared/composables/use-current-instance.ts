import Vue, { getCurrentInstance } from 'vue';

export type CurrentPublicInstance = Vue;

export function useCurrentInstance (): CurrentPublicInstance {
  const instance = getCurrentInstance();
  const publicInstance = instance?.proxy as CurrentPublicInstance | undefined;

  if (!publicInstance) {
    throw new Error(
      'useCurrentInstance() must be called during component setup.'
    );
  }

  return publicInstance;
}

export function useRootInstance (): CurrentPublicInstance {
  return useCurrentInstance().$root;
}
