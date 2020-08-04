import { setup } from '@vue-storefront/virtocommerce-api';
import { mapConfigToSetupObject } from '@vue-storefront/virtocommerce/nuxt/helpers';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default ({ app }) => {

  setup(
    mapConfigToSetupObject({
      moduleOptions,
      additionalProperties: {}
    })
  );
};
