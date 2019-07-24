import { getThumbnailPath } from '@vue-storefront/core/helpers'

export function imagePath (relativeUrl) {
  return getThumbnailPath(relativeUrl)
}