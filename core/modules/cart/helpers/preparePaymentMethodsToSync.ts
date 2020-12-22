import PaymentMethod from '@vue-storefront/core/modules/cart/types/PaymentMethod'

const isPaymentMethodNotExist = (backendPaymentMethod: PaymentMethod, paymentMethods: PaymentMethod[]) =>
  typeof backendPaymentMethod === 'object' && !paymentMethods.find(item => item.code === backendPaymentMethod.code)

const preparePaymentMethodsToSync = (
  backendPaymentMethods: PaymentMethod[],
  currentPaymentMethods: PaymentMethod[]
): { uniqueBackendMethods: PaymentMethod[], paymentMethods: PaymentMethod[] } => {
  const paymentMethods = [...currentPaymentMethods]
  const uniqueBackendMethods = []

  // Check if the variable is iterable before to enter in the for...of loop
  if (Array.isArray(backendPaymentMethods)) {
    for (const backendPaymentMethod of backendPaymentMethods) {
      if (isPaymentMethodNotExist(backendPaymentMethod, currentPaymentMethods)) {
        const backendMethod = {
          ...backendPaymentMethod,
          is_server_method: true
        }

        paymentMethods.push(backendMethod)
        uniqueBackendMethods.push(backendMethod)
      }
    }
  }

  return { uniqueBackendMethods, paymentMethods }
}

export default preparePaymentMethodsToSync
