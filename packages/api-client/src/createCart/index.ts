import { getOption } from './../configuration'

const createCart = async (token: string = ''): Promise<string> => {
  const connection = getOption('connection')

  try {
    const response = await connection.post(`/cart/create?token=${token}`)
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default createCart
