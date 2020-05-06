import { ProductVariant, Address, LineItem, ReferenceInput, ResourceIdentifierInput } from './../../types/GraphQL';

export const createAddLineItemAction = (variant: ProductVariant, quantity: number) => ({
  addLineItem: {
    variantId: variant.id,
    quantity: quantity,
    sku: variant.sku
  }
});

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

export const setShippingAddressAction = (shippingDetails: Address) => ({
  setShippingAddress: {
    address: {
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      streetName: shippingDetails.streetName,
      streetNumber: shippingDetails.streetNumber,
      city: shippingDetails.city,
      // state: shippingDetails.state,
      postalCode: shippingDetails.postalCode,
      country: shippingDetails.country,
      phone: shippingDetails?.contactInfo?.phone
    }
  }
});

export const setShippingMethodAction = (shippingMethodId: string) => ({
  setShippingMethod: {
    shippingMethod: {
      id: shippingMethodId
    }
  }
});

export const addPayment = (payment: ResourceIdentifierInput) => ({
  addPayment: { payment }
});

export const setBillingAddressAction = (billingDetails: Address) => ({
  setBillingAddress: {
    address: {
      firstName: billingDetails.firstName,
      lastName: billingDetails.lastName,
      streetName: billingDetails.streetName,
      streetNumber: billingDetails.streetNumber,
      city: billingDetails.city,
      // state: billingDetails.state,
      postalCode: billingDetails.postalCode,
      country: billingDetails.country,
      phone: billingDetails.contactInfo.phone
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

