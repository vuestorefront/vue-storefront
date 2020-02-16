import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SetupConfig } from './types/setup'
import createCommerceToolsLink from './helpers/createCommerceToolsLink'
import getProduct from './api/getProduct'
import getCategory from './api/getCategory'
import createCart from './api/createCart'
import updateCart from './api/updateCart'
import getCart from './api/getCart'
import addToCart from './api/addToCart'
import removeFromCart from './api/removeFromCart'
import updateCartQuantity from './api/updateCartQuantity'
import getMe from './api/getMe'
import placeOrder from './api/placeOrder'
import createMyOrderFromCart from './api/createMyOrderFromCart'
import getShippingMethods from './api/getShippingMethods'
import updateShippingDetails from './api/updateShippingDetails'
import customerSignMeUp from './api/customerSignMeUp'
import customerSignMeIn from './api/customerSignMeIn'
import customerSignOut from './api/customerSignOut'
import getStorage from './helpers/createCommerceToolsLink/getStorage'

let apolloClient: ApolloClient<any> = null
let locale = 'en'
let currency = 'USD'
let country = 'UK'
let countries = [{ name: 'US', label: 'United States'}]
let currencies = [{ name: 'EUR',  label: 'Euro' } ]
let locales = [{ name: 'en', label: 'English' }]
let cookies = {
  currencyCookieName: 'vsf-currency',
  countryCookieName: 'vsf-country',
  localeCookieName: 'vsf-locale'
}

const setup = <TCacheShape>(setupConfig: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  if (setupConfig.api) {
    apolloClient = new ApolloClient({
      link: createCommerceToolsLink(setupConfig.api),
      cache: new InMemoryCache(),
      ...setupConfig.customOptions
    })
  }

  locale = setupConfig.locale || locale
  currency = setupConfig.currency || currency
  country = setupConfig.country || country
  countries = setupConfig.countries || countries
  currencies = setupConfig.currencies || currencies
  locales = setupConfig.locales || locales
  cookies = setupConfig.cookies || cookies

  return apolloClient
}

export {
  apolloClient,
  setup,
  cookies,
  locale,
  locales,
  country,
  currency,
  countries,
  currencies,
  getStorage,
  getProduct,
  getCategory,
  createCart,
  updateCart,
  getCart,
  addToCart,
  removeFromCart,
  getMe,
  updateCartQuantity,
  placeOrder,
  createMyOrderFromCart,
  getShippingMethods,
  updateShippingDetails,
  customerSignMeUp,
  customerSignMeIn,
  customerSignOut
}
