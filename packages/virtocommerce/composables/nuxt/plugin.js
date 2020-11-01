import { setup } from '@vue-storefront/virtocommerce-api';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default function init() {
  setup(moduleOptions);
}
