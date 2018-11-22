// if you need to have BABEL applied to extensions inside node_modules
// (by default excluded from BABEL) please add ".js" file ext inside require

// EXTENSIONS ARE DEPRECIATED, use modules instead
const extensionList = []
extensionList.push(require('@vue-storefront/extension-magento2-cms/index.js'))
extensionList.push(require('@vue-storefront/raw-output-example/index.js'))
extensionList.push(require('@vue-storefront/extension-payment-backend-methods/index.js'))
export default extensionList
