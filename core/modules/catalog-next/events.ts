import config from 'config'
import i18n from '@vue-storefront/core/i18n';
import { SearchQuery } from 'storefront-query-builder'

export const filterChangedProduct = async (filterOption, store, router) => {
  const currentProductConfiguration = store.getters['product/getCurrentProductConfiguration']
  const changedConfig = Object.assign({}, currentProductConfiguration, { [filterOption.attribute_code]: filterOption })
  let searchQuery = new SearchQuery()
  searchQuery = searchQuery.applyFilter({ key: 'sku', value: { 'eq': store.getters['product/getCurrentProduct'].parentSku } })
  const { items: [newProductVariant] } = await store.dispatch('product/findProducts', {
    query: searchQuery,
    size: 1,
    configuration: changedConfig,
    fallbackToDefaultWhenNoAvailable: false,
    setProductErrors: true,
    assignProductConfiguration: true,
    separateSelectedVariant: true
  })
  const { configuration, selectedVariant, options, product_option } = newProductVariant
  if (config.products.setFirstVarianAsDefaultInURL && selectedVariant) {
    router.push({ params: { childSku: selectedVariant.sku } })
  }
  if (selectedVariant) {
    const newProductConfiguration = Object.assign(
      {},
      store.getters['product/getCurrentProduct'],
      selectedVariant,
      { configuration, options, product_option }
    )
    await store.dispatch('product/setCurrent', newProductConfiguration)
    return selectedVariant
  } else {
    store.dispatch('notification/spawnNotification', {
      type: 'warning',
      message: i18n.t(
        'No such configuration for the product. Please do choose another combination of attributes.'
      ),
      action1: { label: i18n.t('OK') }
    })
  }
}
