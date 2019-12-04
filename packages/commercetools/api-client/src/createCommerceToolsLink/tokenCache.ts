const TOKEN_KEY = 'vsf-commercetools-token'
import { Token } from './../types/setup'

const getStorage = () => {
  // @ts-ignore
  if (typeof window != undefined) {
     // @ts-ignore
    return window.localStorage
  }

  const storage = {}

  return {
    setItem: (key: string, value: any) => {
      storage[key] = value
    },
    getItem: (key: string): any => {
      return storage[key]
    }
  }

}

const storeToken = (token: Token) => {
  const storage = getStorage()
  storage.setItem(TOKEN_KEY, JSON.stringify(token))
}

const getToken = (): Token => {
  const storage = getStorage()
  return JSON.parse(storage.getItem(TOKEN_KEY))
}

export { storeToken, getToken }
