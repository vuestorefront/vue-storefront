import { ProductVariant, Address, LineItem, ReferenceInput, ResourceIdentifierInput, AddressInput } from './../../types/GraphQL';

export const createAddLineItemAction = (params: {
  product: ProductVariant;
  quantity: number;
  supplyChannel?: string;
  distributionChannel?: string;
}) => {
  return {
    addLineItem: {
      variantId: params.product.id,
      quantity: params.quantity,
      sku: params.product.sku,
      ...(params.supplyChannel && { supplyChannel: { id: params.supplyChannel }}),
      ...(params.distributionChannel && { distributionChannel: { id: params.distributionChannel }})
    }
  };
};

export const createRemoveLineItemAction = (product: LineItem) => ({
  removeLineItem: {
    lineItemId: product.id,
    quantity: product.quantity
  }
});

export const createChangeLineItemQuantityAction = (product: LineItem) => ({
  changeLineItemQuantity: {
    lineItemId: product.id,
    quantity: product.quantity
  }
});

export const setShippingAddressAction = (shippingDetails: Address): { setShippingAddress: { address: AddressInput } } => ({
  setShippingAddress: {
    address: {
      title: shippingDetails.title,
      salutation: shippingDetails.salutation,
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      streetName: shippingDetails.streetName,
      streetNumber: shippingDetails.streetNumber,
      additionalStreetInfo: shippingDetails.additionalStreetInfo,
      postalCode: shippingDetails.postalCode,
      city: shippingDetails.city,
      region: shippingDetails.region,
      state: shippingDetails.state,
      country: shippingDetails.country,
      company: shippingDetails.company,
      department: shippingDetails.department,
      building: shippingDetails.building,
      apartment: shippingDetails.apartment,
      pOBox: shippingDetails.pOBox,
      phone: shippingDetails.phone,
      mobile: shippingDetails.mobile,
      email: shippingDetails.email,
      fax: shippingDetails.fax,
      additionalAddressInfo: shippingDetails.additionalAddressInfo
    }
  }
});

export const setShippingMethodAction = (shippingMethodId?: string) => ({
  setShippingMethod: {
    shippingMethod: shippingMethodId ? { id: shippingMethodId } : null
  }
});

export const addPayment = (payment: ResourceIdentifierInput) => ({
  addPayment: { payment }
});

export const setBillingAddressAction = (billingDetails: Address): { setBillingAddress: { address: AddressInput } } => ({
  setBillingAddress: {
    address: {
      title: billingDetails.title,
      salutation: billingDetails.salutation,
      firstName: billingDetails.firstName,
      lastName: billingDetails.lastName,
      streetName: billingDetails.streetName,
      streetNumber: billingDetails.streetNumber,
      additionalStreetInfo: billingDetails.additionalStreetInfo,
      postalCode: billingDetails.postalCode,
      city: billingDetails.city,
      region: billingDetails.region,
      state: billingDetails.state,
      country: billingDetails.country,
      company: billingDetails.company,
      department: billingDetails.department,
      building: billingDetails.building,
      apartment: billingDetails.apartment,
      pOBox: billingDetails.pOBox,
      phone: billingDetails.phone,
      mobile: billingDetails.mobile,
      email: billingDetails.email,
      fax: billingDetails.fax,
      additionalAddressInfo: billingDetails.additionalAddressInfo
    }
  }
});

export const addPaymentAction = (paymentMethodId: string) => ({
  addPayment: {
    payment: {
      id: paymentMethodId
    }
  }
});

export const addDiscountCodeAction = (code: string) => ({
  addDiscountCode: { code }
});

export const removeDiscountCodeAction = (discountCode: ReferenceInput) => ({
  removeDiscountCode: { discountCode }
});

export const setCustomerEmail = (email: string) => ({
  setCustomerEmail: { email }
});
