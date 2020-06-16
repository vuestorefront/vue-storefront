import { isServer } from '@vue-storefront/core/helpers';

// object - parent object in the config, e.g. config.cart
// field - field inside the object, e.g. create_endpoint

// returns - object.[field]_ssr if it exists and it is a server,
//           object.field otherwise

export default (object: Record<string, any>, field: string): string => {
  return isServer && object[`${field}_ssr`] ? object[`${field}_ssr`] : object[field]
}
