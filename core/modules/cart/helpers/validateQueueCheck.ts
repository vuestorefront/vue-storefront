import { unsafeQuantity, outOfStock } from './notifications'

const validateQueueCheck = (status) => {
  const errors = []

  if (status === 'volatile') {
    errors.push(unsafeQuantity)
  }

  if (status === 'out_of_stock') {
    errors.push(outOfStock)
  }

  return {
    errors,
    productCanBeAdded: status === 'ok' || status === 'volatile'
  }
}

export default validateQueueCheck
