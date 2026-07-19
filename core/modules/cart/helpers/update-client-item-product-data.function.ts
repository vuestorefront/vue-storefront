const productFieldsAllowedToUpdate = [
  'category_ids',
  'category',
  'customizations',
  'image',
  'type_id',
  'sku',
  'name',
  'id',
  'url_key',
  'configurable_options',
  'configurable_children',
  'price',
  'special_price',
  'original_price_incl_tax',
  'price_incl_tax',
  'custom_options',
  'bundle_options',
  'description',
  'landing_page_url',
  'media_gallery',
  'meta_description',
  'meta_keyword',
  'meta_title',
  'short_description',
  'stock',
  'product_links',
  'video_url',
  'slug',
  'is_custom_product',
  'is_alteration_product'
]

export function updateClientItemProductData (clientItem: any, product: any) {
  for (const key of productFieldsAllowedToUpdate) {
    if (!product[key]) {
      continue
    }
    clientItem[key] = product[key];
  }

  return clientItem;
}
