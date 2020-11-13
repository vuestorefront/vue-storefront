import { getSettings } from "@vue-storefront/virtocommerce-api"

export const formatPrice = (price: number) => {
    if (!price) {
      return null;
    }
    const { locale, currency } = getSettings();
    const result =  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);

    return result;
  };
  