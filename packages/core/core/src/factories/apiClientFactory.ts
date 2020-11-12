import merge from 'lodash-es/merge';
import { Logger, useContext } from './../utils';

interface FactoryParams<T> {
  defaultSettings: any;
  onSetup: (config: T) => void;
}

export function apiClientFactory<ALL_SETTINGS, CONFIGURABLE_SETTINGS>(factoryParams: FactoryParams<ALL_SETTINGS>) {
  let setupCalled = false;
  return {
    setup (config: ALL_SETTINGS) {
      const mergedSettings = merge(factoryParams.defaultSettings, config);
      const settings = factoryParams.onSetup ? factoryParams.onSetup(mergedSettings) : mergedSettings;

      Logger.debug('apiClientFactory.setup', settings);

      // @ts-ignore
      if (setupCalled && __DEV__) {
        Logger.warn('"setup" function is being called multiple times. If you want to update config, please use "update" instead.');
      }
      setupCalled = true;

      return settings;
    },
    update (config: CONFIGURABLE_SETTINGS) {
      const mergedSettings = merge(factoryParams.defaultSettings, config);
      const settings = factoryParams.onSetup ? factoryParams.onSetup(mergedSettings) : mergedSettings;

      Logger.debug('apiClientFactory.update', settings);

      return settings;
    },
    getSettings: (): ALL_SETTINGS => {
      const context = useContext();
      // @ts-ignore
      console.log('context reading');
      // @ts-ignore
      return context.$vsfSettings;
    }
  };
}
