import { computed, ComputedRef, SetupContext } from '@vue/composition-api';

import { PRODUCT_LOCALIZED_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';
import { getThumbnailPath, PriceHelper } from '@vue-storefront/core/helpers';
import { Currency, GET_ACTIVE_CURRENCY } from 'src/modules/currency';

import { Customization } from '../types/customization.interface';
import { CustomizationOptionValue } from '../types/customization-option-value';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';
import { getOptionValuePrice } from '../helpers/get-option-value-price';

interface CollapsedViewItem {
  id: string,
  title: string,
  image: string,
  price: {
    regular: string,
    special: string | null
  },
  link: string
}

const COLLAPSED_VIEW_MAX_ITEMS = 4;

export function useCollapsedCustomizationsView (
  filteredAvailableCustomizations: ComputedRef<Customization[]>,
  existingCartItemCustomizationOptionValue: ComputedRef<Record<string, CustomizationOptionValue>>,
  filteredOptionValuesIdsByCustomizationId: ComputedRef<Record<string, Record<string, boolean>>>,
  { root }: SetupContext

) {
  const collapsedViewItems: ComputedRef<CollapsedViewItem[]> = computed(() => {
    const values: CollapsedViewItem[] = [];
    const _filteredAvailableCustomizations = filteredAvailableCustomizations.value;
    const _filteredOptionValuesIdsByCustomizationId = filteredOptionValuesIdsByCustomizationId.value;
    const _existingCartItemCustomizationOptionValue = existingCartItemCustomizationOptionValue.value;
    const productBySkuDictionary = root.$store.getters['product/getProductBySkuDictionary'];
    const productPriceDictionary = root.$store.getters[PRODUCT_LOCALIZED_PRICE_DICTIONARY];
    const selectedCurrency: Currency = root.$store.getters[GET_ACTIVE_CURRENCY];

    for (const customization of _filteredAvailableCustomizations) {
      if (!customization.optionData?.values) {
        continue;
      }

      for (const optionValue of customization.optionData.values) {
        if (!optionValue.thumbnailUrl) {
          continue;
        }

        const availableOptionValueIds = _filteredOptionValuesIdsByCustomizationId[customization.id];

        if (!availableOptionValueIds) {
          continue;
        }

        const isAvailable = availableOptionValueIds[optionValue.id];

        if (!isAvailable) {
          continue;
        }

        const cartItemOptionValue = _existingCartItemCustomizationOptionValue[customization.id];

        if (isFileUploadValue(cartItemOptionValue)) {
          continue;
        }

        const isInCart = Array.isArray(cartItemOptionValue)
          ? cartItemOptionValue.includes(optionValue.id)
          : optionValue.id === cartItemOptionValue;

        let price: CollapsedViewItem['price'] = {
          regular: '',
          special: null
        };

        if (isInCart) {
          price.regular = root.$t('Added').toString();
        } else {
          const productPrice = getOptionValuePrice(
            optionValue,
            productBySkuDictionary,
            productPriceDictionary
          );

          if (productPrice) {
            price = PriceHelper.formatProductPrice(productPrice, selectedCurrency.symbol);
          }
        }

        values.push({
          id: optionValue.id,
          title: optionValue.name || '',
          image: getThumbnailPath(optionValue.thumbnailUrl, 144, 144, ''),
          price,
          link: ''
        });
      }
    }

    return values.slice(0, COLLAPSED_VIEW_MAX_ITEMS);
  });

  return {
    collapsedViewItems
  }
}
