import { UiMediaGalleryItem } from '@vue-storefront/interfaces'
import { ProductVariant, Image, Category } from './types/GraphQL'

export const getProductName = (product: ProductVariant): string => (product as any)._name

export const getProductSlug = (product: ProductVariant): string => (product as any)._slug

export const getProductPrice = (product: ProductVariant): number => product.price.value.centAmount

export const getProductGallery = (product: ProductVariant): UiMediaGalleryItem[] =>
  product.images.map((image: Image) => ({
    small: image.url,
    big: image.url,
    normal: image.url
  }))

export const getCategoryProducts = (category: Category, options: any = {}): ProductVariant[] => {
  if (!category || !(category as any)._products) {
    return []
  }

  const { _products } = category as any

  if (options.master) {
    return _products.filter(v => (v as any)._master)
  }

  return _products
}
