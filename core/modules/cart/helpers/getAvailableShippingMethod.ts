import ShippingMethod from '../types/ShippingMethod';

const PREFERRED_CARRIER_CODE = 'tablerate';
const PREFERRED_METHOD_CODE = 'bestway';

export const getAvailableShippingMethod = (
  selectedCarrierCode: string | undefined,
  selectedMethodCode: string | undefined,
  availableMethods: ShippingMethod[]
): ShippingMethod | undefined => {
  if (availableMethods.length === 0) {
    return;
  }

  if (selectedCarrierCode && selectedMethodCode) {
    const selectedShippingMethod = availableMethods.find(
      (method) => method.carrier_code === selectedCarrierCode && method.method_code === selectedMethodCode
    );

    if (selectedShippingMethod) {
      return selectedShippingMethod;
    }
  }

  const preferredMethod = availableMethods.find(
    (m) => m.carrier_code === PREFERRED_CARRIER_CODE && m.method_code === PREFERRED_METHOD_CODE
  );

  if (preferredMethod) {
    return preferredMethod;
  }

  return availableMethods[0];
};
