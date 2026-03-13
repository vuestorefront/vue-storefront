import { Customization, CustomizationStateItem } from 'src/modules/customization-system';
import { ProductPurchaseFlow } from 'src/modules/shared';
import { OrderItemProduct } from './order-item-product';

export interface OrderItemExtensionAttributes {
  alteration_product?: OrderItemProduct,
  customizations: Customization[],
  customization_states: CustomizationStateItem[],
  is_alteration_product?: boolean,
  is_custom_product?: boolean,
  plushie_id?: number,
  support_bulk_customization?: boolean,
  flow?: ProductPurchaseFlow
}
