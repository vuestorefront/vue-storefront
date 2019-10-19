import axios from 'axios'
import createCart from './createCart'
import addToCart from './addToCart'
import getProducts from './getProducts'

import { setConfiguration } from './configuration'

export const setup = (axiosConfig): void => {
  setConfiguration({
    connection: axios.create(axiosConfig)
  })
}

export {
  createCart,
  addToCart,
  getProducts
}
