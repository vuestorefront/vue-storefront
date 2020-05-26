const createShippingInfoData = (methodsData) => ({
  shippingAddress: {
    countryId: methodsData.country,
    ...(methodsData.shippingAddress ? methodsData.shippingAddress : {})
  },
  billingAddress: {
    ...(methodsData.billingAddress ? methodsData.billingAddress : {})
  },
  ...(methodsData.carrier_code ? { shippingCarrierCode: methodsData.carrier_code } : {}),
  ...(methodsData.method_code ? { shippingMethodCode: methodsData.method_code } : {})
});

export default createShippingInfoData
