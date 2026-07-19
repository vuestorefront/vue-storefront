import { ProductOptions } from 'core/modules/catalog/types/Product';
import { ExtensionAttributes } from 'src/modules/customization-system';
import { GiftCardOptions } from 'src/modules/gift-card';
import { CustomerImage } from 'src/modules/shared';

export default interface ServerItem {
  server_item_id: number | string,
  sku: string,
  server_cart_id: any,
  prev_qty: number,
  product_option: ProductOptions,
  type_id: any,
  thumbnail?: string,
  extension_attributes?: ExtensionAttributes,
  giftcard_options?: GiftCardOptions
}
