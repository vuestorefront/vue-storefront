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

  mutation createCart($draft: MyCartDraft!, $locale: Locale!, $storeKey: KeyReferenceInput) {
    cart: createMyCart(draft: $draft, storeKey: $storeKey) {
      id
      customerId
      customerEmail
      lineItems {
        id
        productId
        name(locale: $locale)
        productSlug(locale: $locale)
        quantity
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
