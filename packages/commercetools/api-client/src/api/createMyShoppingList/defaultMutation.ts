import gql from 'graphql-tag';

export default gql`
  mutation createMyShoppingList($draft: MyShoppingListDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput, $currency: Currency!) {
    wishlist: createMyShoppingList(draft: $draft, storeKey: $storeKey, locale: $locale, currency: $currency)
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
          price (currency: $currency) {
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
