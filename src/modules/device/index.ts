import { isServer } from '@vue-storefront/core/helpers/index';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import Vue from 'vue'

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'

export const DeviceModule: StorefrontModule = async function ({ app, appConfig }) {
  let headersOrUserAgent
  if (isServer) {
    headersOrUserAgent = Vue.prototype.$ssrRequestContext.userAgent || DEFAULT_USER_AGENT
  } else {
    headersOrUserAgent = window.navigator.userAgent || DEFAULT_USER_AGENT
  }

  if (appConfig.device && appConfig.device.appendToInstance && appConfig.device.tests && appConfig.device.tests.length) {
    const deviceLibrary: any = await import(/* webpackChunkName: "device" */ './logic')
    let userAgent = typeof headersOrUserAgent === 'string'
      ? headersOrUserAgent
      : headersOrUserAgent['user-agent']

    Vue.prototype.$device = deviceLibrary.default(userAgent, appConfig.device.tests)
    if (userAgent === 'Amazon CloudFront') {
      if (headersOrUserAgent['cloudfront-is-mobile-viewer'] === 'true') {
        Vue.prototype.$device.isMobile = true
        Vue.prototype.$device.isMobileOrTablet = true
      }
      if (headersOrUserAgent['cloudfront-is-tablet-viewer'] === 'true') {
        Vue.prototype.$device.isMobile = false
        Vue.prototype.$device.isMobileOrTablet = true
      }
    }
    (app as any).device = Vue.prototype.$device
  }
}
