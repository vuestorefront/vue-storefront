import toString from 'lodash-es/toString'
import i18n from '@vue-storefront/i18n'

const isCartTokenAuthorized = (cartToken) => {
  const tokenString = cartToken ? toString(cartToken) : null

  return tokenString && (tokenString.indexOf(i18n.t('not authorized')) < 0 && tokenString.indexOf('not authorized')) < 0
}

export default isCartTokenAuthorized
