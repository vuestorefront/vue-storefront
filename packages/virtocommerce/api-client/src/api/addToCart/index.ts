import {
  CartType,
  Product,
  AddItemMutation,
  AddItemMutationVariables,
} from '../../graphql/types';
import mutationDocument from './addToCartMutation';

const addToCart = async ({ config, client }, cart: CartType, product: Product,  qty: number): Promise<CartType> => {
  const { store, getUserId, currency, locale } = config;
  const { data } = await client.mutate({
    mutation: mutationDocument,
    variables: {
      command: {
        productId: product.id,
        quantity: qty,
        storeId: store,
        userId: getUserId(),
        currency: currency,
        language: locale,
      },
    }
  });
  return data?.addItem;
};

export default addToCart;
