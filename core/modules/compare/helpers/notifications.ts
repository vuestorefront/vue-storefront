import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'

const productAddedToCompare = (productName: string) => ({
  type: 'success',
  message: i18n.t('Product {productName} has been added to the compare!', { productName: htmlDecode(productName) }),
  action1: { label: i18n.t('OK') }
})

const productRemovedFromCompare = (productName: string) => ({
  type: 'success',
  message: i18n.t('Product {productName} has been removed from compare!', { productName: htmlDecode(productName) }),
  action1: { label: i18n.t('OK') }
})

const notifications = {
  productAddedToCompare,
  productRemovedFromCompare
}

export default notifications
