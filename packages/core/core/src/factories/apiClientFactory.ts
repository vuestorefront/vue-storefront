export function apiClientFactory<API_CLIENT_METHODS, API_CLIENT_SETTINGS>(factoryParams: { defaultSettings; onSetup }) {
  let settings = { ...factoryParams.defaultSettings, overrides: {} };
  return {
    override (overrides: API_CLIENT_METHODS) {
      settings.overrides = { ...settings.overrides, ...overrides };
    },
    setup (config: API_CLIENT_SETTINGS) {
      settings = { ...factoryParams.defaultSettings, overrides: settings.overrides, ...config };
      factoryParams.onSetup(settings);
    },
    update (config: API_CLIENT_SETTINGS) {
      settings = { ...settings, ...config };
      factoryParams.onSetup(settings);
    },
    getSettings: (): API_CLIENT_SETTINGS => Object.freeze(settings)
  };
}
