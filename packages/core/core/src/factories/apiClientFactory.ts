import merge from 'lodash-es/merge';
import { Logger } from './../utils';

interface FactoryParams<T> {
  tag: string;
  defaultSettings: any;
  onSetup: (config: T) => T;
}

export function apiClientFactory<ALL_SETTINGS, CONFIGURABLE_SETTINGS>(factoryParams: FactoryParams<ALL_SETTINGS>) {
  const tag = factoryParams.tag;

  let setupCalled = false;
  let settingsMemory = {};
  return {
    setup (config: ALL_SETTINGS) {
      const mergedSettings = merge(factoryParams.defaultSettings, config);
      const settings = factoryParams.onSetup ? factoryParams.onSetup(mergedSettings) : mergedSettings;
      settingsMemory = { ...settings };
      Logger.debug('apiClientFactory.setup', settings);

      // @ts-ignore
      if (setupCalled && __DEV__) {
        Logger.warn('"setup" function is being called multiple times. If you want to update config, please use "update" instead.');
      }
      setupCalled = true;

      return { settings, tag };
    },
    apiClientMethodFactory: (apiFunction) => {
      console.log('BINDING');
      const extendedFn = apiFunction.bind({ $vsf: { [tag]: settingsMemory } });
      extendedFn.raw = apiFunction;
      return extendedFn;
    },
    update (config: CONFIGURABLE_SETTINGS) {
      const mergedSettings = merge(factoryParams.defaultSettings, config);
      const settings = factoryParams.onSetup ? factoryParams.onSetup(mergedSettings) : mergedSettings;
      settingsMemory = { ...settings };

      Logger.debug('apiClientFactory.update', settings);

      return { settings, tag };
    },
    getSettings: (): ALL_SETTINGS => {
      console.log('DEPRECATED');
      return null;
    }
  };
}
