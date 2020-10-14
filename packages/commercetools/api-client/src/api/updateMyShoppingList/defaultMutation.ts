import gql from 'graphql-tag';

export default gql`

  mutation updateShoppingList($id: String!, $version: Long!, $actions: [MyShoppingListUpdateAction!]!, $locale: Locale!, $acceptLanguage: [Locale!]) {
    shoppingList: updateMyShoppingList(id: $id, version: $version, actions: $actions) {
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
          price (currency: "USD") {
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
      textLineItems {
        name
        description       
      }
    }
  }
`;
