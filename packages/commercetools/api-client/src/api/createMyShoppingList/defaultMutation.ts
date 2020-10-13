import gql from 'graphql-tag';

export default gql`
  mutation createMyShoppingList($draft: MyShoppingListDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput, $currency: Currency!, $image: [Image!]) {
    shoppingList: createMyShoppingList(draft: $draft, storeKey: $storeKey, locale: $locale, currency: $currency, image: $image)
      id  
      version
      name 
      description
      lineItems {
        id 
        productId
        variantId
        quantity
        variant {
          id
          price
          images
        }
      }
      textLineItems {
        name
        description       
      }
    }
  }
`;
