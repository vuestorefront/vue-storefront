import gql from 'graphql-tag';

export default gql`

  mutation updateShoppingList($id: String!, $version: Long!, $actions: [MyShoppingListUpdateAction!]!, $locale: Locale!, $acceptLanguage: [Locale!]) {
    shoppingList: updateMyShoppingList(id: $id, version: $version, actions: $actions) {
      id
      version
      lineItems {
        id
        productId
        variantId
        quantity
        variant
      }
    }
  }
`;
