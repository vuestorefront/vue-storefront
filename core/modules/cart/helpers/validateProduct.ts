import config from 'config'
import { EVENTS } from './../constants'

const validateProduct = product => {
  const errors = []

  if (config.useZeroPriceProduct ? product.price_incl_tax < 0 : product.price_incl_tax <= 0) {
    errors.push({ type: 'error', event: EVENTS.UNKNOWN_PRICE })
  }

  if (product.errors !== null && typeof product.errors !== 'undefined') {
    for (const errKey in product.errors) {
      errors.push({ type: 'error', event: product.errors[errKey] })
    }
  }

  return errors
};

export default validateProduct;
