import { setup } from '@vue-storefront/salesforce-cc-poc-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function init() {
  setup({
    api: {
      uri: '<%= options.api.uri %>'
    }
  });
}
