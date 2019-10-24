import { AxiosRequestConfig } from 'axios'
import { Config } from './types/Config'
import createCart from './createCart'
import addToCart from './addToCart'
import getProducts from './getProducts'
import getCategories from './getCategories'
import ApiClient from './ApiClient'

let apiClient: ApiClient = null;

export const setup = (axiosConfig: AxiosRequestConfig, config?: Config): void => {
  apiClient = new ApiClient(axiosConfig, config)
}

export {
  apiClient,
  createCart,
  addToCart,
  getProducts,
  getCategories
}
