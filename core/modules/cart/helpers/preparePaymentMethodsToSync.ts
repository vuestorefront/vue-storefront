const isPaymentMethodNotExist = (backendPaymentMethod, paymentMethods) =>
  typeof backendPaymentMethod === 'object' && !paymentMethods.find(item => item.code === backendPaymentMethod.code)

const preparePaymentMethodsToSync = (backendPaymentMethods, currentPaymentMethods) => {
  const paymentMethods = [...currentPaymentMethods]
  const uniqueBackendMethods = []

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

  return { uniqueBackendMethods, paymentMethods }
}

export default preparePaymentMethodsToSync
