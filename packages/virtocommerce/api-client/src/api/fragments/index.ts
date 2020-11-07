import gql from 'graphql-tag';
export const AddressFields = gql`
fragment addressFields on AddressType {
    id
    name
    organization
    firstName
    lastName
    line1
    line2
    city
    countryCode
    countryName
    regionId
    regionName
    postalCode
    zip # deprecated
    phone
    email
    addressType
  }
`;

export const CurrencyFields = gql`
fragment currencyFields on CurrencyType {
    code
    customFormatting
    exchangeRate
    symbol
  }
`;

export const MoneyFields = gql`
${CurrencyFields}
fragment moneyFields on MoneyType {
    amount
    decimalDigits
    formattedAmount
    formattedAmountWithoutCurrency
    formattedAmountWithoutPoint
    formattedAmountWithoutPointAndCurrency
    currency {
      ...currencyFields
    }
  }
`;

export const LineItemFields = gql`
${MoneyFields}
fragment lineItemFields on LineItemType {
    id
    imageUrl
    inStockQuantity
    isGift
    isReadOnly
    isReccuring
    isValid
    name
    productId
    quantity
    sku
    thumbnailImageUrl
    validationErrors {
      errorCode
      errorMessage
      errorParameters {
        key
        value
      }
    }
    extendedPrice {
      ...moneyFields
    }
    listPrice {
      ...moneyFields
    }
    taxTotal {
      ...moneyFields
    }
  }
`;