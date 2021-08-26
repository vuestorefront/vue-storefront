import {AddressFragment} from './address';
import {CustomerFragment} from './customer';
import {LineItemFragment} from './line-item';
import {ShippingMethodFragment} from './shipping-method';

export const CartFragment = `
  ${AddressFragment}
  ${CustomerFragment}
  ${LineItemFragment}
  ${ShippingMethodFragment}

  fragment DefaultCart on Cart {
    id
    customerId
    customerEmail
    lineItems {
      ...DefaultLineItem
    }
    totalPrice {
      centAmount
    }
    shippingAddress {
      ...DefaultAddress
    }
    billingAddress {
      ...DefaultAddress
    }
    customer {
      ...DefaultCustomer
    }
    totalPrice {
      centAmount
    }
    taxedPrice {
      totalNet {
        centAmount
      }
      totalGross {
        centAmount
      }
    }
    paymentInfo {
      payments {
        id
      }
    }
    shippingInfo {
      price {
        centAmount
      }
      shippingMethod {
        ...DefaultShippingMethod
      }
    }
    discountCodes {
      discountCode {
        id
        code
        isActive
        validFrom
        validUntil
        name(acceptLanguage: $acceptLanguage)
      }
    }
    refusedGifts {
      isActive
      validFrom
      validUntil
      name(acceptLanguage: $acceptLanguage)
    }
    custom {
      customFieldsRaw {
        name
        value
      }
    }
    cartState
    version
    inventoryMode
  }
`;
