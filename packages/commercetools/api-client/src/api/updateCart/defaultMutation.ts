import gql from 'graphql-tag'

export default gql`
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

  mutation updateCart($id: String!, $version: Long!, $actions: [CartUpdateAction!]!, $locale: Locale!) {
    cart: updateCart(id: $id, version: $version, actions: $actions) {
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
      shippingAddress {
        ...DefaultAddress
      }
      billingAddress {
        ...DefaultAddress
      }
      cartState
      version
    }
  }
`;
