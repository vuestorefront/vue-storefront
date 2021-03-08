import { ShippingMethod } from '@vue-storefront/commercetools-api';

export default (shippingMethod: ShippingMethod, total: number) => {
  if (shippingMethod?.zoneRates[0].shippingRates[0].freeAbove?.centAmount) {
    if (total >= (shippingMethod.zoneRates[0].shippingRates[0].freeAbove.centAmount / 100)) {
      return 0;
    }
  }
  return shippingMethod.zoneRates[0].shippingRates[0].price.centAmount / 100;
};
