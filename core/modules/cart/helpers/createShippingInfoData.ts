const createShippingInfoData = (methodsData) => ({
  shippingAddress: {
    countryId: methodsData.country,
    ...(methodsData.shippingAddress ? methodsData.shippingAddress : {})
  },
  billingAddress: {
    ...(methodsData.billingAddress ? methodsData.billingAddress : {})
  },
  shippingCarrierCode: methodsData.carrier_code,
  shippingMethodCode: methodsData.method_code
});

export default createShippingInfoData
