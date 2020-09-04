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

      // @ts-ignore
      if (setupCalled && __DEV__) {
        console.warn('[VSF core] "setup" function is being called multiple times. If you want to update config, please use "update" instead.');
      }
      setupCalled = true;
    },
    update (config: CONFIGURABLE_SETTINGS) {
      settings = merge(settings, config);
      factoryParams.onSetup(settings);
    },
    getSettings: (): ALL_SETTINGS => Object.freeze({ ...settings })
  };
}
