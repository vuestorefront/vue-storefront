import { setup } from '@vue-storefront/virtocommerce-api';
import { getAnonymousUserId } from '@vue-storefront/virtocommerce/nuxt/helpers/anonymousUserCookie'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default function init({ app }) {
  moduleOptions.userId = getAnonymousUserId(app);
  setup(moduleOptions);
}
