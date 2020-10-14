import gql from 'graphql-tag';

const basicProfile = gql`
  query getMe($locale: Locale!, $acceptLanguage: [Locale!]) {
    me {
      shoppingList {
        id  
        name(acceptLanguage: $acceptLanguage) 
        description
        slug
        lineItems {
          id 
          productId
          variantId
          quantity
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
          }
        }
      }
    }
  }
`;

export { basicProfile };
