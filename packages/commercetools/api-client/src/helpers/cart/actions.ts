import { UiCartProduct } from '@vue-storefront/interfaces';
import { ProductVariant, AddressInput } from './../../types/GraphQL';

export const createAddLineItemAction = (variant: ProductVariant, quantity: number) => ({
  addLineItem: {
    variantId: variant.id,
    quantity: quantity,
    sku: variant.sku
  }
});

export const createRemoveLineItemAction = (product: UiCartProduct) => ({
  removeLineItem: {
    lineItemId: product.id,
    quantity: parseInt(product.qty)
  }
});

export const createChangeLineItemQuantityAction = (product: UiCartProduct) => ({
  changeLineItemQuantity: {
    lineItemId: product.id,
    quantity: parseInt(product.qty)
  }
});

export const setShippingAddressAction = (shippingDetails: AddressInput) => ({
  setShippingAddress: {
    address: {
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      streetName: shippingDetails.streetName,
      streetNumber: '',
      city: shippingDetails.city,
      // TODO:: selecting state
      // state: shippingDetails.state,
      postalCode: shippingDetails.postalCode,
      country: shippingDetails.country,
      phone: shippingDetails.phone
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

export const setBillingAddressAction = (shippingDetails: AddressInput) => ({
  setBillingAddress: {
    address: {
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      streetName: shippingDetails.streetName,
      streetNumber: '',
      city: shippingDetails.city,
      // TODO:: selecting state
      // state: shippingDetails.state,
      postalCode: shippingDetails.postalCode,
      country: shippingDetails.country,
      phone: shippingDetails.phone
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
