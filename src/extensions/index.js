// if you need to have BABEL applied to extensions inside node_modules
// (by default excluded from BABEL) please add ".js" file ext inside require

// EXTENSIONS ARE DEPRECIATED, use modules instead
import Vue from 'vue'
const extensionList = []
extensionList.push(require('@vue-storefront/extension-magento2-cms/index.js'))
extensionList.push(require('@vue-storefront/raw-output-example/index.js'))
extensionList.push(require('@vue-storefront/extension-payment-backend-methods/index.js'))
if (Vue.prototype.$isServer) { // extensions that are not required in the SSR mode
  extensionList.push(require('@vue-storefront/amp-renderer/index.js')) // amp renderer is required just in SSR
}
export default extensionList
