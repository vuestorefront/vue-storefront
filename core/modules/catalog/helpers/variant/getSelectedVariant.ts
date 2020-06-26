import findConfigurableVariant from './findConfigurableVariant'

/**
 * Returns product based on configuration or if there is no match then return first variant as default.
 */
export default function getSelectedVariant (product, configuration, { fallbackToDefaultWhenNoAvailable }) {
  let selectedVariant = findConfigurableVariant({ product, configuration, availabilityCheck: true })
  if (!selectedVariant) {
    if (fallbackToDefaultWhenNoAvailable) {
      selectedVariant = findConfigurableVariant({ product, selectDefaultChildren: true, availabilityCheck: true }) // return first available child
    }
  }

  return selectedVariant
}
