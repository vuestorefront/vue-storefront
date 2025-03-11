import { Store } from 'vuex';

import Product from 'core/modules/catalog/types/Product';
import { RushAddon } from 'src/modules/budsies';

import { Customization } from '../types/customization.interface';
import { OptionType } from '../types/option-type';
import { OptionData } from '../types/option-data.interface';
import { OptionValue } from '../types/option-value.interface';
import { PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID } from '../types/production-time-selector-standard-option-value-id';

const STANDARD_OPTION_VALUE: OptionValue = {
  id: PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID,
  isEnabled: true,
  isDefault: false,
  sn: 0
};

const SNEAK_PEEK_OPTION_VALUES_SKUS = [
  'sneak_peek',
  'golf_cover_sneak_peek',
  'bulk_sample_sneak_peek',
  'specialty_commission_sneak_peek'
];

const ADD_SNEAK_PEEK_AVAILABILITY_RULES = true;

// Make customization required, add "Standard" option value
// And remove option values missing in "Rush Addons" list
function updateProductionTimeCustomization (
  productionTimeCustomization: Customization,
  availableAddons: RushAddon[]
): Customization {
  if (!productionTimeCustomization.optionData) {
    return productionTimeCustomization;
  }

  const values = (productionTimeCustomization.optionData.values || []).filter(
    (value) => {
      if (!value.sku) {
        return false;
      }

      const relatedAddon = availableAddons.find((addon) => addon.id === value.sku);

      return !!relatedAddon;
    }
  );

  values.unshift(STANDARD_OPTION_VALUE);

  const optionData: OptionData = {
    ...productionTimeCustomization.optionData,
    isRequired: true,
    values
  }

  return {
    ...productionTimeCustomization,
    optionData
  };
}

// Replace production time customization
// and add availability rules for "Sneak Peek" option values
function updateProductCustomizations (
  product: Product,
  productionTimeCustomization: Customization
): Product {
  if (!product.customizations) {
    return product;
  }

  const customizations = product.customizations.map((customization) => {
    if (customization.id === productionTimeCustomization.id) {
      return productionTimeCustomization;
    }

    if (!ADD_SNEAK_PEEK_AVAILABILITY_RULES || !customization.optionData?.values) {
      return customization;
    }

    const values = customization.optionData.values.map((value) => {
      if (!value.sku || !SNEAK_PEEK_OPTION_VALUES_SKUS.includes(value.sku)) {
        return value;
      }

      return {
        ...value,
        availabilityRules: {
          forActivatedOptionValueIds: [
            ...(value.availabilityRules?.forActivatedOptionValueIds || []),
            PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID
          ]
        }
      }
    })

    const optionData: OptionData = {
      ...customization.optionData,
      values
    }

    return {
      ...customization,
      optionData
    }
  });

  return {
    ...product,
    customizations
  }
}

function removeProductionTimeCustomizationFromProduct (
  product: Product,
  productionTimeCustomization: Customization
): Product {
  if (!product.customizations) {
    return product;
  }

  product.customizations = product.customizations.filter(
    (customization) => customization.id !== productionTimeCustomization.id
  );

  return product;
}

// TODO: temporary until separate option value for "Standard"
// production time will be added
export function updateProductProductionTimeCustomizationData (
  product: Product,
  store: Store<any>
): Product {
  if (!product.customizations) {
    return product;
  }

  const productionTimeCustomization = product.customizations.find(
    (customization) => customization.optionData?.type === OptionType.PRODUCTION_TIME
  );

  if (!productionTimeCustomization) {
    return product;
  }

  const availableAddons: RushAddon[] =
    store.getters['budsies/getProductRushAddons'](product.id);

  if (availableAddons.length === 0) {
    return removeProductionTimeCustomizationFromProduct(
      product,
      productionTimeCustomization
    );
  }

  const updatedProductionTimeCustomization = updateProductionTimeCustomization(
    productionTimeCustomization,
    availableAddons
  );

  return updateProductCustomizations(
    product,
    updatedProductionTimeCustomization
  );
}
