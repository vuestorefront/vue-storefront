export const formatPrice = (locale: string, currency: string,  price: number) => {
    if (!price) {
      return null;
    }
    const result =  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);

    return result;
  };
  