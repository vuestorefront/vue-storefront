import Vue from 'vue';

import {
  injectReferences,
  registerApplicationModule,
  registerModule,
  StorefrontModule,
  StorefrontModuleServices
} from '@vue-storefront/core/lib/modules';

const injectApplication = (
  app: Vue,
  services: StorefrontModuleServices
): void => {
  injectReferences(
    app,
    Object.create(null),
    Object.create(null),
    {},
    services
  );
};

const createServices = (): StorefrontModuleServices => ({
  head: Object.create(null),
  additionalContent: Object.create(null),
  request: Object.create(null)
});

describe('storefront module registration scopes', () => {
  it('keeps global modules registered once across applications', () => {
    const storefrontModule = jest.fn() as StorefrontModule;

    injectApplication(new Vue(), createServices());
    registerModule(storefrontModule);
    injectApplication(new Vue(), createServices());
    registerModule(storefrontModule);

    expect(storefrontModule).toHaveBeenCalledTimes(1);
  });

  it('registers application-scoped modules once for each application', () => {
    const firstServices = createServices();
    const secondServices = createServices();
    const receivedServices: StorefrontModuleServices[] = [];
    const storefrontModule: StorefrontModule = ({ services }) => {
      receivedServices.push(services);
    };
    const firstApp = new Vue();

    injectApplication(firstApp, firstServices);
    registerApplicationModule(storefrontModule);
    registerApplicationModule(storefrontModule);

    injectApplication(new Vue(), secondServices);
    registerApplicationModule(storefrontModule);

    expect(receivedServices).toEqual([firstServices, secondServices]);
  });
});
