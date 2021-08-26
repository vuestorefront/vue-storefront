import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import flattenDeep from 'lodash-es/flattenDeep'
import union from 'lodash-es/union'
import { Logger } from '@vue-storefront/core/lib/logger'
import rootStore from '@vue-storefront/core/store'
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'
import syncProductPrice from './syncProductPrice'

/**
 * Synchronize / override prices got from ElasticSearch with current one's from Magento2 or other platform backend
 * @param {Array} products
 */
export default function doPlatformPricesSync (products) {
  return new Promise(async (resolve, reject) => {
    if (config.products.alwaysSyncPlatformPricesOver) {
      if (config.products.clearPricesBeforePlatformSync) {
        for (let product of products) { // clear out the prices as we need to sync them with Magento
          product.price_incl_tax = null
          product.original_price_incl_tax = null
          product.special_price_incl_tax = null

          product.special_price = null
          product.price = null
          product.original_price = null

          product.price_tax = null
          product.special_price_tax = null
          product.original_price_tax = null

          /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
          product.priceInclTax = product.price_incl_tax
          product.priceTax = product.price_tax
          product.originalPrice = product.original_price
          product.originalPriceInclTax = product.original_price_incl_tax
          product.originalPriceTax = product.original_price_tax
          product.specialPriceInclTax = product.special_price_incl_tax
          product.specialPriceTax = product.special_price_tax
          /** END */

          if (product.configurable_children) {
            for (let sc of product.configurable_children) {
              sc.price_incl_tax = null
              sc.original_price_incl_tax = null
              sc.special_price_incl_tax = null

              sc.special_price = null
              sc.price = null
              sc.original_price = null

              sc.price_tax = null
              sc.special_price_tax = null
              sc.original_price_tax = null

              /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
              sc.priceInclTax = sc.price_incl_tax
              sc.priceTax = sc.price_tax
              sc.originalPrice = sc.original_price
              sc.originalPriceInclTax = sc.original_price_incl_tax
              sc.originalPriceTax = sc.original_price_tax
              sc.specialPriceInclTax = sc.special_price_incl_tax
              sc.specialPriceTax = sc.special_price_tax
              /** END */
            }
          }
        }
      }

      let skus = products.map((p) => { return p.sku })

      if (products.length === 1) { // single product - download child data
        const childSkus = flattenDeep(products.map((p) => { return (p.configurable_children) ? p.configurable_children.map((cc) => { return cc.sku }) : null }))
        skus = union(skus, childSkus)
      }
      if (skus && skus.length > 0) {
        Logger.log('Starting platform prices sync for', skus) // TODO: add option for syncro and non syncro return()
        const { items } = await ProductService.getProductRenderList({
          skus,
          isUserGroupedTaxActive: rootStore.getters['tax/getIsUserGroupedTaxActive'],
          userGroupId: rootStore.getters['tax/getUserTaxGroupId'],
          token: rootStore.getters['user/getToken']
        })
        if (items) {
          for (let product of products) {
            const backProduct = items.find((itm) => itm.id === product.id)
            if (backProduct) {
              product.price_is_current = true // in case we're syncing up the prices we should mark if we do have current or not
              product.price_refreshed_at = new Date()
              product = syncProductPrice(product, backProduct)

              if (product.configurable_children) {
                for (let configurableChild of product.configurable_children) {
                  const backProductChild = items.find((itm) => itm.id === configurableChild.id)
                  if (backProductChild) {
                    configurableChild = syncProductPrice(configurableChild, backProductChild)
                  }
                }
              }
              // TODO: shall we update local storage here for the main product?
            }
          }
        }
        resolve(products)
      } else { // empty list of products
        resolve(products)
      }
      if (!config.products.waitForPlatformSync && !isServer) {
        Logger.log('Returning products, the prices yet to come from backend!')()
        for (let product of products) {
          product.price_is_current = false // in case we're syncing up the prices we should mark if we do have current or not
          product.price_refreshed_at = null
        }
        resolve(products)
      }
    } else {
      resolve(products)
    }
  })
}
