import gql from 'graphql-tag'

export default gql`
  fragment DefaultCart on Cart {
    id
    customerId
    customerEmail
    lineItems {
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
    totalPrice {
      centAmount
    }
    version
  }

  query getMe($locale: Locale!) {
    me {
      activeCart {
        ...DefaultCart
      }
    }
  }
`;
