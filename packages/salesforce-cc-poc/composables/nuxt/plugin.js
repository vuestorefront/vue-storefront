import { setup } from '@vue-storefront/salesforce-cc-poc-api';

export default function init(options) {
  if (options) {
    setup({
      api: {
        uri: '<%= options.api.uri %>'
      }
    });
  }
}
