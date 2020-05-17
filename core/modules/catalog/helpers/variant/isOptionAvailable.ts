import findConfigurableVariant from './findConfigurableVariant'

export default function isOptionAvailable (context, { product, configuration }) {
  const variant = findConfigurableVariant({ product: product, configuration: configuration, availabilityCheck: true })
  return typeof variant !== 'undefined' && variant !== null
}
