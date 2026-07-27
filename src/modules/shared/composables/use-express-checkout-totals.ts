import { computed } from 'vue';

import { ExpressCheckoutUpdateData } from '../types/express-checkout-data.interface';
import { useRootInstance } from './use-current-instance';

export function useExpressCheckoutTotals () {
  const root = useRootInstance();
  const expressCheckoutTotals = computed<ExpressCheckoutUpdateData['total']>(() => {
    const totalsData = root.$store.getters['cart/getTotals'];

    const total: ExpressCheckoutUpdateData['total'] = {
      final: 0,
      base: 0,
      tax: 0,
      shipping: 0,
      discount: 0
    };

    for (const item of totalsData) {
      if (item.code === 'grand_total') {
        total.final = item.value;
      }

      if (item.code === 'subtotal') {
        total.base = item.value;
      }

      if (item.code === 'tax') {
        total.tax = item.value;
      }

      if (item.code === 'shipping') {
        total.shipping = item.value;
      }

      if (item.code === 'discount') {
        total.discount = item.value;
      }
    }

    return total;
  });

  return {
    expressCheckoutTotals
  }
}
