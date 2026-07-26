import { inject, InjectionKey } from 'vue';

export function injectRequired<T> (
  key: InjectionKey<T>,
  serviceName: string
): T {
  const service = inject(key, undefined);

  if (service === undefined) {
    throw new Error(
      `Missing application service provider: ${serviceName}.`
    );
  }

  return service;
}
