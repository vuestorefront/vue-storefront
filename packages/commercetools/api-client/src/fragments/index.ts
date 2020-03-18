
export const AddressFragment = `
  fragment DefaultAddress on Address {
    title
    firstName
    lastName
    streetName
    streetNumber
    postalCode
    city
    region
    country
    company
  }
`;

export const CustomerFragment = `
  fragment DefaultCustomer on Customer {
    version
    firstName
    lastName
    email
  }
`;

export const LineItemFragment = `
  fragment DefaultLineItem on LineItem {
    id
    productId
    name(locale: $locale)
    productSlug(locale: $locale)
    quantity
    variant {
      id
      sku
      images {
        url
        label
      }
      attributeList {
        name
        ... on BooleanAttribute {
          booleanValue: value
        }
        ... on DateAttribute {
          dateValue: value
        }
        ... on DateTimeAttribute {
          dateTimeValue: value
        }
        ... on StringAttribute {
          stringValue: value
        }
        ... on TimeAttribute {
          timeValue: value
        }
        ... on NumberAttribute {
          numberValue: value
        }
        ... on EnumAttribute {
          key
          label
        }
        ... on LocalizedEnumAttribute {
          key
          localizedLabel: label(locale: $locale)
        }
        ... on LocalizedStringAttribute {
          localizedString: value(locale: $locale)
        }
        ... on MoneyAttribute {
          centAmount
          currencyCode
        }
        ... on ReferenceAttribute {
          typeId
          id
        }
      }
    }
    price {
      value {
        centAmount
      }
    }
  }
`;

export const CartFragment = `
  ${AddressFragment}
  ${CustomerFragment}
  ${LineItemFragment}

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
    shippingInfo {
      price {
        centAmount
      }
    }
    cartState
    version
  }
`;

export const OrderFragment = `
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
    version
    createdAt
  }
`;

export const ShippingMethodFragment = `
  fragment DefaultShippingMethod on ShippingMethod {
    id
    version
    name
    description
    isDefault
    zoneRates {
      zone {
        name
      }
      shippingRates {
        price {
          centAmount
        }
      }
    }
  }
`;
