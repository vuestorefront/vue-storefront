import { isServer } from '@vue-storefront/core/helpers'
import deviceLibrary from '../logic';

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'

export default ({
  config,
  ssrContext,
  app
}) => {
  let headersOrUserAgent
  if (isServer) {
    headersOrUserAgent = ssrContext.server.request.headers['user-agent'] || DEFAULT_USER_AGENT
  } else {
    headersOrUserAgent = window.navigator.userAgent || DEFAULT_USER_AGENT
  }
  if (config.device && config.device.appendToInstance && config.device.tests && config.device.tests.length) {
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
    app.$deviceRoot = deviceTests;
  }
}
