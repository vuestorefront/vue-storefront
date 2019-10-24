import { apiClient } from './../index'

const createCart = async (): Promise<string> => {
  try {
    const response = await apiClient.post(`/cart/create?token=${apiClient.config.token}`)
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default createCart
