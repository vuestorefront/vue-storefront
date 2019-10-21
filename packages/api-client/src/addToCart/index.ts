import { apiClient } from './../index'
import { CartProduct, CartResponse } from './../types/Cart'

const applyQuoteId = (products, cartId) => products.map(product => ({ ...product, quoteId: cartId }))

const addToCart = async (products: CartProduct[], cartId: string): Promise<CartResponse> => {
  try {
    const response = await apiClient.conn.post(
      `/cart/add?token=${apiClient.config.token}&cartId=${cartId}`,
      applyQuoteId(products, cartId)
    )
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default addToCart;
