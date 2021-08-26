import config from 'config'
import i18n from '@vue-storefront/i18n'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';

const validateProduct = (product: CartItem): string[] => {
  const errors = []

  if (config.useZeroPriceProduct ? product.price_incl_tax < 0 : product.price_incl_tax <= 0) {
    errors.push(i18n.t('Product price is unknown, product cannot be added to the cart!'))
  }

  if (product.errors !== null && typeof product.errors !== 'undefined') {
    for (const errKey in product.errors) {
      if (product.errors[errKey]) {
        errors.push(product.errors[errKey])
      }
    }
  }

  return errors
};

export default validateProduct;
