import { CustomizationStateItem, ExtensionAttributes } from 'src/modules/customization-system';
import { GiftCardOptions } from 'src/modules/gift-card';

const ADDITIONAL_FIELDS_LIST = [
  {
    'type': 'string',
    'key': 'thumbnail'
  },
  {
    'type': 'string',
    'key': 'email'
  },
  {
    'type': 'GiftCardOptions',
    'key': 'giftcard_options'
  },
  {
    'type': 'ExtensionAttributes',
    'key': 'extension_attributes'
  }
];

export default function fillProductWithAdditionalFields (
  {
    product,
    serverItem
  }: {
    product: Record<string, any>,
    serverItem: Record<string, any>
  }
): void {
  for (const field of ADDITIONAL_FIELDS_LIST) {
    if (!serverItem.hasOwnProperty(field.key) || !serverItem[field.key]) {
      continue;
    }

    let value = serverItem[field.key];

    switch (field.type) {
      case 'string':
        value = String(value);
        break;
      case 'object':
        value = value as object;
        break;
      case 'GiftCardOptions':
        value = value as GiftCardOptions;
        break;
      case 'ExtensionAttributes':
        value = value as ExtensionAttributes;

        const plushieId = value.plushie_id ? String(value.plushie_id) : undefined;
        const customizationState = ((value.customization_state || []) as CustomizationStateItem[]).map((item) => {
          if (typeof item.value === 'number') {
            item.value = (item.value as number).toString();
          }

          return item;
        });

        (value as ExtensionAttributes) = {
          plushie_id: plushieId,
          customization_state: customizationState,
          estimated_shipment: value.estimated_shipment
        }

        break;
      default:
        throw new Error('Unsupported additional field type ');
    }

    product[field.key] = value;
  }
}
