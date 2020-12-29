import { createDeviceTests } from './createDeviceTests';

export const injectDeviceTests = ({
  app,
  config,
  ssrContext
}) => {
  if (config.device && config.device.appendToInstance) {
    app.$deviceRoot = createDeviceTests({
      config,
      ssrContext
    })
  }
}
