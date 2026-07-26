import { Component, VueConstructor } from 'vue';
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils';

import {
  ApplicationServices,
  createApplicationServiceProviders
} from '@vue-storefront/core/application-services';

export function mountWithApplicationServices<V extends Vue> (
  component: Component | VueConstructor<V>,
  services: ApplicationServices,
  mountOptions: MountOptions<V> = {}
): Wrapper<V> {
  return mount(component as VueConstructor<V>, {
    ...mountOptions,
    provide: {
      ...createApplicationServiceProviders(services),
      ...(mountOptions.provide || {})
    }
  });
}
