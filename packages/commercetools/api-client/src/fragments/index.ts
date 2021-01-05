export const ProductPriceFragment = `
  fragment DefaultProductPrice on ProductPrice {
    discounted {
      value {
        type
        currencyCode
        centAmount
        fractionDigits
      }
      discount {
        validFrom
        validUntil
        isActive
        name(acceptLanguage: $acceptLanguage)
      }
    }
    value {
      type
      currencyCode
      centAmount
      fractionDigits
    }
  }
`;

export const AddressFragment = `
  fragment DefaultAddress on Address {
    id
    title
    firstName
    lastName
    streetName
    streetNumber
    postalCode
    city
    country
    state
    region
    company
    apartment
    phone
    mobile
  }
`;

// TODO: Remove all address information and update PRO packages to use customQueries when this is implemented: https://github.com/DivanteLtd/vue-storefront/issues/5049
export const CustomerFragment = `
  ${AddressFragment}

  fragment DefaultCustomer on Customer {
    version
    firstName
    lastName
    email
    addresses {
      id
    }
    shippingAddresses {
      ...DefaultAddress
    }
    billingAddresses {
      ...DefaultAddress
    }
    defaultBillingAddressId
    defaultShippingAddressId
  }
`;

export const LineItemFragment = `
  ${ProductPriceFragment}

  fragment DefaultLineItem on LineItem {
    id
    productId
    name(acceptLanguage: $acceptLanguage)
    productSlug(acceptLanguage: $acceptLanguage)
    quantity
    discountedPricePerQuantity {
      quantity
      discountedPrice {
        value {
          centAmount
        }
        includedDiscounts {
          discount {
            name(acceptLanguage: $acceptLanguage)
            isActive
          }
        }
      }
    }
    variant {
      id
      sku
      price(currency: "USD") {
        tiers {
          value {
            centAmount
          }
        }
        value {
          centAmount
        }
        discounted {
          value {
            centAmount
          }
          discount {
            isActive
            name(acceptLanguage: $acceptLanguage)
          }
        }
      }
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
      ...DefaultProductPrice
    }
  }
`;

export const ShippingMethodFragment = `
  fragment DefaultShippingMethod on ShippingMethod {
    id
    version
    name
    description
    isDefault
    localizedDescription(acceptLanguage: $acceptLanguage)
    zoneRates {
      zone {
        id
        name
      }
      shippingRates {
        freeAbove {
          type
          centAmount
        }
        isMatching
        price {
          centAmount
        }
      }
    }
  }
`;

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
  }
`;

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

export const CategoryFragment = `
  fragment DefaultCategory on Category {
    id
    slug(acceptLanguage: $acceptLanguage)
    name(acceptLanguage: $acceptLanguage)
    childCount
    children {
      ...Children
      children {
        ...Children
        children {
          ...Children
        }
      }
    }
  }
`;
