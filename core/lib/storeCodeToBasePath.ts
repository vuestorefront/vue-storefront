import config from 'config'

const storeCodeToBasePath = (storeCode: string): string => {
  const store = config.storeViews[storeCode]

  if (!store) {
    return '/'
  }

  return store.url || `/${storeCode}`
}

export default storeCodeToBasePath
