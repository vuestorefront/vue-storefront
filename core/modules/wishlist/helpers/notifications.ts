import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'

const productAddedToWhishList = (productName: string) => ({
  type: 'success',
  message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(productName) }),
  action1: { label: i18n.t('OK') }
})

const productRemovedFromWhishList = (productName: string) => ({
  type: 'success',
  message: i18n.t('Product {productName} has been removed from wishlit!', { productName: htmlDecode(productName) }),
  action1: { label: i18n.t('OK') }
})

const notifications = {
  productAddedToWhishList,
  productRemovedFromWhishList
}

export default notifications
