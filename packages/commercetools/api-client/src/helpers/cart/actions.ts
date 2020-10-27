import { Logger } from '@vue-storefront/core';
import { ProductVariant, Address, LineItem, ReferenceInput, ResourceIdentifierInput, AddressInput } from './../../types/GraphQL';

const hasContactInfo = details => Object.keys(details.contactInfo).some(c => ['phone', 'email', 'mobile', 'fax'].includes(c));

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

export const setShippingAddressAction = (shippingDetails: Address): { setShippingAddress: { address: AddressInput } } => {
  if (hasContactInfo(shippingDetails)) {
    Logger.warn('Using `contactInfo` on Address is being deprecated in the CT API, use `email` `phone` `mobile` and `fax` fields directly.');
  }
  return {
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
        phone: shippingDetails.phone || shippingDetails.contactInfo?.phone,
        mobile: shippingDetails.mobile || shippingDetails.contactInfo?.mobile,
        email: shippingDetails.email || shippingDetails.contactInfo?.email,
        fax: shippingDetails.fax || shippingDetails.contactInfo?.fax,
        additionalAddressInfo: shippingDetails.additionalAddressInfo
      }
    }
  };
};

export const setShippingMethodAction = (shippingMethodId?: string) => ({
  setShippingMethod: {
    shippingMethod: shippingMethodId ? { id: shippingMethodId } : null
  }
});

export const addPayment = (payment: ResourceIdentifierInput) => ({
  addPayment: { payment }
});

export const setBillingAddressAction = (billingDetails: Address): { setBillingAddress: { address: AddressInput } } => {
  if (hasContactInfo(billingDetails)) {
    Logger.warn('Using `contactInfo` on Address is being deprecated in the CT API, use `email` `phone` `mobile` and `fax` fields directly.');
  }
  return {
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
        phone: billingDetails.phone || billingDetails.contactInfo?.phone,
        mobile: billingDetails.mobile || billingDetails.contactInfo?.mobile,
        email: billingDetails.email || billingDetails.contactInfo?.email,
        fax: billingDetails.fax || billingDetails.contactInfo?.fax,
        additionalAddressInfo: billingDetails.additionalAddressInfo
      }
    }
  };
};

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
