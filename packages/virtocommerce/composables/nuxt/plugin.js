import { setup } from '@vue-storefront/virtocommerce-api';
import { getUserIdFromCookies } from '@vue-storefront/virtocommerce/nuxt/helpers/anonymousUserCookie'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default function init({ app }) {
  moduleOptions.userId = getUserIdFromCookies(app);
  setup(moduleOptions);
}
