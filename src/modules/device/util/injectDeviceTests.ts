import { createDeviceTests } from './createDeviceTests';

export const injectDeviceTests = ({
  app,
  config,
  ssrContext
}) => {
  app.$deviceRoot = createDeviceTests({
    config,
    ssrContext
  })
}
