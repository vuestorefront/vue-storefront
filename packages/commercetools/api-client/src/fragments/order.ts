import {AddressFragment} from './address';
import {LineItemFragment} from './line-item';

export const OrderFragment = `
  ${AddressFragment}
  ${LineItemFragment}

  fragment DefaultOrder on Order {
    lineItems {
      ...DefaultLineItem
    }
    totalPrice {
      centAmount
    }
    orderState
    id
    orderNumber
    version
    createdAt
    customerEmail
    shipmentState
    paymentState
    shippingAddress {
      ...DefaultAddress
    }
    billingAddress {
      ...DefaultAddress
    }
    cart {
      id
      version
    }
  }
`;
