import gql from 'graphql-tag';
import {
  AddressFields,
  CurrencyFields,
  MoneyFields,
  LineItemFields,
} from '../fragments';

export default gql`
  query getCart(
    $storeId: String!
    $userId: String!
    $currencyCode: String!
    $cultureName: String
  ) {
    cart(
      storeId: $storeId
      userId: $userId
      currencyCode: $currencyCode
      cultureName: $cultureName
    ) {
      id
      name
      itemsCount
      itemsQuantity
      isValid
      addresses {
        ...addressFields
      }
      items {
        ...lineItemFields
      }
      currency {
        ...currencyFields
      }
      total {
        ...moneyFields
      }
      subTotal {
        ...moneyFields
      }
      shippingTotal {
        ...moneyFields
      }
      shippingPrice {
        ...moneyFields
      }
      taxTotal {
        ...moneyFields
      }
      extendedPriceTotal {
        ...moneyFields
      }
      extendedPriceTotalWithTax {
        ...moneyFields
      }
      validationErrors {
        errorCode
        errorMessage
        errorParameters {
          key
          value
        }
        objectId
      }
    }
  }
  ${AddressFields}
  ${CurrencyFields}
  ${MoneyFields}
  ${LineItemFields}
`;
