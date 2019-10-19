import { getOption } from './../configuration'

const applyQuoteId = (products, cartId) => products.map(product => ({ ...product, quoteId: cartId }))

const addToCart = async (products: any[], cartId: string) => {
  const connection = getOption('connection')
  const userToken = getOption('token')

  try {
    const response = await connection.post(
      `/cart/add?token=${userToken}&cartId=${cartId}`,
      applyQuoteId(products, cartId)
    )
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default addToCart;
