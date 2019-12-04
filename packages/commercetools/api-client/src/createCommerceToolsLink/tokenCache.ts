import { Token } from './../types/setup'

const TOKEN_KEY = 'vsf-commercetools-token'

const getStorage = () => {
  // @ts-ignore
  if (typeof window !== 'undefined') {
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
  const item = storage.getItem(TOKEN_KEY)
  return item ? JSON.parse(item) : null
}

export { storeToken, getToken }
