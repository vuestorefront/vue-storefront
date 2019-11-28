import { defaultStoreCode } from 'config'
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'

export const getCurrentStoreCode = (): string => {
  return !currentStoreView() || currentStoreView().storeCode === defaultStoreCode ? null : currentStoreView().storeCode
}

export const localizeRouterLink = (text: string): string => {
  const regexLink = /(<a\shref=")(?!http)(.*?)(">)(.*?)(<\/a>)/gm
  text = text.replace(regexLink, (match, g1, g2, g3, g4) =>
    ['<router-link to="', g2, g3, g4, '</router-link>'].join(''))

  const regexRouterLink = /(<router-link\sto=")(.*)(">.*<\/router-link>)/gm
  return text.replace(regexRouterLink, (match, g1, g2, g3) =>
    [g1, localizedRoute(g2, currentStoreView().storeCode), g3].join(''))
}

export const stringToComponent = (text: string, wrapper: string = 'div'): object => {
  if (!text || typeof text !== 'string') {
    return {}
  }

  text = localizeRouterLink(text)
  return { template: `<${wrapper}>${text}</${wrapper}>` }
}
