import merge from 'lodash-es/merge';

interface FactoryParams<T> {
  defaultSettings: any;
  onSetup: (config: T) => void;
}

export function apiClientFactory<ALL_SETTINGS, CONFIGURABLE_SETTINGS>(factoryParams: FactoryParams<ALL_SETTINGS>) {
  let settings = { ...factoryParams.defaultSettings };
  let setupCalled = false;
  return {
    setup (config: ALL_SETTINGS) {
      settings = merge(factoryParams.defaultSettings, config);
      factoryParams.onSetup(settings);
      setupCalled = true;

      if (setupCalled) {
        console.warn(`
          [VSF core] commercetools-api/setup function is being called multiple times.
          If you want to update config, please use commercetools-api/update instead.
        `);
      }
    },
    update (config: CONFIGURABLE_SETTINGS) {
      settings = merge(settings, config);
      factoryParams.onSetup(settings);
    },
    getSettings: (): ALL_SETTINGS => Object.freeze({ ...settings })
  };
}
