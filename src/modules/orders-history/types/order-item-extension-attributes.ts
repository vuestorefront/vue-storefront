import { Customization, CustomizationStateItem } from 'src/modules/customization-system';

export interface OrderItemExtensionAttributes {
  customizations: Customization[],
  customization_states: CustomizationStateItem[]
}
