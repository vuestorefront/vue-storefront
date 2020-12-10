import { isServer } from '@vue-storefront/core/helpers'
import deviceLibrary from '../logic';

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'

interface DeviceTests {
  isMobile?: boolean,
  isMobileOrTablet?: boolean,
  isTablet?: boolean,
  isDesktop?: boolean,
  isDesktopOrTablet?: boolean,
  isIos?: boolean,
  isWindows?: boolean,
  isMacOS?: boolean
};

export const createDeviceTests = ({
  config,
  ssrContext
}): DeviceTests => {
  let headersOrUserAgent
  if (isServer) {
    headersOrUserAgent = ssrContext.server.request.headers['user-agent'] || DEFAULT_USER_AGENT
  } else {
    headersOrUserAgent = window.navigator.userAgent || DEFAULT_USER_AGENT
  }
  if (config.device.tests && config.device.tests.length) {
    let userAgent = typeof headersOrUserAgent === 'string'
      ? headersOrUserAgent
      : headersOrUserAgent['user-agent']

    const deviceTests = deviceLibrary(userAgent, config.device.tests)
    if (userAgent === 'Amazon CloudFront') {
      if (headersOrUserAgent['cloudfront-is-mobile-viewer'] === 'true') {
        deviceTests.isMobile = true
        deviceTests.isMobileOrTablet = true
      }
      if (headersOrUserAgent['cloudfront-is-tablet-viewer'] === 'true') {
        deviceTests.isMobile = false
        deviceTests.isMobileOrTablet = true
      }
    }
    return deviceTests;
  }
  return {};
}
