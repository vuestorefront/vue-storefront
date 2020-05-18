import { getStockItems } from '../stock';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import transformMetadataToAttributes from '../transformMetadataToAttributes';
import configureProductAsync from './configureProductAsync';

/**
 * Prepare all data needed to make product configuration.
 * After common data is setup this function map through every product and configure it based on 'configuration' object
 */
export default async function configureProducts ({
  products,
  attributes_metadata = [],
  configuration = {},
  options = {},
  excludeFields = null,
  includeFields = null
}: any) {
  const productAttributesMetadata = products.map((product) => product.attributes_metadata || [])
  const attribute = transformMetadataToAttributes([attributes_metadata, ...productAttributesMetadata])
  const attributeStateFormat = { list_by_code: attribute.attrHashByCode, list_by_id: attribute.attrHashById }

  let stockItems = []
  if (options.filterUnavailableVariants) {
    stockItems = await getStockItems(products.map(({ _source }) => _source))
  }

  const configuredProducts = await Promise.all((products as Product[]).map(async (product) => {
    const configuredProduct = await configureProductAsync({
      product,
      configuration,
      attribute: attributeStateFormat,
      options: options,
      stockItems,
      excludeFields,
      includeFields
    })
    return configuredProduct as Product
  }))

  return configuredProducts
}
