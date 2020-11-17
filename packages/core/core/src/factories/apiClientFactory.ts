import merge from 'lodash-es/merge';
import { Logger } from './../utils';

interface FactoryParams<T> {
  tag: string;
  defaultSettings: any;
  onSetup: (config: T) => T;
}

const isNuxt = () => {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    return '$nuxt' in window;
  }

  // @ts-ignore
  return 'nuxt' in global.__VUE_SSR_CONTEXT__;
};

const getSettingsForNuxt = (tag) => {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    return window.$nuxt.context['$' + tag];
  }
  // @ts-ignore
  return global.__VUE_SSR_CONTEXT__.req['$' + tag];
};

export function apiClientFactory<ALL_SETTINGS, CONFIGURABLE_SETTINGS>(factoryParams: FactoryParams<ALL_SETTINGS>) {
  const tag = factoryParams.tag;
  let settingsMemory = { ...factoryParams.defaultSettings };
  let setupCalled = false;
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
    update (config: CONFIGURABLE_SETTINGS) {
      const mergedSettings = merge(factoryParams.defaultSettings, config);
      const settings = factoryParams.onSetup ? factoryParams.onSetup(mergedSettings as any) : mergedSettings;
      settingsMemory = { ...settings };

      Logger.debug('apiClientFactory.update', settings);

      return { settings, tag };
    },
    getSettings: (): ALL_SETTINGS => {
      if (isNuxt()) {
        return getSettingsForNuxt(tag);
      }

      return settingsMemory;
    }
  };
}
