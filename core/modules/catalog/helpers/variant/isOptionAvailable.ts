import findConfigurableVariant from './findConfigurableVariant'

/**
 * Checks if variant with specific configuration exist
 */
export default function isOptionAvailable (context, { product, configuration, fullMatch = false }): boolean {
  const variant = findConfigurableVariant({ product: product, configuration: configuration, availabilityCheck: true, fullMatch: fullMatch })
  return typeof variant !== 'undefined' && variant !== null
}
