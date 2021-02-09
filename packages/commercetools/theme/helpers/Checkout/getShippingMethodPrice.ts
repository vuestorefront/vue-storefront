import { ShippingMethod } from '@vue-storefront/commercetools-api';

export default (shippingMethod: ShippingMethod) => shippingMethod.zoneRates[0].shippingRates[0].price.centAmount / 100;
