const createShippingInfoData = (methodsData) => ({
  shippingAddress: {
    ...(methodsData.shippingAddress ? methodsData.shippingAddress : {})
  },
  billingAddress: {
    ...(methodsData.billingAddress ? methodsData.billingAddress : {})
  },
  shippingCarrierCode: methodsData.carrier_code,
  shippingMethodCode: methodsData.method_code
});

export default createShippingInfoData
