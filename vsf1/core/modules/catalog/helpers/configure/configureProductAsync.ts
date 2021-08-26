import Product from '@vue-storefront/core/modules/catalog/types/Product';
import cloneDeep from 'lodash-es/cloneDeep'
import { getSelectedVariant, omitSelectedVariantFields } from '../variant';
import { getProductConfiguration, setProductConfigurableOptions } from '../productOptions';
import { filterOutUnavailableVariants } from '../stock';
import { setGroupedProduct, setBundleProducts } from '../associatedProducts';
import { hasConfigurableChildren } from './..'

interface ConfigureProductAsyncParams {
  product: Product,
  configuration: any,
  attribute: any,
  options?: {
    fallbackToDefaultWhenNoAvailable?: boolean,
    setProductErrors?: boolean,
    setConfigurableProductOptions?: boolean,
    filterUnavailableVariants?: boolean,
    assignProductConfiguration?: boolean,
    separateSelectedVariant?: boolean,
    prefetchGroupProducts?: boolean
  },
  stockItems: any[],
  excludeFields?: string[],
  includeFields?: string[]
}

/**
 * This function configure product for 'configurable', 'bundle' or 'group' product.
 */
export default async function configureProductAsync ({
  product,
  configuration,
  attribute,
  options: {
    fallbackToDefaultWhenNoAvailable = true,
    setProductErrors = true,
    setConfigurableProductOptions = true,
    filterUnavailableVariants = false,
    assignProductConfiguration = false,
    separateSelectedVariant = false,
    prefetchGroupProducts = false
  } = {},
  stockItems = [],
  excludeFields,
  includeFields
}: ConfigureProductAsyncParams) {
  // it not only filter variants but also it apply stock object
  if (filterUnavailableVariants) {
    filterOutUnavailableVariants(product, stockItems)
  }

  // setup bundle or group product. Product is filled with productLinks
  if (prefetchGroupProducts) {
    await setGroupedProduct(product, { includeFields, excludeFields })
    await setBundleProducts(product, { includeFields, excludeFields })
  }

  // setup configurable product
  if (hasConfigurableChildren(product)) {
    // we don't want to modify configuration object
    let _configuration = cloneDeep(configuration)

    // find selected variant by configuration
    let selectedVariant = getSelectedVariant(product, _configuration, { fallbackToDefaultWhenNoAvailable })

    if (selectedVariant) {
      // if there is selectedVariant we want to get configuration based on that variant
      _configuration = getProductConfiguration({ product, selectedVariant, attribute })

      // here we add product_options with selected configuration. It only applies to configurable product
      setProductConfigurableOptions({ product, configuration: _configuration, setConfigurableProductOptions }) // set the custom options

      product.is_configured = true

      // remove props from variant that we don't want need to override in base product
      selectedVariant = omitSelectedVariantFields(selectedVariant)
    }
    if (!selectedVariant && setProductErrors) { // can not find variant anyway, even the default one
      product.errors.variants = 'No available product variants'
    }

    const configuredProduct = {
      ...product,
      ...(assignProductConfiguration ? { configuration: _configuration } : {}) // we can need configuration as separate object
    }
    return {
      ...configuredProduct,
      ...(separateSelectedVariant ? { selectedVariant } : selectedVariant) // we can need selected variant as separate object
    }
  }

  return product
}
